"use client";

import { useState, useEffect, useRef } from "react";

interface RotatingTypewriterProps {
  texts: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
}

export function RotatingTypewriter({
  texts,
  className,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseDuration = 2000,
}: RotatingTypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentText = texts[textIndex];

  useEffect(() => {
    const cleanup = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

    if (phase === "typing") {
      if (displayText.length < currentText.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, typeSpeed);
      } else {
        timeoutRef.current = setTimeout(() => {
          setPhase("deleting");
        }, pauseDuration);
      }
    } else if (phase === "deleting") {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deleteSpeed);
      } else {
        setTextIndex((prev) => (prev + 1) % texts.length);
        setPhase("typing");
      }
    }

    return cleanup;
  }, [displayText, phase, currentText, texts.length, typeSpeed, deleteSpeed, pauseDuration]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
}
