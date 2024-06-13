"use client";

import { GuessProperty, combineGuessPropertyLabels } from "@/app/types";
import { Coiny, Inter } from "next/font/google";

const interHeavy = Inter({ weight: "500", subsets: ["latin"] });
const interLight = Inter({ weight: "300", subsets: ["latin"] });
const coiny = Coiny({ weight: "400", subsets: ["latin"] });

export default function AnswerReveal({
  correctAnswer,
  guessProperty: guessType,
  isCorrect,
  onContinue,
}: {
  correctAnswer: string;
  guessProperty: GuessProperty;
  isCorrect: boolean;
  onContinue: () => void;
}) {
  return (
    <div>
      {isCorrect ? (
        <p className={`${coiny.className} text-green-500 text-2xl`}>
          Correct! The exact {combineGuessPropertyLabels[guessType]} was{" "}
          <span className="border-double border-b-8 border-green-500">
            {correctAnswer}
          </span>
          .
        </p>
      ) : (
        <p className={`${coiny.className} text-red-500 text-2xl`}>
          Wrong! The correct {combineGuessPropertyLabels[guessType]} was{" "}
          <span className="border-double border-b-8 border-red-500">
            {correctAnswer}
          </span>
          .
        </p>
      )}
      <button
        type="submit"
        className={`${coiny.className} mt-8 bg-blue-500 text-white text-2xl font-medium py-3 px-6 rounded-full w-full`}
        onClick={onContinue}
      >
        Continue
      </button>
    </div>
  );
}
