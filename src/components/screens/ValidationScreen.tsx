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

      {/* Next hint */}
      <div className="text-center pb-4 px-6">
        <span className="text-text-secondary/50 text-sm font-sans">{t("validationContinue")}</span>
      </div>
    </div>
  );
}
