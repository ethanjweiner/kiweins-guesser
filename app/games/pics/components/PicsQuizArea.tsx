"use client";

import { PicQuiz, Session } from "@/app/types";
import { useState } from "react";
import { QuizArea } from "../../components/QuizArea";
import Image from "next/image";
import { MainSkeleton } from "../../components/suspense/EmbedSkeleton";

export default function PicsQuizArea({
  session,
}: {
  session: Session<PicQuiz>;
}) {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { photo } = session.quiz.roundData;

  const correctAnswer = (() => {
    switch (session.quiz.guessProperty) {
      case "month":
        return photo.month;
      default:
        throw new Error(`Unknown guess type: ${session.quiz.guessProperty}`);
    }
  })();

  return (
    <QuizArea
      session={session}
      correctAnswer={correctAnswer}
      isCorrect={isCorrect}
      setIsCorrect={setIsCorrect}
    >
      <div
        className="relative w-full h-72 rounded-xl shadow-slate-300 shadow-md mb-8"
        style={{ paddingBottom: "66.67%" }}
      >
        {!isLoaded && <MainSkeleton height={72} />}
        <Image
          className="absolute inset-0 object-cover rounded-xl"
          alt="Kiwiens Image"
          src={`https://kiwiens-images.s3.amazonaws.com/${photo.key}`}
          fill={true}
          onLoadingComplete={() => setIsLoaded(true)}
        />
      </div>
    </QuizArea>
  );
}
