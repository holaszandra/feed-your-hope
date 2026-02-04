"use client";

import { useState } from "react";
import type { EncouragementSection } from "@/types";
import { BackButton } from "@/components/BackButton";
import { ScriptureRating } from "@/components/ScriptureRating";
import { useLanguage } from "@/context/LanguageContext";

interface EncouragementScreenProps {
  encouragement: EncouragementSection;
  onNext: () => void;
  onBack: () => void;
  onRate?: (rating: number) => void;
}

export function EncouragementScreen({
  encouragement,
  onNext,
  onBack,
  onRate,
}: EncouragementScreenProps) {
  const { t } = useLanguage();
  const [hasRated, setHasRated] = useState(false);

  const handleRate = (rating: number) => {
    setHasRated(true);
    onRate?.(rating);
  };

  return (
    <div
      className="relative h-full flex flex-col cursor-pointer bg-bg-encouragement"
      onClick={onNext}
    >
      <BackButton onBack={onBack} />

      <div className="flex-1 flex flex-col justify-center py-8">
        {/* Scripture with accent bars */}
        <div className="scripture-container scripture-container--encouragement mb-6">
          <p className="scripture-text scripture-text--encouragement">
            &ldquo;{encouragement.scripture.text}&rdquo;
          </p>
          <p className="scripture-reference scripture-reference--encouragement">
            — {encouragement.scripture.reference}
          </p>
        </div>

        {/* Application */}
        <div className="px-6 mb-4 max-w-lg mx-auto w-full">
          <p className="reflection-text text-text-secondary">
            {encouragement.application}
          </p>
        </div>

        {/* Purpose */}
        <div className="px-6 mb-4 max-w-lg mx-auto w-full">
          <p className="reflection-text">
            <span className="emphasis">{encouragement.purpose}</span>
          </p>
        </div>

        {/* Scripture Rating */}
        <div className="px-6 mt-2 max-w-lg mx-auto w-full">
          <ScriptureRating onRate={handleRate} />
        </div>
      </div>

      {/* Next hint - fixed at bottom */}
      <div className="sticky bottom-0 left-0 right-0 text-center pb-6 pt-4 px-6 bg-gradient-to-t from-bg-encouragement via-bg-encouragement to-transparent">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-sm text-text-secondary hover:bg-white/90 transition-colors text-sm font-medium"
        >
          {t("encouragementContinue")}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
