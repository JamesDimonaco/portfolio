"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function ScrambleText({ text, className, delay = 0 }: ScrambleTextProps) {
  const getScrambled = useCallback(
    () => text.split("").map(char => (char === " " ? " " : LETTERS[Math.floor(Math.random() * 26)])).join(""),
    [text]
  );

  const [displayText, setDisplayText] = useState(getScrambled);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasAnimated = useRef(false);

  const runScramble = useCallback(() => {
    let iteration = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return LETTERS[Math.floor(Math.random() * 26)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }

      iteration += 1 / 3;
    }, 30);
  }, [text]);

  // Run on mount after delay
  useEffect(() => {
    if (!hasAnimated.current) {
      const timeout = setTimeout(() => {
        runScramble();
        hasAnimated.current = true;
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [delay, runScramble]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <span className={className} onMouseOver={runScramble}>
      {displayText}
    </span>
  );
}
