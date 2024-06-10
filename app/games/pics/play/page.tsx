import { Inter } from "next/font/google";
import ConfigurationForm from "../../components/ConfigurationForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const interLight = Inter({ weight: "300", subsets: ["latin"] });

export default function Play() {
  return (
    <div className="h-96 w-full flex-col items-stretch bg-gradient-to-r from-pink-600 to-pink-400 px-8 pt-12">
      <h1 className={`mb-4 text-4xl text-white`}>Pics Game</h1>
      <p className={`text-white italic ${interLight.className} mb-16`}>
        Guess the month the photo was taken
        <FontAwesomeIcon icon={faMusic} className="ml-2" />
      </p>
      <ConfigurationForm gameType="pics" />
    </div>
  );
}
