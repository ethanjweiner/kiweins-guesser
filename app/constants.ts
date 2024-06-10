import {
  faCalendar,
  faClock,
  faFont,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { Option } from "./components/Select";
import {
  TunesGuessProperty,
  QuizType,
  tunesGuessPropertyLabels,
  quizTypeLabels,
  picsGuessPropertyLabels,
  PicsGuessProperty,
} from "./types";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

export const tuneGuessPropertyOptions: Option<TunesGuessProperty>[] = [
  {
    name: tunesGuessPropertyLabels["bpm"],
    icon: faClock,
    value: "bpm",
  },
  {
    name: tunesGuessPropertyLabels["song_name"],
    icon: faFont,
    value: "song_name",
  },
  {
    name: tunesGuessPropertyLabels["artist"],
    icon: faPerson,
    value: "artist",
  },
  {
    name: tunesGuessPropertyLabels["year"],
    icon: faCalendar,
    value: "year",
  },
];

export const picsGuessPropertyOptions: Option<PicsGuessProperty>[] = [
  {
    name: picsGuessPropertyLabels["month"],
    icon: faCalendar,
    value: "month",
  },
];

export const quizTypeOptions: Option<QuizType>[] = [
  {
    name: quizTypeLabels["multiple_choice"],
    icon: faCircle,
    value: "multiple_choice",
  },
  {
    name: quizTypeLabels["fill_in_the_blank"],
    icon: faFont,
    value: "fill_in_the_blank",
  },
];
