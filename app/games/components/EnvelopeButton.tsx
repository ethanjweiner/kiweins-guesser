"use client";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LetterModal } from "./LetterModal";
import { useState } from "react";

export default function EnvelopeButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={faEnvelope}
        className="text-2xl text-pink-600 drop-shadow-xl w-16 h-16 text-center mt-4"
        onClick={() => setIsOpen(true)}
      />
      <LetterModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
