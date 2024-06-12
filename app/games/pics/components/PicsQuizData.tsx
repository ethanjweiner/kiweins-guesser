import { PicQuiz } from "@/app/types";
import { getPageData } from "@/app/utils/session";
import PicsQuizArea from "./PicsQuizArea";

export default async function PicsQuizData() {
  const session = await getPageData<PicQuiz>("pics");

  return <PicsQuizArea session={session} />;
}
