export default function MultipleChoiceItem({
  option,
  className,
  onClick,
}: {
  option: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`relative w-full rounded-full border-4 border-violet-600 bg-gradient-to-br from-violet-500 to-violet-300 px-8 py-2 text-center text-xl text-white ${className}`}
      onClick={onClick}
    >
      <p className="text-center">{option.trim()}</p>
    </div>
  );
}
