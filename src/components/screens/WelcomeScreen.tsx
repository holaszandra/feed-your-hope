"use client";

import { useState } from "react";
import { AmbientScripture } from "@/components/AmbientScripture";
import { useLanguage } from "@/context/LanguageContext";

interface WelcomeScreenProps {
  onSubmit: (input: string) => void;
  isLoading: boolean;
}

export function WelcomeScreen({ onSubmit, isLoading }: WelcomeScreenProps) {
  const [input, setInput] = useState("");
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSubmit(input.trim());
    }
  };

  return (
    <div className="relative h-full bg-bg-base">
      {/* Ambient Scripture Background */}
      <AmbientScripture />

      {/* Header */}
      <header className="relative z-10 pt-8 sm:pt-12 md:pt-16 text-center px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wide text-text-primary">
          {t("appName")}
        </h1>
        <p className="mt-2 sm:mt-3 text-base sm:text-lg md:text-xl text-text-secondary max-w-md mx-auto">
          {t("appTagline")}
        </p>
      </header>

      {/* Fixed Bottom Input Section */}
      <div className="fixed bottom-0 left-0 right-0 z-20 px-4 sm:px-6 pb-4 sm:pb-8 pt-6 bg-gradient-to-t from-bg-base from-70% to-transparent">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <label
            htmlFor="burden-input"
            className="block text-center text-base sm:text-lg md:text-xl text-text-primary mb-3 sm:mb-4 font-medium"
          >
            {t("welcomePrompt")}
          </label>

          <div className="relative">
            <textarea
              id="burden-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (input.trim() && !isLoading) {
                    onSubmit(input.trim());
                  }
                }
              }}
              placeholder={t("welcomePlaceholder")}
              className="w-full h-20 sm:h-28 md:h-36 p-3 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-accent-rose/30 text-text-primary placeholder:text-text-secondary/50 resize-none text-base sm:text-lg leading-relaxed focus:border-accent-coral transition-colors"
              disabled={isLoading}
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="btn-primary mt-3 w-full disabled:opacity-50 disabled:cursor-not-allowed tap-target"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t("welcomeButtonLoading")}
              </span>
            ) : (
              t("welcomeButton")
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
