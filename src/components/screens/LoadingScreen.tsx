"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LoadingScreen() {
  const { t } = useLanguage();

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 bg-bg-base relative overflow-hidden">
      {/* Subtle animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0 animate-gradient-shift"
          style={{
            background: "radial-gradient(ellipse at 30% 20%, var(--accent-sage) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, var(--accent-rose) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, var(--bg-base) 0%, var(--bg-base) 100%)",
            backgroundSize: "200% 200%",
          }}
        />
      </div>

      <div className="text-center relative z-10">
        {/* Animated dots/cross */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-16 h-16">
            {/* Simple cross shape with gentle pulse */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1 h-12 bg-gradient-to-b from-accent-coral to-accent-gold rounded-full gentle-pulse" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-1 bg-gradient-to-r from-accent-coral to-accent-gold rounded-full gentle-pulse" style={{ animationDelay: "0.5s" }} />
            </div>
          </div>
        </div>

        <p className="text-xl sm:text-2xl text-text-primary font-medium gentle-pulse">
          {t("loadingTitle")}
        </p>

        <p className="mt-4 text-text-secondary/70 text-sm sm:text-base">
          {t("loadingSubtitle")}
        </p>
      </div>
    </div>
  );
}
