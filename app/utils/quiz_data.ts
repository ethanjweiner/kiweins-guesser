import "server-only";

import {
  GetObjectCommand,
  ListObjectsCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import EXIF from "exif-js";

import { getPlaylistTracks, getRandomTrack } from "./spotify";
import {
  GameType,
  GuessProperty,
  PicRoundData,
  TuneRoundData,
  TunesGuessProperty,
} from "../types";
import { generatePicAnswerOptions, getTuneOptions } from "./round_data";

const playlistIds = [
  "3oyeOWvFI7bGLXfqKrM0Py",
  "2C4RRVazAvmyShWMC3KNf8",
  "7nqMpW8vaB0zDTCIvuHEIt",
  "42P328dV0Z4njaUXm5jNhr",
];

export async function getRoundData(
  gameType: GameType,
  guessProperty: GuessProperty
) {
  if (gameType === "tunes") {
    return getTuneRoundData({
      guessProperty: guessProperty as TunesGuessProperty,
    });
  }

  if (gameType === "pics") {
    return getPicRoundData();
  }

  throw new Error(`Invalid game type: ${gameType}`);
}

export async function getTuneRoundData({
  guessProperty,
}: {
  guessProperty: TunesGuessProperty;
}): Promise<TuneRoundData> {
  const allTracks = (
    await Promise.all(playlistIds.map(getPlaylistTracks))
  ).flat();

  const track = await getRandomTrack(allTracks, {
    withTempo: guessProperty === "bpm",
  });

  const options = getTuneOptions(track, allTracks, guessProperty);

  return {
    track,
    options,
  };
}

export function shuffleOptions(
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

export async function getPicRoundData(): Promise<PicRoundData> {
  const s3Data = await getS3Objects();
  const photos = s3Data.Contents;

  if (!photos) {
    throw new Error("No photos found");
  }

  const randomIndex = Math.floor(Math.random() * photos.length);
  const randomPhoto = photos[randomIndex];
  const key = randomPhoto.Key as string;
  const objectData = await getS3Object(key);
  const arrayBuffer = (await objectData.Body?.transformToByteArray())!.buffer;
  const exifData = EXIF.readFromBinaryFile(arrayBuffer);

  if (!exifData || !exifData.DateTimeOriginal) {
    return getPicRoundData();
  }

  const month = getMonthFromExifDate(exifData.DateTimeOriginal);

  if (!month) {
    throw new Error("No month found");
  }

  const photo = {
    key,
    month,
  };

  return {
    photo,
    options: generatePicAnswerOptions(photo, "month"),
  };
}

function getMonthFromExifDate(dateString: string): string | null {
  const monthIndex = parseInt(dateString.split(":")[1]) - 1;
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
  return allMonths[monthIndex];
}

async function getS3Object(key: string) {
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error("AWS credentials not found");
  }

  const client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const command = new GetObjectCommand({
    Bucket: "kiwiens-images",
    Key: key,
  });

  const response = await client.send(command);
  return response;
}

async function getS3Objects() {
  const client = new S3Client({ region: "us-east-1" });
  const command = new ListObjectsCommand({
    Bucket: "kiwiens-images",
  });

  const response = await client.send(command);
  return response;
}
