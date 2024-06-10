import { Session, Quiz } from "@/app/types";
import { MultipleChoiceQuiz } from "./MultipleChoiceQuiz";
import InputQuiz from "./InputQuiz";
import { generateAnswerOptions } from "@/app/utils/game";

export default function AnswerArea<Q extends Quiz>({
  session,
  onAnswer,
}: {
  session: Session<Q>;
  onAnswer: (answer: string) => void;
}) {
  // TODO: Only generate options once incorrect options are available
  const options = generateAnswerOptions(session.quiz);

  return (
    <form className="flex flex-col justify-start">
      {session.quiz.quizType === "multiple_choice" ? (
        <MultipleChoiceQuiz options={options} onAnswer={onAnswer} />
      ) : (
        <InputQuiz guessType={session.quiz.guessProperty} onAnswer={onAnswer} />
      )}
    </form>
  );
}
