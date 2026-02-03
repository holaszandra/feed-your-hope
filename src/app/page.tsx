"use client";

import { useState, useEffect, useCallback } from "react";
import type { Screen, ClaudeFirstResponse, ClaudeFullResponse } from "@/types";
import {
  WelcomeScreen,
  ClarifyingScreen,
  LoadingScreen,
  ValidationScreen,
  EncouragementScreen,
  LieRevealScreen,
  AffirmationScreen,
} from "@/components/screens";
import { ScreenTransition } from "@/components/ScreenTransition";
import {
  getSeenVerses,
  getLiesIdentified,
  addSeenVerses,
  addLieIdentified,
  trackEvent,
  saveTopic,
  updateTopicVisit,
  EVENTS,
} from "@/lib/storage";
import { useLanguage } from "@/context/LanguageContext";
import type { SavedTopic } from "@/types";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [clarifyingData, setClarifyingData] = useState<{
    question: string;
    biblicalContext: string;
  } | null>(null);
  const [clarifyingAnswer, setClarifyingAnswer] = useState("");
  const [response, setResponse] = useState<ClaudeFullResponse | null>(null);
  const [wentThroughClarifying, setWentThroughClarifying] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<SavedTopic | null>(null);
  const [welcomeRefreshKey, setWelcomeRefreshKey] = useState(0);
  const { language } = useLanguage();

  // Track session start on mount
  useEffect(() => {
    trackEvent(EVENTS.SESSION_STARTED);
  }, []);

  // API call to Claude
  const callClaude = useCallback(async (
    input: string,
    answer?: string,
    isRetry = false,
    previousVerses: string[] = [],
    returningTopic?: SavedTopic | null
  ) => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/anchor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInput: input,
          clarifyingAnswer: answer,
          seenVerses: getSeenVerses(),
          liesIdentified: getLiesIdentified(),
          isRetry,
          previousVerses,
          language,
          returningTopic: returningTopic ? {
            context: returningTopic.context,
            label: returningTopic.label,
            previousAnswer: returningTopic.clarifyingAnswer,
          } : null,
        }),
      });

      if (!res.ok) {
        throw new Error("API request failed");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error calling Claude:", error);
      // Return a fallback response with general verses (not situation-specific)
      return {
        needsClarification: false,
        validation: {
          acknowledgment: "Whatever you're facing right now, it's real and it matters. God sees you in this moment.",
          scripture: {
            text: "Cast all your anxiety on him because he cares for you.",
            reference: "1 Peter 5:7",
          },
          whoElseFeltThis: "Even David poured out his heart to God when he felt overwhelmed.",
          bridge: "But here's what's different for you today...",
        },
        encouragement: {
          scripture: {
            text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
            reference: "Philippians 4:6-7",
          },
          application: "You don't have to carry this alone. God invites you to bring every worry to Him.",
          purpose: "You're called to walk in His peace, not to solve everything on your own.",
        },
        lie: null,
        affirmation:
          "Be sure of this — God is with you. He will guide your steps and give you peace.",
      };
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  // Handle initial input submission
  const handleInputSubmit = async (input: string) => {
    setUserInput(input);
    trackEvent(EVENTS.INPUT_SUBMITTED);
    setCurrentScreen("loading");

    const data: ClaudeFirstResponse = await callClaude(input);

    if (data.needsClarification) {
      setClarifyingData({
        question: data.clarifyingQuestion || "What's making this heavy right now?",
        biblicalContext:
          data.biblicalContext ||
          "You're not alone in feeling this way.",
      });
      setCurrentScreen("clarifying");
    } else {
      // Direct response without clarification
      setResponse(data as ClaudeFullResponse);

      // Save topic even without clarifying question, using Claude's tags
      saveTopic(input, undefined, data.topicTags);
      trackEvent(EVENTS.TOPIC_SAVED);

      // Save verses to localStorage
      if (data.validation?.scripture) {
        addSeenVerses([data.validation.scripture.reference]);
      }
      if (data.encouragement?.scripture) {
        addSeenVerses([data.encouragement.scripture.reference]);
      }

      setCurrentScreen("validation");
      trackEvent(EVENTS.SCRIPTURE_VIEWED);
    }
  };

  // Handle clarifying answer submission
  const handleClarifyingSubmit = async (answer: string) => {
    setClarifyingAnswer(answer);
    setWentThroughClarifying(true);
    trackEvent(EVENTS.CLARIFYING_ANSWERED);
    setCurrentScreen("loading");

    const data: ClaudeFullResponse = await callClaude(userInput, answer);
    setResponse(data);

    // Save topic after clarifying answer, using Claude's tags
    saveTopic(userInput, answer, data.topicTags);
    trackEvent(EVENTS.TOPIC_SAVED);

    // Save verses to localStorage
    if (data.validation?.scripture) {
      addSeenVerses([data.validation.scripture.reference]);
    }
    if (data.encouragement?.scripture) {
      addSeenVerses([data.encouragement.scripture.reference]);
    }

    setCurrentScreen("validation");
    trackEvent(EVENTS.SCRIPTURE_VIEWED);
  };

  // Handle topic selection from saved topics
  const handleTopicSelect = async (topic: SavedTopic) => {
    setSelectedTopic(topic);
    setUserInput(topic.context);
    updateTopicVisit(topic.id);
    trackEvent(EVENTS.TOPIC_SELECTED, { topicId: topic.id, label: topic.label });
    setCurrentScreen("loading");

    // Call Claude with returning user context
    const data: ClaudeFirstResponse = await callClaude(topic.context, undefined, false, [], topic);

    if (data.needsClarification) {
      setClarifyingData({
        question: data.clarifyingQuestion || "What's changed since last time?",
        biblicalContext: data.biblicalContext || "Welcome back. Let's continue where we left off.",
      });
      setCurrentScreen("clarifying");
    } else {
      setResponse(data as ClaudeFullResponse);

      if (data.validation?.scripture) {
        addSeenVerses([data.validation.scripture.reference]);
      }
      if (data.encouragement?.scripture) {
        addSeenVerses([data.encouragement.scripture.reference]);
      }

      setCurrentScreen("validation");
      trackEvent(EVENTS.SCRIPTURE_VIEWED);
    }
  };

  // Navigation handlers
  const goToEncouragement = () => {
    setCurrentScreen("encouragement");
    trackEvent(EVENTS.REFLECTION_VIEWED);
  };

  const goToLieOrAffirmation = () => {
    if (response?.lie) {
      setCurrentScreen("lie");
      trackEvent(EVENTS.LIE_VIEWED);

      // Save lie to localStorage
      addLieIdentified(response.lie);
    } else {
      setCurrentScreen("affirmation");
      trackEvent(EVENTS.AFFIRMATION_VIEWED);
    }
  };

  const goToAffirmation = () => {
    setCurrentScreen("affirmation");
    trackEvent(EVENTS.AFFIRMATION_VIEWED);
  };

  // Back navigation handlers
  const goBackFromClarifying = () => {
    setCurrentScreen("welcome");
  };

  const goBackFromValidation = () => {
    if (wentThroughClarifying) {
      setCurrentScreen("clarifying");
    } else {
      setCurrentScreen("welcome");
    }
  };

  const goBackFromEncouragement = () => {
    setCurrentScreen("validation");
  };

  const goBackFromLie = () => {
    setCurrentScreen("encouragement");
  };

  const goBackFromAffirmation = () => {
    if (response?.lie) {
      setCurrentScreen("lie");
    } else {
      setCurrentScreen("encouragement");
    }
  };

  const handleDone = () => {
    trackEvent(EVENTS.SESSION_COMPLETED);

    // Reset state for new session
    setCurrentScreen("welcome");
    setUserInput("");
    setClarifyingData(null);
    setClarifyingAnswer("");
    setResponse(null);
    setWentThroughClarifying(false);
    setSelectedTopic(null);
    // Increment refresh key to trigger topic reload in WelcomeScreen
    setWelcomeRefreshKey((prev) => prev + 1);
  };

  // Render the appropriate screen content
  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return (
          <WelcomeScreen
            onSubmit={handleInputSubmit}
            onTopicSelect={handleTopicSelect}
            isLoading={isLoading}
            refreshKey={welcomeRefreshKey}
          />
        );
      case "clarifying":
        return clarifyingData ? (
          <ClarifyingScreen
            biblicalContext={clarifyingData.biblicalContext}
            question={clarifyingData.question}
            onSubmit={handleClarifyingSubmit}
            onBack={goBackFromClarifying}
            isLoading={isLoading}
          />
        ) : null;
      case "loading":
        return <LoadingScreen />;
      case "validation":
        return response?.validation ? (
          <ValidationScreen
            validation={response.validation}
            onNext={goToEncouragement}
            onBack={goBackFromValidation}
          />
        ) : null;
      case "encouragement":
        return response?.encouragement ? (
          <EncouragementScreen
            encouragement={response.encouragement}
            onNext={goToLieOrAffirmation}
            onBack={goBackFromEncouragement}
          />
        ) : null;
      case "lie":
        return response?.lie ? (
          <LieRevealScreen lie={response.lie} onNext={goToAffirmation} onBack={goBackFromLie} />
        ) : null;
      case "affirmation":
        return response?.affirmation ? (
          <AffirmationScreen
            affirmation={response.affirmation}
            onDone={handleDone}
            onBack={goBackFromAffirmation}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <main className="h-screen w-screen overflow-hidden font-sans">
      <div className="h-full w-full max-w-2xl mx-auto">
        <ScreenTransition screenKey={currentScreen}>
          {renderScreen()}
        </ScreenTransition>
      </div>
    </main>
  );
}
