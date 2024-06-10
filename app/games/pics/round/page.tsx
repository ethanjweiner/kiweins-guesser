import Game from "../../components/Game";
import { Suspense } from "react";
import { Fallback } from "../../components/suspense/Fallback";
import PicsQuizData from "../components/PicsQuizData";

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
