import { Option } from "../components/Select";
import {
  picsGuessPropertyOptions,
  tuneGuessPropertyOptions,
} from "../constants";
import { Session, GuessProperty, Quiz, TuneQuiz, PicQuiz } from "../types";

// Generate 4 options, one of which is the correct answer, the other 3 are at least 10 bpm away, max 30 bpm away, either higher or lower
// Configure hardness?
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
