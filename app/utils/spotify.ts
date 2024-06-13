import { Track } from "../types";
import { kv } from "@vercel/kv";

export async function getRandomTrack(
  allTracks: Track[],
  options: { withTempo: boolean }
) {
  const track = allTracks[Math.floor(Math.random() * allTracks.length)];
  const { withTempo } = options;

  return {
    ...track,
    tempo: withTempo ? await getTrackTempo(track.id) : undefined,
  };
}

export async function getTrackTempo(trackId: string): Promise<number> {
  const audioFeatures = await fetchSpotifyApi({
    path: `audio-features/${trackId}`,
  });

  return Math.round(audioFeatures.tempo);
}

export async function getPlaylistTracks(playlistId: string): Promise<Track[]> {
  // Confirm: Are these requests cached in the data cache?
  const total = (
    await fetchSpotifyApi({
      path: `playlists/${playlistId}/tracks?fields=total`,
    })
  ).total;

  // Fetch all tracks in the playlist in batches of 50 (the maximum allowed by Spotify's API)
  const allItems = (
    await Promise.all(
      Array.from({ length: Math.ceil(total / 50) }, (_, i) =>
        fetchSpotifyApi({
          path: `playlists/${playlistId}/tracks?offset=${i * 50}&limit=50`,
        })
      )
    )
  )
    .map((playlistTrack) => playlistTrack.items)
    .flat();

  return allItems.map((item: any) => ({
    id: item.track.id,
    name: item.track.name,
    artists: item.track.artists.map((artist: any) => artist.name),
    bpm: item.track.tempo,
    year: item.track.album.release_date.split("-")[0],
  }));
}

export const refreshSpotifyToken = async () => {
  // If the access token has expired, fetch a refresh token
  const refreshToken = (await kv.get("spotify_refresh_token")) as string;

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const response = await fetch(`https://accounts.spotify.com/api/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const data = await response.json();

  kv.set("spotify_access_token", data.access_token);
  kv.set("spotify_refresh_token", data.refresh_token || refreshToken);

  return {
    accessToken: data.access_token as string,
    refreshToken: data.refresh_token as string,
  };
};

const fetchSpotifyApi = async ({
  path,
  method = "GET",
  body,
  headers,
}: {
  path: string;
  body?: any;
  method?: string;
  headers?: HeadersInit;
}): Promise<any> => {
  const accessToken = await kv.get("spotify_access_token");

  const response = await fetch(`https://api.spotify.com/v1/${path}`, {
    method,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + accessToken,
      ...headers,
    },
    body,
  });

  if (response.status === 401) {
    await refreshSpotifyToken();

    return await fetchSpotifyApi({ path, method, body, headers });
  }

  return await response.json();
};
