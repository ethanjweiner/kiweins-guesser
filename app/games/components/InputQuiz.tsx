import { GuessProperty, combineGuessPropertyLabels } from "@/app/types";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function InputQuiz({
  guessType,
  onAnswer,
}: {
  guessType: GuessProperty;
  onAnswer: (answer: string) => void;
}) {
  const [guessValue, setGuessValue] = useState<string>("");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onAnswer(guessValue);
    setGuessValue("");
  };

  return (
    <div className="relative mt-2">
      <input
        type={guessType === "bpm" ? "number" : "text"}
        name={guessType}
        id={guessType}
        className="focus:ring-violet block w-full rounded-full border-0 px-6 py-4 pr-20 text-2xl text-gray-900 ring-4 ring-inset ring-slate-800 placeholder:text-gray-300 focus:ring-inset sm:leading-6"
        value={guessValue}
        onKeyUp={(e) => e.key === "Enter" && onAnswer(guessValue)}
        onChange={(e) => setGuessValue(e.target.value)}
        placeholder={`Enter the ${combineGuessPropertyLabels[guessType]}...`}
      />
      <button
        onClick={handleClick}
        className="absolute inset-y-0 right-0 rounded-r-full border-4 border-l-0 border-slate-800 bg-green-600 px-4 hover:bg-green-500"
      >
        <FontAwesomeIcon icon={faCheck} className="w-6 text-white" />
      </button>
    </div>
  );
}
