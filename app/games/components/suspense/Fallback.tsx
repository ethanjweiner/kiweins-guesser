import { MainSkeleton } from "./EmbedSkeleton";
import QuizAnswersSkeleton from "./QuizAnswersSkeleton.tsx";

export function Fallback({ mainHeight }: { mainHeight: number }) {
  return (
    <>
      <MainSkeleton height={mainHeight} />
      <QuizAnswersSkeleton />
    </>
  );
}
