import { Suspense } from "react";
import Game from "../../components/Game";
import TunesQuizData from "../components/TunesQuizData";
import { Fallback } from "../../components/suspense/Fallback";

export default function Page({
  searchParams,
}: {
  searchParams: { round: number };
}) {
  return (
    <Game>
      <Suspense
        key={searchParams.round}
        fallback={<Fallback mainHeight={96} />}
      >
        <TunesQuizData />
      </Suspense>
    </Game>
  );
}
