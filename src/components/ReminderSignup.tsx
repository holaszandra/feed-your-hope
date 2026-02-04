"use client";

import { useState } from "react";
import type { Scripture } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface ReminderSignupProps {
  encouragementVerse: Scripture;
  userTopic: string;
  clarifyingAnswer?: string;
}

export function ReminderSignup({
  encouragementVerse,
  userTopic,
  clarifyingAnswer,
}: ReminderSignupProps) {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/reminder/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          userTopic,
          clarifyingAnswer,
          encouragementVerseText: encouragementVerse.text,
          encouragementVerseReference: encouragementVerse.reference,
          language,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to subscribe");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 text-text-forest">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-medium">
            {language === "hu"
              ? "Holnap reggel találkozunk!"
              : "See you tomorrow morning!"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* Verse Preview Card */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-white/40 shadow-sm">
        <p className="text-sm text-text-secondary mb-1">
          {language === "hu" ? "A mai igéd:" : "Today's verse for you:"}
        </p>
        <p className="text-text-forest font-medium text-sm leading-relaxed">
          &ldquo;{encouragementVerse.text.length > 100
            ? encouragementVerse.text.slice(0, 100) + "..."
            : encouragementVerse.text}&rdquo;
        </p>
        <p className="text-xs text-accent-gold mt-1">
          — {encouragementVerse.reference}
        </p>
      </div>

      {/* Signup Form */}
      <div className="text-center">
        <p className="text-sm text-text-secondary mb-3">
          {language === "hu"
            ? "Szeretnél holnap reggel egy igét?"
            : "Want a verse tomorrow morning?"}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={language === "hu" ? "Email címed" : "Your email"}
            className="w-full px-4 py-3 rounded-xl bg-white/80 border border-white/50
                       text-text-primary placeholder:text-text-secondary/50
                       focus:outline-none focus:ring-2 focus:ring-accent-coral/50
                       text-sm"
            disabled={status === "loading"}
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full px-4 py-3 rounded-xl bg-accent-coral text-white font-medium
                       hover:bg-accent-coral/90 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed
                       text-sm"
          >
            {status === "loading"
              ? (language === "hu" ? "Küldés..." : "Sending...")
              : (language === "hu" ? "Emlékeztess holnap" : "Send me a reminder")}
          </button>
        </form>

        {status === "error" && errorMessage && (
          <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
        )}

        <p className="text-xs text-text-secondary/60 mt-3">
          {language === "hu"
            ? "Csak egyszer kapsz emailt, nem iratkozol fel semmire."
            : "One email only. No subscription, no spam."}
        </p>
      </div>
    </div>
  );
}
