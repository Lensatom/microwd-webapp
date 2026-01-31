"use client"

import { useEffect, useState } from "react";

function AnimatedList({
  mainText,
  subText,
  endText,
  delayIndex,
}: {
  mainText: string;
  subText?: string;
  endText?: string;
  delayIndex?: number;
}) {
  return (
    <div className="w-full flex items-center gap-2 animatedList p-4 rounded-lg" style={{animation: "fadeIn 1s ease-in-out", animationDelay: `${delayIndex ? delayIndex * 100 : 0}ms`, animationFillMode: "forwards"}}>
      <h3 className="text-white/90 text-sm whitespace-nowrap">
        {mainText.split("").map((char, index) => <Char key={index} char={char} delayIndex={index} />)}
      </h3>
      <p className="text-xs mt-1 text-primary-light whitespace-nowrap">
        {subText?.split("").map((char, index) => <Char key={index} char={char} delayIndex={index} />)}
      </p>
      <div className="h-px mt-1" style={{animation: "drawLine 1s ease-in-out", animationDelay: `${delayIndex ? delayIndex * 200 : 0}ms`, animationFillMode: "forwards"}} />
      <p className="text-xs mt-1 text-primary-light whitespace-nowrap">{endText}</p>
    </div>
  )
}

function Char({ char, delayIndex }: { char: string; delayIndex?: number }) {
  const characters_1 = " cfiloruxADGJMPSVY147!$&)=]|'</\"";
  const characters_2 = "adgjmpsvyBEHKNQTWZ258@%*-+{;,>`\\";
  const characters_3 = "behknqtwzCFILORUX0369#^(_[}:.?~";

  const [characterIndex, setCharacterIndex] = useState<number | null>(null);

  const charactersWithChar = (
    characters_1.includes(char)
    ? characters_1
    : characters_2.includes(char)
      ? characters_2
      : characters_3
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    timeout = setTimeout(() => {
      setCharacterIndex(0);
    }, (delayIndex ? delayIndex * 100 : 0) + 50);
    return () => clearTimeout(timeout);
  }, [delayIndex]);
  
  useEffect(() => {
    if (characterIndex === null) return;
    let timeout: NodeJS.Timeout;
    timeout = setTimeout(() => {
      if (charactersWithChar[characterIndex] === char) {
        clearTimeout(timeout);
        return
      }
      setCharacterIndex(prev => (prev ?? 0) + 1);
    }, 10);
    return () => clearTimeout(timeout);
  }, [characterIndex]);

  if (characterIndex === null) return <></>;

  if (charactersWithChar[characterIndex] === " ") return " "
  
  return <span>{charactersWithChar[characterIndex]}</span>
}

export default AnimatedList