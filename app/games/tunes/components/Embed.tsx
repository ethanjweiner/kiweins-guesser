"use client";

import { useEffect } from "react";

export default function Embed({
  songId,
  isLoaded,
  setIsLoaded,
}: {
  songId: string;
  isLoaded: boolean;
  setIsLoaded: (isLoaded: boolean) => void;
}) {
  useEffect(() => {
    setIsLoaded(false);
  }, [songId, setIsLoaded]);

  return (
    <>
      <iframe
        className={`h-96 w-full mx-auto ${isLoaded ? "block" : "hidden"}`}
        id="track-iframe"
        style={{ borderRadius: "12px" }}
        src={`https://open.spotify.com/embed/track/${songId}?utm_source=generator&theme=0`}
        allowFullScreen={false}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        onLoad={() => setIsLoaded(true)}
      ></iframe>
    </>
  );
}
