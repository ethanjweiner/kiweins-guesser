import { Option } from "@/app/components/Select";
import { GuessProperty } from "@/app/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GuessTypeIndicator({
  guessOption,
}: {
  guessOption: Option<GuessProperty>;
}) {
  return (
    <span>
      <span className="absolute left-24 top-4 -ml-8 rounded-r-xl bg-yellow-300 p-2 pl-14 pr-4 text-lg text-black shadow-lg">
        {guessOption.name}
        <FontAwesomeIcon
          icon={guessOption.icon}
          className="-mt-1 ml-1 inline w-5 text-black"
        />
      </span>
      <span className="z-1 absolute left-0 top-4 bg-slate-800 p-2 text-lg text-white shadow-lg">
        Guess the
      </span>
    </span>
  );
}
