import { useGameType } from "@/app/hooks/useGameType";

export default function MultipleChoiceItem({
  option,
  className,
  onClick,
}: {
  option: string;
  className?: string;
  onClick?: () => void;
}) {
  const gameType = useGameType();
  const gameColor = gameType === "tunes" ? "violet" : "pink";

  const borderClass = `border-${gameColor}-600`;
  const fromClass = `from-${gameColor}-500`;
  const toClass = `to-${gameColor}-500`;

  return (
    <div
      className={`relative w-full rounded-full border-4 ${borderClass} bg-gradient-to-br ${fromClass} ${toClass} px-8 py-1 md:py-2 text-center text-xl text-white ${className}`}
      onClick={onClick}
    >
      <div className="text-center">{option.trim()}</div>
    </div>
  );
}
