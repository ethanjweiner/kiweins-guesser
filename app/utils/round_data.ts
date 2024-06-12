import { Photo, PicsGuessProperty, Track, TunesGuessProperty } from "../types";

export function getTuneOptions(
  correctTrack: Track,
  allTracks: Track[],
  guessProperty: TunesGuessProperty
): string[] {
  const incorrectOptions = getIncorrectOptions(
    allTracks,
    correctTrack,
    guessProperty
  );

  switch (guessProperty) {
    case "bpm":
      if (!correctTrack.tempo) {
        throw new Error("Track does not have a BPM value");
      }
      return getBpmOptions(correctTrack.tempo);
    case "song_name":
      return shuffleOptions(correctTrack.name, incorrectOptions);
    case "artist":
      return shuffleOptions(correctTrack.artists[0], incorrectOptions);
    case "year":
      return shuffleOptions(correctTrack.year, incorrectOptions);
    default:
      throw new Error("Invalid guess type");
  }
}

export function generatePicAnswerOptions(
  photo: Photo,
  guessProperty: PicsGuessProperty
): string[] {
  const incorrectOptions = getIncorrectMonths(photo.month);

  switch (guessProperty) {
    case "month":
      return shuffleOptions(photo.month, incorrectOptions);
    default:
      throw new Error("Invalid guess type");
  }
}

export function getBpmOptions(correctBpm: number): string[] {
  const correctIndex = Math.floor(Math.random() * 4);

  const options: string[] = [];

  function generateIncorrectOption(bpm: number): number {
    const isHigher = Math.random() > 0.5;
    const offset = Math.floor(Math.random() * 30) + 8;
    const newBpm = isHigher ? bpm + offset : bpm - offset;

    // Generate new options if the new bpm is too close to the correct bpm or any of the other options
    if (
      options.some(
        (option) =>
          parseInt(option, 10) > newBpm - 8 && parseInt(option, 10) < newBpm + 8
      )
    ) {
      return generateIncorrectOption(bpm);
    }

    return newBpm;
  }

  for (let i = 0; i < 4; i++) {
    if (i === correctIndex) {
      options.push(correctBpm.toString());
    } else {
      options.push(generateIncorrectOption(correctBpm).toString());
    }
  }

  return options;
}

function shuffleOptions(
  correctOption: string,
  incorrectOptions: string[]
): string[] {
  const correctIndex = Math.floor(Math.random() * 4);
  const options: string[] = [];

  for (let i = 0; i < 4; i++) {
    if (i === correctIndex) {
      options.push(correctOption);
    } else {
      options.push(incorrectOptions.pop()!);
    }
  }

  return options;
}

export function getIncorrectOptions(
  allTracks: Track[],
  correctTrack: Track,
  guessProperty: TunesGuessProperty
): string[] {
  console.log("called");
  console.log(guessProperty, allTracks.length, correctTrack);
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
