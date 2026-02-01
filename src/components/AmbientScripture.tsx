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
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden px-8">
      <div
        className={`text-center transition-opacity duration-[2500ms] ease-in-out ${
          isVisible ? "opacity-[0.2]" : "opacity-0"
        }`}
      >
        <p className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary leading-relaxed max-w-4xl italic">
          &ldquo;{currentVerse.text}&rdquo;
        </p>
        <p className="mt-4 text-lg sm:text-xl text-accent-gold font-medium">
          — {currentVerse.reference}
        </p>
      </div>
    </div>
  );
}
