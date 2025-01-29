import React from "react";
import { Caveat, DM_Sans, Montserrat, Roboto } from "@/theme";
import {
  TypewriterEffect,
  TypewriterEffectHeader,
} from "@/components/ui/typewriter";

interface WordObject {
  text: string;
  className: string;
}

interface WordProcessorProps {
  text: string;
  animate?: boolean;
  headline?: boolean;
}

const WordProcessor: React.FC<WordProcessorProps> = ({
  text,
  animate,
  headline,
}) => {
  // Define dynamic styles based on word importance
  const getClassName = (word: string): string => {
    if (
      ["software", "years", "seasoned", "experience", "business"].includes(word)
    ) {
      return `${DM_Sans.className} italic text-cyan-900 dark:text-cyan-400 font-bold`;
    }
    if (
      [
        "Eddie Villanueva",
        "Eddie",
        "Build",
        "build",
        "workflows",
        "DevOps",
        "cloud",
        "engineering",
        "innovation",
        "portfolio",
        "12",
        "Villanueva",
      ].includes(word)
    ) {
      if (headline) {
        return `${Caveat.className} text-orange-900 dark:text-orange-500 font-bold md:text-7xl`;
      }
      return `${Caveat.className} text-orange-900 dark:text-orange-500 font-bold md:text-2xl`;
    }
    if (
      ["monitoring", "Build", "professional", "teams", "applications"].includes(
        word
      )
    ) {
      return `${Montserrat.className} text-blue-900 dark:text-blue-500 font-bold`;
    }
    if (
      [
        "full-stack",
        "mentoring",
        "objectives",
        "engineer",
        "development",
        "awesome",
      ].includes(word)
    ) {
      return `${Roboto.className} text-purple-900 dark:text-purple-400 font-bold`;
    }
    if (word.match(/[,.!?]/)) {
      if (headline) {
        return `text-neutral-100 font-bold`;
      }
      return "text-neutral-100 font-bold"; // Light style for punctuation
    }
    if (headline) {
      return `text-neutral-200 font-bold`;
    }
    return "text-neutral-200";
  };

  // Convert input text into an array of word objects
  const words: WordObject[] = text.split(/\s+/).map((word) => ({
    text: word,
    className: getClassName(word),
  }));

  return (
    <div>
      {animate ? (
        headline ? (
          <TypewriterEffectHeader
            words={words}
            className="text-xl sm:text-3xl md:text-5xl"
          />
        ) : (
          <TypewriterEffect className="text-lg" words={words} />
        )
      ) : (
        <pre className="bg-gray-900 text-white p-4 mt-10 rounded">
          {JSON.stringify(words, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default WordProcessor;
