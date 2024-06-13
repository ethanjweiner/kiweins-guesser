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

  return (
    <div
      className={`relative w-full rounded-full border-4 border-${gameColor}-600 bg-gradient-to-br from-${gameColor}-500 to-${gameColor}-300 px-8 py-2 text-center text-xl text-white ${className}`}
      onClick={onClick}
    >
      <div className="text-center">{option.trim()}</div>
    </div>
  );
}
