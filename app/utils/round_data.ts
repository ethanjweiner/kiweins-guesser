import { Track, TunesGuessProperty } from "../types";

export function getIncorrectOptions(
  allTracks: Track[],
  correctTrack: Track,
  guessProperty: TunesGuessProperty
): string[] {
  switch (guessProperty) {
    case "song_name":
      return getRandomSongNames(allTracks, correctTrack);
    case "artist":
      return getRandomArtists(allTracks, correctTrack);
    case "year":
      return getRandomYears(allTracks, correctTrack);
    default:
      return [];
  }
}

export function getIncorrectMonths(correctMonth: string): string[] {
  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const incorrectMonths = allMonths.filter((month) => month !== correctMonth);
  const randomMonths = getRandomElements(incorrectMonths, 3);
  return randomMonths;
}

const getRandomElements = <T>(array: T[], count: number): T[] => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export function getRandomYears(
  allTracks: Track[],
  correctTrack: Track
): string[] {
  const randomYears: string[] = [];

  while (randomYears.length < 3) {
    const randomIndex = Math.floor(Math.random() * allTracks.length);
    const year = allTracks[randomIndex].year;
    if (correctTrack.year !== year && !randomYears.includes(year)) {
      randomYears.push(allTracks[randomIndex].year);
    }
  }

  return randomYears;
}

export function getRandomSongNames(
  allTracks: Track[],
  correctTrack: Track
): string[] {
  const randomSongNames: string[] = [];

  while (randomSongNames.length < 3) {
    const randomIndex = Math.floor(Math.random() * allTracks.length);
    const songName = allTracks[randomIndex].name;
    if (correctTrack.name !== songName && !randomSongNames.includes(songName)) {
      randomSongNames.push(allTracks[randomIndex].name);
    }
  }

  return randomSongNames;
}

export function getRandomArtists(
  allTracks: Track[],
  correctTrack: Track
): string[] {
  const randomArtistNames: string[] = [];

  while (randomArtistNames.length < 3) {
    const randomIndex = Math.floor(Math.random() * allTracks.length);
    const artistName = allTracks[randomIndex].artists[0];
    if (
      correctTrack.artists[0] !== artistName &&
      !randomArtistNames.includes(artistName)
    ) {
      randomArtistNames.push(allTracks[randomIndex].artists[0]);
    }
  }

  return randomArtistNames;
}
