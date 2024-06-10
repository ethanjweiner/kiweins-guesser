import { TuneQuiz } from "@/app/types";
import { getTuneRoundData } from "@/app/utils/quiz_data";
import { getSession } from "@/app/utils/session";
import TunesQuizArea from "./TuneQuizArea";

export default async function TunesQuizData() {
  const rawSession = getSession<TuneQuiz>();

  const session = {
    ...rawSession,
    quiz: {
      ...rawSession.quiz,
      roundData: await getTuneRoundData({
        guessProperty: rawSession.quiz.guessProperty,
      }),
    },
  };

  return <TunesQuizArea session={session} />;
}
