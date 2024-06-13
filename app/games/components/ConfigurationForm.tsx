import { Coiny, Inter } from "next/font/google";
import Select from "../../components/Select";
import { Session, GameType, Quiz, GuessProperty } from "../../types";
import { setSession } from "../../utils/session";
import { redirect } from "next/navigation";
import {
  picsGuessPropertyOptions,
  quizTypeOptions,
  tuneGuessPropertyOptions,
} from "../../constants";
import { useGameType } from "@/app/hooks/useGameType";

const interLight = Inter({ weight: "300", subsets: ["latin"] });
const coiny = Coiny({ weight: "400", subsets: ["latin"] });

export default function ConfigurationForm<Q extends Quiz>({
  gameType,
}: {
  gameType: GameType;
}) {
  async function startRound(formData: FormData) {
    "use server";

    const session: Session<Q> = {
      quiz: {
        gameType,
        guessProperty: formData.get("guess-type"),
        quizType: formData.get("quiz-type"),
      } as Q,
      roundInfo: {
        roundsTotal: Number(formData.get("num-rounds")),
        roundsCorrect: 0,
        roundsCompleted: 0,
      },
    };

    setSession(session);
    redirect(`/games/${gameType}/round?round=1`);
  }

  const guessPropertyOptions =
    gameType === "tunes" ? tuneGuessPropertyOptions : picsGuessPropertyOptions;

  const gameColor = gameType === "tunes" ? "violet" : "pink";

  // TODO: Add loading to form?
  return (
    <div
      className={`z-1 absolute left-0 -mb-5 pt-4 w-full rounded-t-3xl flex place-content-center bg-white ${interLight.className}`}
    >
      <form action={startRound} className="max-w-96 grid flex-1 space-y-12">
        <div className="relative p-8 pt-2">
          <Select
            name="guess-type"
            options={guessPropertyOptions}
            labelContent="Guess the..."
          />
          <Select
            name="quiz-type"
            options={quizTypeOptions}
            labelContent="Quiz Type"
          />

          <label className="mb-3 mt-8 block text-xl font-medium leading-6 text-gray-900">
            Number of Rounds
          </label>
          <input
            type="number"
            name="num-rounds"
            id="num-round"
            className="text-2xl block w-full rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
            defaultValue="10"
          />
          <button
            type="submit"
            className={`${coiny.className} mt-8 bg-${gameColor}-500 text-white text-2xl font-medium py-3 px-6 rounded-full w-full`}
          >
            Start Round
          </button>
        </div>
      </form>
    </div>
  );
}
