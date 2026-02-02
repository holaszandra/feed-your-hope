"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getSavedTopics } from "@/lib/storage";
import type { SavedTopic } from "@/types";

interface WelcomeScreenProps {
  onSubmit: (input: string) => void;
  onTopicSelect: (topic: SavedTopic) => void;
  isLoading: boolean;
}

export function WelcomeScreen({ onSubmit, onTopicSelect, isLoading }: WelcomeScreenProps) {
  const [input, setInput] = useState("");
  const [savedTopics, setSavedTopics] = useState<SavedTopic[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { t } = useLanguage();

  // Load saved topics on mount and whenever component re-renders
  // Using a ref to track if this is the first render or a return visit
  useEffect(() => {
    const loadTopics = () => {
      const topics = getSavedTopics();
      setSavedTopics(topics);
    };

    loadTopics();

    // Also reload when window gains focus (user returns to tab)
    window.addEventListener('focus', loadTopics);
    return () => window.removeEventListener('focus', loadTopics);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSubmit(input.trim());
    }
  };

  const handleTopicClick = (topic: SavedTopic) => {
    setIsDrawerOpen(false);
    onTopicSelect(topic);
  };

  const hasTopics = savedTopics.length > 0;

  return (
    <div className="relative h-full welcome-gradient overflow-hidden flex flex-col">
      {/* Floating gradient overlay - living light effect */}
      <div className="gradient-overlay" />

      {/* Header/Logo */}
      <header className="relative z-10 pt-6 sm:pt-10 md:pt-14 text-center px-6 shrink-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide text-text-primary">
          {t("appName")}
        </h1>

        {/* Recent Topics Toggle - only show if user has topics */}
        {hasTopics && (
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-sm text-sm text-text-primary hover:bg-white/40 transition-all"
          >
            <svg
              className={`w-4 h-4 transition-transform ${isDrawerOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {t("recentTopics") || "Recent topics"}
          </button>
        )}
      </header>

      {/* Topics Drawer */}
      {hasTopics && (
        <div
          className={`relative z-10 overflow-hidden transition-all duration-300 ease-in-out ${
            isDrawerOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 sm:px-6 py-3">
            <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
              {savedTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleTopicClick(topic)}
                  className="topic-tag"
                  title={topic.context}
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Middle Section - Glowing Scripture Text (fixed height) */}
      <div className={`relative z-10 flex items-center justify-center px-6 sm:px-10 transition-all duration-300 ${
        isDrawerOpen ? 'h-[20vh] sm:h-[25vh]' : 'h-[30vh] sm:h-[35vh]'
      }`}>
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
