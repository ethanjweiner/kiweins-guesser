import { Inter } from "next/font/google";
import Background from "../components/Background";
import { getSession } from "../utils/session";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faPhotoFilm } from "@fortawesome/free-solid-svg-icons";

const interLight = Inter({ weight: "300", subsets: ["latin"] });

export default function Results() {
  const sessionData = getSession();

  const roundsCorrect = sessionData.roundInfo.roundsCorrect;
  const roundsTotal = sessionData.roundInfo.roundsTotal;
  const percentage = Math.ceil((roundsCorrect / roundsTotal) * 100);

  return (
    <>
      <Background />
      <div className="p-8 flex flex-col h-screen justify-center">
        <div className="bg-white py-12 px-8 -mt-48 shadow-2xl w-full h-fit relative z-10 rounded-3xl">
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
              className="text-center bg-gradient-to-r text-2xl flex justify-center from-violet-600 to-violet-400 w-full text-white rounded-full px-4 py-4"
            >
              <FontAwesomeIcon icon={faMusic} className="w-10" />
            </Link>
            <Link
              href="/games/pics/play"
              className="text-center bg-gradient-to-r from-pink-600 text-2xl flex justify-center to-pink-400 text-white w-full rounded-full px-4 py-4 ml-4"
            >
              <FontAwesomeIcon icon={faPhotoFilm} className="w-10" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
