// Internationalization support for Feed Your Hope

export type Language = "en" | "hu";

export const translations = {
  en: {
    // App
    appName: "Feed Your Hope",
    appTagline: "Find the right scripture for what you're carrying",
    welcomeScripture: "Draw close to God, and He will draw close to you.",

    // Welcome Screen
    welcomePrompt: "What's weighing on your heart?",
    welcomePlaceholder: "Share what's on your mind...",
    welcomeButton: "Begin",
    welcomeButtonLoading: "Finding your word...",
    recentTopics: "Recent topics",

    // Clarifying Screen
    clarifyingPlaceholder: "Share more...",
    clarifyingButton: "Continue",

    // Loading Screen
    loadingTitle: "Finding the word for your moment",
    loadingSubtitle: "Listening... reflecting... searching Scripture",

    // Validation Screen
    validationContinue: "Tap to continue",

    // Encouragement Screen
    encouragementContinue: "Tap to continue",

    // Lie Reveal Screen
    lieIntro:
      "Maybe I'm wrong. But based on what you shared, I wonder if this lie might be sitting in your heart:",
    lieClosing:
      "Just something to think about — don't let it stay there unchallenged.",
    lieContinue: "Tap to continue",

    // Affirmation Screen
    affirmationButton: "Done",
  },
  hu: {
    // App
    appName: "Táplád a Reményed",
    appTagline: "Találd meg az Igét ahhoz, amit most hordozol",
    welcomeScripture: "Közeledjetek Istenhez, és közeledni fog hozzátok.",

    // Welcome Screen
    welcomePrompt: "Mi nyomja a szívedet?",
    welcomePlaceholder: "Oszd meg, mi jár a fejedben...",
    welcomeButton: "Kezdés",
    welcomeButtonLoading: "Keresem az Igét...",
    recentTopics: "Korábbi témák",

    // Clarifying Screen
    clarifyingPlaceholder: "Mesélj még...",
    clarifyingButton: "Tovább",

    // Loading Screen
    loadingTitle: "Keresem az Igét a pillanatodhoz",
    loadingSubtitle: "Figyelek... elmélkedem... keresem a Szentírásban",

    // Validation Screen
    validationContinue: "Érintsd meg a folytatáshoz",

    // Encouragement Screen
    encouragementContinue: "Érintsd meg a folytatáshoz",

    // Lie Reveal Screen
    lieIntro:
      "Lehet, hogy tévedek. De amiket megosztottál alapján, azon gondolkodom, hogy talán ez a hazugság ül a szívedben:",
    lieClosing:
      "Csak egy gondolat — ne hagyd, hogy megkérdőjelezetlenül ott maradjon.",
    lieContinue: "Érintsd meg a folytatáshoz",

    // Affirmation Screen
    affirmationButton: "Kész",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

export function getTranslations(lang: Language) {
  return translations[lang] || translations.en;
}

export function detectLanguage(): Language {
  if (typeof window === "undefined") return "en";

  const browserLang = navigator.language || navigator.languages?.[0] || "en";

  // Check if Hungarian
  if (browserLang.toLowerCase().startsWith("hu")) {
    return "hu";
  }

  return "en";
}
