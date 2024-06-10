import { Option } from "../components/Select";
import {
  picsGuessPropertyOptions,
  tuneGuessPropertyOptions,
} from "../constants";
import { Session, GuessProperty, Quiz, TuneQuiz, PicQuiz } from "../types";
import { getIncorrectMonths } from "./round_data";

export function generateAnswerOptions(quiz: Quiz): string[] {
  if (quiz.gameType === "tunes") {
    return generateTuneAnswerOptions(quiz);
  }

  if (quiz.gameType === "pics") {
    return generatePicAnswerOptions(quiz);
  }

  throw new Error("Invalid game type");
}

function generatePicAnswerOptions(quiz: PicQuiz): string[] {
  const { photo } = quiz.roundData;

  const incorrectOptions = getIncorrectMonths(photo.month);

  switch (quiz.guessProperty) {
    case "month":
      return shuffleOptions(photo.month, incorrectOptions);
    default:
      throw new Error("Invalid guess type");
  }
}

function generateTuneAnswerOptions(quiz: TuneQuiz): string[] {
  const { track } = quiz.roundData;

  switch (quiz.guessProperty) {
    case "bpm":
      if (!track.tempo) {
        throw new Error("Track does not have a BPM value");
      }
      return getBpmOptions(track.tempo);
    case "song_name":
      return shuffleOptions(track.name, quiz.roundData.incorrectOptions);
    case "artist":
      return shuffleOptions(track.artists[0], quiz.roundData.incorrectOptions);
    case "year":
      return shuffleOptions(track.year, quiz.roundData.incorrectOptions);
    default:
      throw new Error("Invalid guess type");
  }
}

export function shuffleOptions(
  correctOption: string,
  incorrectOptions: string[]
): string[] {
  const correctIndex = Math.floor(Math.random() * 4);
  const options: string[] = [];

  for (let i = 0; i < 4; i++) {
    if (i === correctIndex) {
      options.push(correctOption);
    } else {
      options.push(incorrectOptions.pop()!);
    }
  }

  return options;
}

// Generate 4 options, one of which is the correct answer, the other 3 are at least 10 bpm away, max 30 bpm away, either higher or lower
// Configure hardness?
export function getBpmOptions(correctBpm: number): string[] {
  const correctIndex = Math.floor(Math.random() * 4);

  const options: string[] = [];

  function generateIncorrectOption(bpm: number): number {
    const isHigher = Math.random() > 0.5;
    const offset = Math.floor(Math.random() * 30) + 8;
    const newBpm = isHigher ? bpm + offset : bpm - offset;

    // Generate new options if the new bpm is too close to the correct bpm or any of the other options
    if (
      options.some(
        (option) =>
          parseInt(option, 10) > newBpm - 8 && parseInt(option, 10) < newBpm + 8
      )
    ) {
      return generateIncorrectOption(bpm);
    }

    return newBpm;
  }

  for (let i = 0; i < 4; i++) {
    if (i === correctIndex) {
      options.push(correctBpm.toString());
    } else {
      options.push(generateIncorrectOption(correctBpm).toString());
    }
  }

  return options;
}

// TODO: Figure about better typing mechanism here using some generics
export function evaluateAnswer(answer: string, quiz: Quiz): boolean {
  return quiz.gameType === "tunes"
    ? evaluateTuneGameAnswer(answer, quiz)
    : evaluatePicsGameAnswer(answer, quiz);
}

function evaluatePicsGameAnswer(answer: string, quiz: PicQuiz): boolean {
  if (quiz.guessProperty === "month" && quiz.quizType === "multiple_choice") {
    return answer === quiz.roundData.photo.month;
  }

  if (quiz.guessProperty === "month" && quiz.quizType === "fill_in_the_blank") {
    return answer === quiz.roundData.photo.month;
  }

  throw new Error("Invalid guess type or quiz type");
}

function evaluateTuneGameAnswer(answer: string, quiz: TuneQuiz): boolean {
  if (quiz.guessProperty === "bpm" && quiz.quizType === "multiple_choice") {
    return parseInt(answer, 10) === quiz.roundData.track.tempo;
  }

  if (quiz.guessProperty === "bpm" && quiz.quizType === "fill_in_the_blank") {
    return (
      parseInt(answer, 10) >= quiz.roundData.track.tempo! - 10 &&
      parseInt(answer, 10) <= quiz.roundData.track.tempo! + 10
    );
  }

  if (
    quiz.guessProperty === "song_name" &&
    quiz.quizType === "multiple_choice"
  ) {
    return answer === quiz.roundData.track.name;
  }

  if (
    quiz.guessProperty === "song_name" &&
    quiz.quizType === "fill_in_the_blank"
  ) {
    return (
      answer.toLowerCase().trim() ===
      quiz.roundData.track.name.toLowerCase().trim()
    );
  }

  if (quiz.guessProperty === "artist" && quiz.quizType === "multiple_choice") {
    return answer === quiz.roundData.track.artists[0];
  }

  if (
    quiz.guessProperty === "artist" &&
    quiz.quizType === "fill_in_the_blank"
  ) {
    return (
      answer.toLowerCase().trim() ===
      quiz.roundData.track.artists[0].toLowerCase().trim()
    );
  }

  if (quiz.guessProperty === "year" && quiz.quizType === "multiple_choice") {
    return answer === quiz.roundData.track.year;
  }

  if (quiz.guessProperty === "year" && quiz.quizType === "fill_in_the_blank") {
    return answer === quiz.roundData.track.year;
  }

  throw new Error("Invalid guess type or quiz type");
}

export const findGuessOption = (
  session: Session<Quiz>
): Option<GuessProperty> | undefined => {
  return [...tuneGuessPropertyOptions, ...picsGuessPropertyOptions].find(
    (guessOption) => guessOption.value === session.quiz.guessProperty
  )!;
};
