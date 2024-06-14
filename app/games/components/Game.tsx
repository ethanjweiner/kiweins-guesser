import GuessTypeIndicator from "../components/FieldIndicator";
import RoundInfo from "../components/RoundInfo";
import { findGuessOption } from "@/app/utils/game";
import { Quiz } from "@/app/types";
import { getSession } from "@/app/utils/session";

export default async function Game<Q extends Quiz>({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = getSession<Q>();
  const guessOption = findGuessOption(session);

  return (
    <div className="max-w-96 w-full p-8 pt-20 sm:pt-32">
      <GuessTypeIndicator guessOption={guessOption!} />
      <RoundInfo roundInfo={session.roundInfo} />
      {children}
    </div>
  );
}
