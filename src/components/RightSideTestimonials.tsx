import { useState, useEffect } from "react";

const quotes = [
  { text: "“Healing begins with being heard.”" },
  { text: "“You are allowed to feel, and to heal.”" },
  { text: "“Small steps lead to brighter days.”" },
  { text: "“Your story matters here.”" },
  { text: "“A safe space to find your light.”" },
];

export const RightSideTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mt-4 min-h-[40px] md:min-h-[48px] w-full max-w-[200px] text-center flex justify-center">
      {quotes.map((quote, index) => (
        <div
          key={index}
          className={`absolute top-0 w-full transition-all duration-700 ease-in-out ${
            index === currentIndex
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <p className="font-instrument text-white/70 text-[0.9rem] md:text-[0.95rem] italic leading-tight drop-shadow-sm px-2">
            {quote.text}
          </p>
        </div>
      ))}
    </div>
  );
};
