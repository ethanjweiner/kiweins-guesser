import { Session, Quiz } from "@/app/types";
import { MultipleChoiceQuiz } from "./MultipleChoiceQuiz";
import InputQuiz from "./InputQuiz";

export default function AnswerArea<Q extends Quiz>({
  session,
  onAnswer,
}: {
  session: Session<Q>;
  onAnswer: (answer: string) => void;
}) {
  return (
    <form className="flex flex-col justify-start">
      {session.quiz.quizType === "multiple_choice" ? (
        <MultipleChoiceQuiz
          options={session.quiz.roundData.options}
          onAnswer={onAnswer}
        />
      ) : (
        <InputQuiz guessType={session.quiz.guessProperty} onAnswer={onAnswer} />
      )}
    </form>
  );
}
