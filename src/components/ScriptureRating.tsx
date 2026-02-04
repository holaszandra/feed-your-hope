"use client";

import { useState } from "react";

interface ScriptureRatingProps {
  onRate: (rating: number) => void;
}

export function ScriptureRating({ onRate }: ScriptureRatingProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleRate = (value: number) => {
    setRating(value);
    onRate(value);
  };

  const displayRating = hoveredRating ?? rating;

  return (
    <div
      className="flex flex-col items-center gap-3"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-sm text-text-secondary text-center">
        How much does this scripture fit your situation?
      </p>
      <div className="prayer-rating">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            className={`prayer-emoji ${displayRating !== null && value <= displayRating ? "active" : ""}`}
            onClick={() => handleRate(value)}
            onMouseEnter={() => setHoveredRating(value)}
            onMouseLeave={() => setHoveredRating(null)}
            aria-label={`Rate ${value} out of 5`}
          >
            🙏🏻
          </button>
        ))}
      </div>
      {rating !== null && (
        <p className="text-xs text-text-secondary/70 mt-1">
          Thank you for your feedback!
        </p>
      )}
    </div>
  );
}
