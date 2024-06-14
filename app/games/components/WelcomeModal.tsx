"use client";

import Background from "@/app/components/Background";
import { Caveat } from "next/font/google";
import { useState } from "react";
import Modal from "react-modal";

const caveat = Caveat({ weight: "400", subsets: ["cyrillic"] });

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(true);

  const text =
    "So for our one year, I (E-Weins) thought I'd do something a bit different. I vaguely remember one time you expressed interest in the idea of guessing the BPM of songs as they play. So, I made a game out of it. Plus a little extra. Have fun :)";

  return (
    <Modal
      shouldCloseOnOverlayClick
      onRequestClose={() => setIsOpen(false)}
      isOpen={isOpen}
      style={{
        content: {
          borderRadius: "2rem",
          border: "7px solid white",
          transition: "opacity 0.5s",
        },
        overlay: {
          transition: "opacity 0.5s",
        },
      }}
    >
      <Background />
      <div className="p-2 relative">
        <h1 className="text-3xl text-center text-violet-700 mb-4">
          Welcome to
        </h1>
        <h1 className="text-4xl w-full text-center bg-gradient-to-r from-violet-600 to-pink-600 mb-4 inline-block text-transparent bg-clip-text">
          Kiwi Kwiz!
        </h1>
        <p className={`${caveat.className} text-2xl text-black mb-8`}>{text}</p>
        <button
          onClick={() => setIsOpen(false)}
          className="bg-violet-700 text-white text-xl mx-auto rounded py-3 px-6 shadow-lg"
        >
          Ok, Let Me Play!
        </button>
      </div>
    </Modal>
  );
}
