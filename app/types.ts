export type Track = {
  id: string;
  name: string;
  artists: string[];
  year: string;
  tempo?: number;
};

// TODO: Collapse both of these?
export type TuneRoundData = {
  track: Track;
  options: string[];
};

export type PicRoundData = {
  photo: Photo;
  options: string[];
};

export type Photo = {
  key: string;
  month: string;
};

export type BaseQuiz<T, U, V extends GameType> = {
  gameType: V;
  quizType: QuizType;
  guessProperty: T;
  roundData: U;
};

export type TuneQuiz = BaseQuiz<TunesGuessProperty, TuneRoundData, "tunes">;
export type PicQuiz = BaseQuiz<PicsGuessProperty, PicRoundData, "pics">;

export type Quiz = TuneQuiz | PicQuiz;

export type RoundData = TuneRoundData | PicRoundData;

export type TunesGuessProperty = "bpm" | "song_name" | "artist" | "year";
export type PicsGuessProperty = "month";

export type GuessProperty = TunesGuessProperty | PicsGuessProperty;

export type GameType = "tunes" | "pics";

export const tunesGuessPropertyLabels: Record<TunesGuessProperty, string> = {
  bpm: "BPM",
  song_name: "Song Name",
  artist: "Artist",
  year: "Year",
};

export const picsGuessPropertyLabels: Record<PicsGuessProperty, string> = {
  month: "Month",
};

export const combineGuessPropertyLabels = {
  ...tunesGuessPropertyLabels,
  ...picsGuessPropertyLabels,
};

export type QuizType = "multiple_choice" | "fill_in_the_blank";

export const quizTypeLabels: Record<QuizType, string> = {
  multiple_choice: "Multiple Choice",
  fill_in_the_blank: "Fill in the Blank",
};

export type RoundInformation = {
  roundsTotal: number;
  roundsCorrect: number;
  roundsCompleted: number;
};

export type Session<Q extends Quiz> = {
  quiz: Q;
  roundInfo: RoundInformation;
};

export function isTuneGame(
  session: Session<Quiz>
): session is Session<TuneQuiz> {
  return session.quiz.gameType === "tunes";
}

export function isPicGame(session: Session<Quiz>): session is Session<PicQuiz> {
  return session.quiz.gameType === "pics";
}
