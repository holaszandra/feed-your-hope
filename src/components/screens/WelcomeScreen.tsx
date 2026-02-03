"use client";

import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getRecentSessions } from "@/lib/storage";
import type { SessionHistory } from "@/types";

interface WelcomeScreenProps {
  onSubmit: (input: string) => void;
  onSessionSelect: (session: SessionHistory) => void;
  isLoading: boolean;
  refreshKey?: number; // Used to trigger refresh when returning to this screen
}

export function WelcomeScreen({ onSubmit, onSessionSelect, isLoading, refreshKey = 0 }: WelcomeScreenProps) {
  const [input, setInput] = useState("");
  const [recentSessions, setRecentSessions] = useState<SessionHistory[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { t } = useLanguage();

  // Load recent sessions - memoized function (only last 3 for display)
  const loadSessions = useCallback(() => {
    const sessions = getRecentSessions();
    console.log("[WelcomeScreen] Loaded sessions:", sessions);
    setRecentSessions(sessions);
  }, []);

  // Load sessions on mount, when refreshKey changes, and on window focus
  useEffect(() => {
    loadSessions();

    // Also reload when window gains focus (user returns to tab)
    window.addEventListener('focus', loadSessions);
    return () => window.removeEventListener('focus', loadSessions);
  }, [loadSessions, refreshKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSubmit(input.trim());
    }
  };

  const handleSessionClick = (session: SessionHistory) => {
    setIsDrawerOpen(false);
    onSessionSelect(session);
  };

  const hasSessions = recentSessions.length > 0;

  return (
    <div className="relative h-full welcome-gradient overflow-hidden flex flex-col">
      {/* Floating gradient overlay - living light effect */}
      <div className="gradient-overlay" />

      {/* Header/Logo with tagline */}
      <header className="relative z-10 pt-6 sm:pt-10 md:pt-14 text-center px-6 shrink-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide text-text-primary">
          {t("appName")}
        </h1>
        <p className="text-sm sm:text-base text-text-primary/70 mt-2">
          {t("appTagline")}
        </p>
      </header>

      {/* Middle Section - Glowing Scripture Text (fixed height) */}
      <div className="relative z-10 flex items-center justify-center px-6 sm:px-10 h-[30vh] sm:h-[35vh]">
        <p className="glow-text font-semibold text-lg sm:text-2xl md:text-3xl lg:text-4xl text-center leading-relaxed max-w-2xl">
          {t("welcomeScripture")}
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

          {/* Recent Sessions Toggle - only show if user has sessions */}
          {hasSessions && (
            <button
              type="button"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="mb-2 mx-auto flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-sm text-sm text-text-primary hover:bg-white/40 transition-all"
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

          {/* Sessions Drawer - shows session summary phrases */}
          {hasSessions && (
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isDrawerOpen ? 'max-h-32 opacity-100 mb-3' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="flex flex-wrap justify-center gap-2">
                {recentSessions.map((session) => (
                  <button
                    type="button"
                    key={session.id}
                    onClick={() => handleSessionClick(session)}
                    className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm text-text-primary border border-white/50 hover:bg-white/90 hover:border-accent-coral/30 transition-all shadow-sm"
                    title={session.context}
                  >
                    {session.summary}
                  </button>
                ))}
              </div>
            </div>
          )}

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
