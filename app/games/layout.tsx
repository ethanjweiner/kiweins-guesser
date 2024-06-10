import React from "react";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute justify-center flex w-full h-96 bg-gradient-to-b from-violet-600 from-10% via-violet-500 via-70% to-white to-100%">
      {children}
    </div>
  );
}
