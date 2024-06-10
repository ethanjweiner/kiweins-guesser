"use client";

import { Suspense, useState } from "react";
import { QuizArea } from "../../components/QuizArea";
import { Session, TuneQuiz } from "@/app/types";
import Embed from "./Embed";
import Hider from "./Hider";

export default function TunesQuizArea({
  session,
}: {
  session: Session<TuneQuiz>;
}) {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const { track } = session.quiz.roundData;

  const correctAnswer = (() => {
    switch (session.quiz.guessProperty) {
      case "bpm":
        return track.tempo!.toString();
      case "artist":
        return track.artists.join(", ");
      case "song_name":
        return track.name;
      case "year":
        return track.year;
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
      {isCorrect === null &&
        ["song_name", "artist"].includes(session.quiz.guessProperty) && (
          <Hider />
        )}
      <Embed songId={session.quiz.roundData.track.id} />
    </QuizArea>
  );
}
