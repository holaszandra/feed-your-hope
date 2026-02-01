import type {
  LocalStorageData,
  StoredLie,
  FeedbackEntry,
  AnalyticsEvent,
} from "@/types";

const STORAGE_KEY = "anchor_data";

const defaultData: LocalStorageData = {
  seenVerses: [],
  liesIdentified: [],
  feedbackHistory: [],
  analytics: [],
};

export function getStorageData(): LocalStorageData {
  if (typeof window === "undefined") return defaultData;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultData;
    return JSON.parse(stored) as LocalStorageData;
  } catch {
    return defaultData;
  }
}

export function saveStorageData(data: LocalStorageData): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
}

export function getSeenVerses(): string[] {
  return getStorageData().seenVerses;
}

export function addSeenVerses(verses: string[]): void {
  const data = getStorageData();
  const newVerses = verses.filter((v) => !data.seenVerses.includes(v));
  data.seenVerses = [...data.seenVerses, ...newVerses];
  saveStorageData(data);
}

export function getLiesIdentified(): StoredLie[] {
  return getStorageData().liesIdentified;
}

export function addLieIdentified(lie: string): void {
  const data = getStorageData();
  data.liesIdentified.push({
    date: new Date().toISOString(),
    lie,
  });
  saveStorageData(data);
}

export function addFeedback(entry: Omit<FeedbackEntry, "date">): void {
  const data = getStorageData();
  data.feedbackHistory.push({
    ...entry,
    date: new Date().toISOString(),
  });
  saveStorageData(data);
}

export function trackEvent(
  event: string,
  eventData?: Record<string, unknown>
): void {
  const data = getStorageData();
  const analyticsEvent: AnalyticsEvent = {
    event,
    timestamp: new Date().toISOString(),
  };
  if (eventData) {
    analyticsEvent.data = eventData;
  }
  data.analytics.push(analyticsEvent);
  saveStorageData(data);
}

// Analytics event names
export const EVENTS = {
  SESSION_STARTED: "session_started",
  INPUT_SUBMITTED: "input_submitted",
  CLARIFYING_ANSWERED: "clarifying_answered",
  SCRIPTURE_VIEWED: "scripture_viewed",
  REFLECTION_VIEWED: "reflection_viewed",
  LIE_VIEWED: "lie_viewed",
  AFFIRMATION_VIEWED: "affirmation_viewed",
  SESSION_COMPLETED: "session_completed",
  RETURN_VISIT: "return_visit",
  SCRIPTURE_RATED: "scripture_rated",
  RETRY_REQUESTED: "retry_requested",
} as const;
