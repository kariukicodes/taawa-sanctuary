import { useState, useEffect } from "react";

export const Typewriter = ({
  text,
  delay = 25,
  startDelay = 600,
}: {
  text: string;
  delay?: number;
  startDelay?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  // Initial delay before typing starts so it aligns with the fade-in animations
  useEffect(() => {
    const startTimeout = setTimeout(() => setHasStarted(true), startDelay);
    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  // Typing effect by advancing the index
  useEffect(() => {
    if (hasStarted && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, hasStarted, text]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className={`${
              index < currentIndex ? "opacity-100" : "opacity-0"
            } transition-opacity duration-75`}
          >
            {char}
          </span>
        ))}
      </span>
    </>
  );
};
