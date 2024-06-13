import { usePathname } from "next/navigation";
import { GameType } from "../types";

export const useGameType = (): GameType => {
  const path = usePathname();
  const gameType = path.split("/")[2];

  if (gameType !== "pics" && gameType !== "tunes") {
    throw new Error("Game type in path is invalid");
  }

  return gameType;
};
