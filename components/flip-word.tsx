import React from "react";
import { FlipWords } from "./ui/flip-words";
export default function CustomFlipWords() {
  //   "efficiency"
  // "flexibility"
  // "control"
  // "security"
  // "precision"
  const words = [
    "efficiency",
    "flexibility",
    "control",
    "security",
    "precision",
  ];

  return (
    <div className="h-[40rem] flex justify-center items-center px-4">
      <div className="ml-[21vw] w-full text-6xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        Elevate operational
        <FlipWords words={words} /> <br />
        to new heights
      </div>
    </div>
  );
}
