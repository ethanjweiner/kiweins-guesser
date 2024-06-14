import { Inter } from "next/font/google";
import Background from "../components/Background";
import { getSession } from "../utils/session";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faEnvelope,
  faMusic,
  faPhotoFilm,
} from "@fortawesome/free-solid-svg-icons";
import { LetterModal } from "../games/components/LetterModal";
import EnvelopeButton from "../games/components/EnvelopeButton";

const interLight = Inter({ weight: "300", subsets: ["latin"] });

export default function Results() {
  const sessionData = getSession();

  const roundsCorrect = sessionData.roundInfo.roundsCorrect;
  const roundsTotal = sessionData.roundInfo.roundsTotal;
  const percentage = Math.ceil((roundsCorrect / roundsTotal) * 100);

  return (
    <>
      <Background />
      <div className="p-8 h-screen ">
        <div className="bg-white py-12 px-8 my-4 shadow-2xl w-full h-fit relative rounded-3xl">
          <h1 className="text-center text-4xl text-pink-600">Results</h1>

          <p className={`${interLight.className} text-lg mt-8`}>
            You got {sessionData.roundInfo.roundsCorrect} /{" "}
            {sessionData.roundInfo.roundsTotal} ({percentage}%) correct!
          </p>

          <div className="w-full mt-4 bg-gray-200 rounded-full h-4 dark:bg-gray-700">
            <div
              className="bg-pink-600 h-4 rounded-full"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <p className={`${interLight.className} text-lg mt-8`}>
            Play another one?
          </p>
          <div className="flex mt-4">
            <Link
              href="/games/tunes/play"
              className="text-center bg-gradient-to-r text-2xl flex justify-center from-violet-600 to-violet-400 rounded-l-lg w-full text-white px-4 py-4"
            >
              <FontAwesomeIcon icon={faMusic} className="w-10" />
            </Link>
            <Link
              href="/games/pics/play"
              className="text-center bg-gradient-to-r from-pink-600 text-2xl flex justify-center to-pink-400 text-white rounded-r-lg w-full px-4 py-4 "
            >
              <FontAwesomeIcon icon={faPhotoFilm} className="w-10" />
            </Link>
          </div>
        </div>
        <div className="relative mt-8">
          <h1 className="text-2xl text-violet-500 drop-shadow-md text-center">
            Open this for a surprise
          </h1>
          <div className="flex justify-center">
            <FontAwesomeIcon
              icon={faArrowDown}
              className="text-xl text-violet-500 drop-shadow-md w-8 h-8 text-center mt-4"
            />
          </div>
          <div className="flex justify-center">
            <EnvelopeButton />
          </div>
        </div>
      </div>
    </>
  );
}
