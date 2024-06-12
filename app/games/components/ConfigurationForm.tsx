import { Inter } from "next/font/google";
import Select from "../../components/Select";
import { Session, GameType, Quiz, GuessProperty } from "../../types";
import { setSession } from "../../utils/session";
import { redirect } from "next/navigation";
import {
  picsGuessPropertyOptions,
  quizTypeOptions,
  tuneGuessPropertyOptions,
} from "../../constants";

const interLight = Inter({ weight: "300", subsets: ["latin"] });
const interHeavy = Inter({ weight: "500", subsets: ["latin"] });

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

  // TODO: Add loading to form?
  return (
    <form
      action={startRound}
      className={`z-1 absolute left-0 -mb-5 grid h-fit w-full flex-1 space-y-12 rounded-t-3xl bg-white ${interLight.className}`}
    >
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
          className={`${interHeavy.className} mt-8 bg-green-500 text-white text-xl font-medium py-3 px-6 rounded-full w-full`}
        >
          Start Round
        </button>
      </div>
    </form>
  );
}
