import "server-only";
import {
  GetObjectCommand,
  ListObjectsCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import fs from "fs";
import EXIF from "exif-js";

import { getPlaylistTracks, getRandomTrack } from "./spotify";
import {
  PicRoundData,
  Track,
  TuneRoundData,
  TunesGuessProperty,
} from "../types";
import { getIncorrectMonths, getIncorrectOptions } from "./round_data";

export async function getTuneRoundData({
  guessProperty,
}: {
  guessProperty: TunesGuessProperty;
}): Promise<TuneRoundData> {
  const playlistIds = JSON.parse(fs.readFileSync("playlists.json", "utf-8"))
    .playlistIds as string[];

  const allTracks = (
    await Promise.all(playlistIds.map(getPlaylistTracks))
  ).flat();

  const track = await getRandomTrack(allTracks, {
    withTempo: guessProperty === "bpm",
  });
  const incorrectOptions = getIncorrectOptions(allTracks, track, guessProperty);

  return {
    track,
    incorrectOptions,
  };
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

  // TODO: Ensure all photos have EXIF data
  if (!exifData || !exifData.DateTimeOriginal) {
    return getPicRoundData();
  }

  const month = getMonthFromExifDate(exifData.DateTimeOriginal);

  if (!month) {
    throw new Error("No month found");
  }

  const incorrectOptions = getIncorrectMonths(month);

  return {
    photo: {
      key,
      month,
    },
    incorrectOptions,
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
  const client = new S3Client({ region: "us-east-1" });
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
