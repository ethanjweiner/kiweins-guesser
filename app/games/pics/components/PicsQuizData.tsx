import { PicQuiz } from "@/app/types";
import { getPicRoundData } from "@/app/utils/quiz_data";
import { getSession } from "@/app/utils/session";
import PicsQuizArea from "./PicsQuizArea";

export default async function PicsQuizData() {
  const rawSession = getSession<PicQuiz>();

  // TODO: remove update session pattern
  const session = {
    ...rawSession,
    quiz: {
      ...rawSession.quiz,
      roundData: await getPicRoundData(),
    },
  };

  return <PicsQuizArea session={session} />;
}
