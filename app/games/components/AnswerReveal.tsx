"use client";

import { GuessProperty, combineGuessPropertyLabels } from "@/app/types";
import { Inter } from "next/font/google";

const interHeavy = Inter({ weight: "500", subsets: ["latin"] });
const interLight = Inter({ weight: "300", subsets: ["latin"] });

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
        <p className={`${interLight.className} text-green-500 text-lg`}>
          Correct! The exact {combineGuessPropertyLabels[guessType]} was{" "}
          <span className={interHeavy.className}>{correctAnswer}</span>.
        </p>
      ) : (
        <p className={`${interLight.className} text-red-500 text-lg`}>
          Wrong! The correct {combineGuessPropertyLabels[guessType]} was{" "}
          <span className={interHeavy.className}>{correctAnswer}</span>.
        </p>
      )}
      <button
        type="submit"
        className={`${interHeavy.className} mt-8 bg-pink-500 text-white text-xl font-medium py-3 px-6 rounded-full w-full`}
        onClick={onContinue}
      >
        Continue
      </button>
    </div>
  );
}
