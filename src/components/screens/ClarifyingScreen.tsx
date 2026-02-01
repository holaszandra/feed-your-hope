"use client";

import { useState, useEffect } from "react";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/context/LanguageContext";

interface ClarifyingScreenProps {
  biblicalContext: string;
  question: string;
  onSubmit: (answer: string) => void;
  onBack: () => void;
  isLoading: boolean;
}

export function ClarifyingScreen({
  biblicalContext,
  question,
  onSubmit,
  onBack,
  isLoading,
}: ClarifyingScreenProps) {
  const [answer, setAnswer] = useState("");
  const [showContext, setShowContext] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Staggered animation timings
    const contextTimer = setTimeout(() => setShowContext(true), 100);
    const questionTimer = setTimeout(() => setShowQuestion(true), 400);
    const inputTimer = setTimeout(() => setShowInput(true), 700);

    return () => {
      clearTimeout(contextTimer);
      clearTimeout(questionTimer);
      clearTimeout(inputTimer);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim() && !isLoading) {
      onSubmit(answer.trim());
    }
  };

  return (
    <div className="relative h-full flex flex-col px-6 py-8 sm:py-12 bg-bg-base">
      <BackButton onBack={onBack} />
      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
        {/* Biblical Context */}
        <div
          className={`mb-8 transition-all duration-500 ease-out ${
            showContext
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
        >
          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed font-serif italic">
            {biblicalContext}
          </p>
        </div>

        {/* Clarifying Question */}
        <div
          className={`mb-8 transition-all duration-500 ease-out ${
            showQuestion
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-xl sm:text-2xl text-text-primary font-medium leading-relaxed">
            {question}
          </p>
        </div>

        {/* Answer Input */}
        <form
          onSubmit={handleSubmit}
          className={`transition-all duration-500 ease-out ${
            showInput ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (answer.trim() && !isLoading) {
                  onSubmit(answer.trim());
                }
              }
            }}
            placeholder={t("clarifyingPlaceholder")}
            className="w-full h-28 sm:h-32 p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-accent-rose/30 text-text-primary placeholder:text-text-secondary/50 resize-none text-base sm:text-lg leading-relaxed focus:border-accent-coral transition-colors"
            disabled={isLoading}
            autoFocus
          />

          <button
            type="submit"
            disabled={!answer.trim() || isLoading}
            className="btn-primary mt-4 w-full disabled:opacity-50 disabled:cursor-not-allowed tap-target"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t("welcomeButtonLoading")}
              </span>
            ) : (
              t("clarifyingButton")
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
