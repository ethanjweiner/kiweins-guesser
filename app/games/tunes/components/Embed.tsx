"use client";

import { useState, useEffect } from "react";
import { Fallback } from "../../components/suspense/Fallback";

export default function Embed({ songId }: { songId: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [songId]);

  return (
    <>
      {!isLoaded && <Fallback mainHeight={96} />}
      <iframe
        className="h-96 w-full mx-auto"
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
