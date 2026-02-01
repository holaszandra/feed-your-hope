"use client";

import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/context/LanguageContext";

interface LieRevealScreenProps {
  lie: string;
  onNext: () => void;
  onBack: () => void;
}

export function LieRevealScreen({ lie, onNext, onBack }: LieRevealScreenProps) {
  const { t } = useLanguage();

  return (
    <div
      className="relative h-full flex flex-col px-6 py-8 sm:py-12 cursor-pointer bg-bg-base"
      onClick={onNext}
    >
      <BackButton onBack={onBack} />
      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
        <div className="text-center space-y-6">
          {/* Intro text */}
          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed">
            {t("lieIntro")}
          </p>

          {/* The lie - emphasized */}
          <div className="py-6 px-4 bg-white/50 rounded-2xl border border-accent-rose/20">
            <p className="text-2xl sm:text-3xl text-text-primary font-serif italic leading-relaxed">
              &ldquo;{lie}&rdquo;
            </p>
          </div>

          {/* Closing thought */}
          <p className="text-base sm:text-lg text-text-secondary/70">
            {t("lieClosing")}
          </p>
        </div>
      </div>

      {/* Next hint */}
      <div className="text-center pb-4">
        <span className="text-text-secondary/50 text-sm font-sans">{t("lieContinue")}</span>
      </div>
    </div>
  );
}
