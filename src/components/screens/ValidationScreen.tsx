"use client";

import type { ValidationSection } from "@/types";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/context/LanguageContext";

interface ValidationScreenProps {
  validation: ValidationSection;
  onNext: () => void;
  onBack: () => void;
}

export function ValidationScreen({
  validation,
  onNext,
  onBack,
}: ValidationScreenProps) {
  const { t } = useLanguage();

  return (
    <div
      className="relative h-full flex flex-col cursor-pointer bg-bg-validation"
      onClick={onNext}
    >
      <BackButton onBack={onBack} />

      <div className="flex-1 flex flex-col justify-center py-8">
        {/* Acknowledgment */}
        <div className="px-6 mb-5 max-w-lg mx-auto w-full">
          <p className="reflection-text text-text-secondary">
            {validation.acknowledgment}
          </p>
        </div>

        {/* Scripture with accent bars */}
        <div className="scripture-container scripture-container--validation">
          <p className="scripture-text scripture-text--validation">
            &ldquo;{validation.scripture.text}&rdquo;
          </p>
          <p className="scripture-reference scripture-reference--validation">
            — {validation.scripture.reference}
          </p>
        </div>

        {/* Who else felt this */}
        <div className="px-6 mt-5 mb-4 max-w-lg mx-auto w-full">
          <p className="text-sm sm:text-base text-text-secondary/70 leading-relaxed italic">
            {validation.whoElseFeltThis}
          </p>
        </div>

        {/* Bridge */}
        <div className="px-6 max-w-lg mx-auto w-full">
          <p className="reflection-text">
            <span className="emphasis">{validation.bridge}</span>
          </p>
        </div>
      </div>

      {/* Next hint - fixed at bottom */}
      <div className="sticky bottom-0 left-0 right-0 text-center pb-6 pt-4 px-6 bg-gradient-to-t from-bg-validation via-bg-validation to-transparent">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-sm text-text-secondary hover:bg-white/90 transition-colors text-sm font-medium"
        >
          {t("validationContinue")}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
