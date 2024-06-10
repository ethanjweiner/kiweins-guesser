import { RoundInformation } from "@/app/types";

export default function RoundInfo({
  roundInfo,
}: {
  roundInfo: RoundInformation;
}) {
  const numIncorrect = roundInfo.roundsCompleted - roundInfo.roundsCorrect;

  return (
    <div className="text-center items-center -mb-8">
      <div className="relative inline-block rounded-full w-8 text-center h-8 -mr-2 z-20 bg-green-500 p-2 shadow-lg shadow-slate-4te00">
        <p className="text-sm font-bold text-white">
          {roundInfo.roundsCorrect}
        </p>
      </div>
      <div className="relative inline-block rounded-full bg-white p-5 z-10 shadow-lg shadow-slate-4te00">
        <p className="text-lg font-bold text-slate-800">
          {roundInfo.roundsCompleted}/{roundInfo.roundsTotal}
        </p>
      </div>
      <div className="relative inline-block rounded-full w-8 text-center h-8 -ml-2 z-20 bg-red-500 p-2 shadow-lg shadow-slate-4te00">
        <p className="text-sm font-bold text-white">{numIncorrect}</p>
      </div>
    </div>
  );
}
