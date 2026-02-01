"use client";

import { useState, useEffect } from "react";
import { ambientVerses } from "@/lib/ambient-verses";

export function AmbientScripture() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Cycle through verses: fade in (2.5s) → hold (5s) → fade out (2.5s) = 10s total
    const cycleTime = 10000; // 10 seconds per verse

    const interval = setInterval(() => {
      // Start fade out
      setIsVisible(false);

      // After fade out, change verse and fade in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ambientVerses.length);
        setIsVisible(true);
      }, 2500); // Wait for fade out to complete
    }, cycleTime);

    return () => clearInterval(interval);
  }, []);

  const currentVerse = ambientVerses[currentIndex];

  return (
    <div className="absolute inset-x-0 top-[25%] sm:top-[30%] md:top-1/3 flex items-start justify-center pointer-events-none overflow-hidden px-6 sm:px-8">
      <div
        className={`text-center transition-opacity duration-[2500ms] ease-in-out ${
          isVisible ? "opacity-[0.2]" : "opacity-0"
        }`}
      >
        <p className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl text-text-primary leading-snug sm:leading-relaxed max-w-4xl italic">
          &ldquo;{currentVerse.text}&rdquo;
        </p>
        <p className="mt-2 sm:mt-4 text-base sm:text-lg md:text-xl text-accent-gold font-medium">
          — {currentVerse.reference}
        </p>
      </div>
    </div>
  );
}
