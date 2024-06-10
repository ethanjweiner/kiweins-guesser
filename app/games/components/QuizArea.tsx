import { useEffect, useState } from "react";
import AnswerReveal from "./AnswerReveal";
import AnswerArea from "./AnswerArea";
import { Session, Quiz } from "@/app/types";
import { evaluateAnswer } from "@/app/utils/game";
import { goToNextRound } from "@/app/actions";

export function QuizArea<Q extends Quiz>({
  children,
  session,
  correctAnswer,
  isCorrect,
  setIsCorrect,
}: {
  children: React.ReactNode;
  session: Session<Q>;
  correctAnswer: string;
  isCorrect: boolean | null;
  setIsCorrect: (isCorrect: boolean | null) => void;
}) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  const handleAnswer = (answer: string) => {
    setIsCorrect(evaluateAnswer(answer, session.quiz));
  };

  const handleContinue = async () => {
    await goToNextRound({
      gameType: session.quiz.gameType,
      gaveCorrectAnswer: !!isCorrect,
    });
    setIsCorrect(null);
  };

  return (
    <div className="relative">
      {children}
      {isCorrect === null ? (
        <AnswerArea session={session} onAnswer={handleAnswer} />
      ) : (
        <AnswerReveal
          correctAnswer={correctAnswer}
          guessProperty={session.quiz.guessProperty}
          isCorrect={isCorrect}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
}
