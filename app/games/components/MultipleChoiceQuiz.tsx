import MultipleChoiceItem from "./MultipleChoiceItem";

export function MultipleChoiceQuiz({
  options,
  onAnswer,
}: {
  options: string[];
  onAnswer: (answer: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {options.length &&
        options.map(
          (option) =>
            option &&
            option.length && (
              <MultipleChoiceItem
                key={option}
                option={option}
                onClick={() => onAnswer(option)}
              />
            )
        )}
    </div>
  );
}
