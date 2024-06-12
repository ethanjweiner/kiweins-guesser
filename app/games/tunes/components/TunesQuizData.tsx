import { TuneQuiz } from "@/app/types";
import TunesQuizArea from "./TuneQuizArea";
import { getPageData } from "@/app/utils/session";

export default async function TunesQuizData() {
  const pageData = await getPageData<TuneQuiz>("tunes");
  return <TunesQuizArea session={pageData} />;
}
