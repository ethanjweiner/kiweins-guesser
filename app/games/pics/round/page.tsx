import { Suspense } from "react";
import Game from "../../components/Game";
import PicsQuizData from "../components/PicsQuizData";
import { Fallback } from "../../components/suspense/Fallback";

export default async function Page({
  searchParams,
}: {
  searchParams: { round: number };
}) {
  return (
    <Game>
      <Suspense
        key={searchParams.round}
        fallback={<Fallback mainHeight={72} />}
      >
        <PicsQuizData />
      </Suspense>
    </Game>
  );
}
