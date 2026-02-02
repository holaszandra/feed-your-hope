"use client";

import { useState } from "react";
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
    <div className="relative h-full welcome-gradient overflow-hidden flex flex-col">
      {/* Floating gradient overlay - living light effect */}
      <div className="gradient-overlay" />

      {/* Header/Logo */}
      <header className="relative z-10 pt-6 sm:pt-10 md:pt-14 text-center px-6 shrink-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide text-text-primary">
          {t("appName")}
        </h1>
      </header>

      {/* Middle Section - Glowing Scripture Text (fixed height) */}
      <div className="relative z-10 h-[30vh] sm:h-[35vh] flex items-center justify-center px-6 sm:px-10">
        <p className="glow-text font-semibold text-lg sm:text-2xl md:text-3xl lg:text-4xl text-center leading-relaxed max-w-2xl">
          {t("appTagline")}
        </p>
      </div>

      {/* Bottom Input Section - takes remaining space */}
      <div className="relative z-10 flex-1 px-4 sm:px-6 pb-4 sm:pb-6">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <label
            htmlFor="burden-input"
            className="block text-center text-base sm:text-lg md:text-xl text-text-primary mb-2 sm:mb-3 font-medium"
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
              className="w-full h-16 sm:h-24 md:h-32 p-3 sm:p-4 rounded-2xl glass-input text-text-primary placeholder:text-text-secondary/60 resize-none text-base sm:text-lg leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent-coral/50 transition-all"
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
