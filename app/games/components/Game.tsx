import GuessTypeIndicator from "../components/FieldIndicator";
import RoundInfo from "../components/RoundInfo";
import { getSession } from "@/app/utils/session";
import { findGuessOption } from "@/app/utils/game";

export default async function Game({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionData = getSession();

  const guessOption = findGuessOption(sessionData);

  return (
    <div className="max-w-96 w-full p-8 pt-20 sm:pt-32">
      <GuessTypeIndicator guessOption={guessOption!} />
      <RoundInfo roundInfo={sessionData.roundInfo} />
      {children}
    </div>
  );
}
