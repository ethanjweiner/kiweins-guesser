import { faMusic, faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function ChooseGame() {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <Link
        href="/games/tunes/play"
        className="flex h-full w-full items-center justify-center bg-gradient-to-r from-violet-600 to-violet-400 border-b-8 border-white"
      >
        <div className="flex items-center justify-center text-6xl text-white">
          <FontAwesomeIcon icon={faMusic} className="w-20 md:w-40" />
        </div>
      </Link>
      <Link
        href="/games/pics/play"
        className="flex h-full w-full items-center justify-center bg-gradient-to-r from-pink-600 to-pink-400"
      >
        <div className="flex items-center justify-center text-6xl text-white">
          <FontAwesomeIcon icon={faPhotoFilm} className="w-20 md:w-40" />
        </div>
      </Link>
    </div>
  );
}
