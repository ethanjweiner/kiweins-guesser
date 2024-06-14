"use client";

import { Caveat } from "next/font/google";
import Modal from "react-modal";

const caveat = Caveat({ weight: "400", subsets: ["cyrillic"] });

export function LetterModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const introduction = "Hey Cutie!";

  const text =
    "I think it's interesting that we never really had a single day when we decided we were suddenly \"together\". It's kinda fitting. Our transition into being together - and my transition into loving you - felt so seamless, so natural, in a way that I didn't understand before it happened. And that similar essence is still present in how I feel around you today: spending time with you feels seamless. You are my home in the non-physical world. I have a hard time \"feeling\" at home around anyone, but you make me feel that way. More than that - you make me feel loved, cared for, special. And if you admire me for me excitement about things, I admire you for your loving care and tenderness toward things (the *real* things in this world) - like the osprey on the live tracker, or my light sensitivity issues. Your tender playfulness in your texts, your emojis that I will someday understand. Your soothing voice on our phone calls that reminds me of how I probably felt vibrating on the washing machine as a baby. And this goes without saying, but I've grown so much in the last year with you. I feel like you have helped me become more of the person I've always wanted to be, just didn't fully realize I wanted to be until I met you. I love you bb.";

  const signOff = "Love, Ethan <3";
  return (
    <Modal
      shouldCloseOnOverlayClick
      onRequestClose={() => setIsOpen(false)}
      isOpen={isOpen}
      style={{
        content: {
          borderRadius: "2rem",
          border: "7px solid pink",
          transition: "opacity 0.5s",
          inset: "30px",
        },
        overlay: {
          transition: "opacity 0.5s",
        },
      }}
    >
      <div className="p-2 relative">
        <p className={`${caveat.className} text-3xl mb-8`}>{introduction}</p>
        <p className={`${caveat.className} text-3xl mb-8`}>{text}</p>
        <p className={`${caveat.className} text-3xl mb-8`}>{signOff}</p>

        <button
          onClick={() => setIsOpen(false)}
          className="bg-pink-700 text-white text-xl mx-auto rounded-lg py-3 px-6 shadow-lg"
        >
          Awww, that was cute, now bring me back to the game!
        </button>
      </div>
    </Modal>
  );
}
