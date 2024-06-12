import Game from "../../components/Game";
import { getPageData } from "@/app/utils/session";

import { TuneQuiz } from "@/app/types";

import TunesQuizData from "../components/TunesQuizData";
import { Suspense } from "react";
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
        fallback={<Fallback mainHeight={96} />}
      >
        <TunesQuizData />
      </Suspense>
    </Game>
  );
}
