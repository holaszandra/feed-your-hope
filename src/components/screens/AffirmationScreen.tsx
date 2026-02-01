"use client";

import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/context/LanguageContext";

interface AffirmationScreenProps {
  affirmation: string;
  onDone: () => void;
  onBack: () => void;
}

export function AffirmationScreen({
  affirmation,
  onDone,
  onBack,
}: AffirmationScreenProps) {
  const { t } = useLanguage();

  return (
    <div className="relative h-full flex flex-col px-6 py-8 sm:py-12 bg-bg-closing">
      <BackButton onBack={onBack} />
      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
        <div className="text-center">
          <p className="affirmation-text">
            {affirmation}
          </p>
        </div>
      </div>

      {/* Done button */}
      <div className="text-center pb-4">
        <button
          onClick={onDone}
          className="btn-primary tap-target"
        >
          {t("affirmationButton")}
        </button>
      </div>
    </div>
  );
}
