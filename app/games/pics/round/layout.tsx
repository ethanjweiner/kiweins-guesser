import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute justify-center flex w-full h-96 bg-gradient-to-b from-pink-600 from-10% via-pink-400 via-70% to-white to-100%">
      <Link href="/" className="text-white absolute right-6 top-6">
        <FontAwesomeIcon icon={faHome} className="w-8 h-8" />
      </Link>
      {children}
    </div>
  );
}
