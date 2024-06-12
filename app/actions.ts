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
  const session = getSession();
  const newRoundsCompleted = session.roundInfo.roundsCompleted + 1;

  const roundInfo = {
    ...session.roundInfo,
    roundsCompleted: newRoundsCompleted,
    roundsCorrect: gaveCorrectAnswer
      ? session.roundInfo.roundsCorrect + 1
      : session.roundInfo.roundsCorrect,
  };

  updateSession({
    ...session,
    roundInfo,
  });

  if (newRoundsCompleted >= session.roundInfo.roundsTotal) {
    return redirect("/results");
  }

  return redirect(`/games/${gameType}/round?round=${newRoundsCompleted + 1}`);
}
