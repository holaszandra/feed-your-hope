"use client";

import type { Scripture } from "@/types";
import { BackButton } from "@/components/BackButton";
import { ReminderSignup } from "@/components/ReminderSignup";
import { useLanguage } from "@/context/LanguageContext";

interface AffirmationScreenProps {
  affirmation: string;
  onDone: () => void;
  onBack: () => void;
  encouragementVerse?: Scripture;
  userTopic?: string;
  clarifyingAnswer?: string;
}

export function AffirmationScreen({
  affirmation,
  onDone,
  onBack,
  encouragementVerse,
  userTopic,
  clarifyingAnswer,
}: AffirmationScreenProps) {
  const { t } = useLanguage();

  return (
    <div className="relative h-full flex flex-col px-6 py-8 sm:py-12 bg-bg-closing overflow-y-auto">
      <BackButton onBack={onBack} />
      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
        <div className="text-center">
          <p className="affirmation-text">
            {affirmation}
          </p>
        </div>

        {/* Reminder Signup */}
        {encouragementVerse && userTopic && (
          <ReminderSignup
            encouragementVerse={encouragementVerse}
            userTopic={userTopic}
            clarifyingAnswer={clarifyingAnswer}
          />
        )}
      </div>

      {/* Done button */}
      <div className="text-center pb-4 mt-6">
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
