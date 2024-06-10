"use server";

import { redirect } from "next/navigation";
import { getSession, updateSession } from "./utils/session";
import { GameType } from "./types";

export async function goToNextRound({
  gameType,
  gaveCorrectAnswer,
}: {
  gameType: GameType;
  gaveCorrectAnswer: boolean;
}) {
  const sessionData = getSession();

  const newRoundsCompleted = sessionData.roundInfo.roundsCompleted + 1;

  updateSession({
    roundInfo: {
      ...sessionData.roundInfo,
      roundsCompleted: newRoundsCompleted,
      roundsCorrect: gaveCorrectAnswer
        ? sessionData.roundInfo.roundsCorrect + 1
        : sessionData.roundInfo.roundsCorrect,
    },
  });

  if (newRoundsCompleted >= sessionData.roundInfo.roundsTotal) {
    return redirect("/results");
  }

  return redirect(`/games/${gameType}/round?round=${newRoundsCompleted + 1}`);
}
