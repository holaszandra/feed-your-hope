import type {
  LocalStorageData,
  StoredLie,
  FeedbackEntry,
  AnalyticsEvent,
  SavedTopic,
} from "@/types";

const STORAGE_KEY = "anchor_data";

const defaultData: LocalStorageData = {
  seenVerses: [],
  liesIdentified: [],
  feedbackHistory: [],
  analytics: [],
  savedTopics: [],
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

// ========================================
// SAVED TOPICS (Recent Topics Feature)
// ========================================

// Common words to exclude from keyword extraction
const STOP_WORDS = new Set([
  "i", "me", "my", "myself", "we", "our", "ours", "you", "your", "yours",
  "he", "him", "his", "she", "her", "hers", "it", "its", "they", "them",
  "what", "which", "who", "whom", "this", "that", "these", "those",
  "am", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "having", "do", "does", "did", "doing",
  "a", "an", "the", "and", "but", "if", "or", "because", "as", "until",
  "while", "of", "at", "by", "for", "with", "about", "against", "between",
  "into", "through", "during", "before", "after", "above", "below", "to",
  "from", "up", "down", "in", "out", "on", "off", "over", "under", "again",
  "further", "then", "once", "here", "there", "when", "where", "why", "how",
  "all", "each", "few", "more", "most", "other", "some", "such", "no", "nor",
  "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can",
  "will", "just", "don", "should", "now", "feeling", "feel", "really", "lot",
  "like", "know", "think", "want", "need", "going", "get", "make", "time",
  "been", "would", "could", "also", "even", "much", "many", "way", "thing",
]);

/**
 * Extract keywords from user input for topic labeling
 */
function extractKeywords(text: string): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // Remove punctuation
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));

  // Count word frequency
  const wordCount: Record<string, number> = {};
  words.forEach((word) => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  // Sort by frequency and take top 5
  return Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);
}

/**
 * Generate a short label from keywords
 */
function generateLabel(keywords: string[], context: string): string {
  // Common topic patterns
  const patterns: Record<string, string[]> = {
    "Work stress": ["work", "job", "boss", "career", "office", "coworker", "deadline"],
    "Family": ["family", "parent", "child", "mom", "dad", "sibling", "brother", "sister"],
    "Relationship": ["relationship", "partner", "spouse", "husband", "wife", "dating", "marriage"],
    "Anxiety": ["anxiety", "anxious", "worried", "worry", "nervous", "panic", "fear"],
    "Health": ["health", "sick", "illness", "doctor", "hospital", "pain", "body"],
    "Faith": ["faith", "god", "pray", "prayer", "church", "believe", "doubt", "spiritual"],
    "Finances": ["money", "financial", "bills", "debt", "job", "income", "afford"],
    "Loneliness": ["lonely", "alone", "isolated", "friends", "connection", "social"],
    "Purpose": ["purpose", "meaning", "direction", "lost", "calling", "future"],
    "Grief": ["grief", "loss", "death", "died", "mourning", "miss", "gone"],
  };

  // Check for pattern matches
  const lowerContext = context.toLowerCase();
  for (const [label, patternWords] of Object.entries(patterns)) {
    if (patternWords.some((word) => lowerContext.includes(word))) {
      return label;
    }
  }

  // Fall back to first keyword capitalized
  if (keywords.length > 0) {
    return keywords[0].charAt(0).toUpperCase() + keywords[0].slice(1);
  }

  return "Personal";
}

/**
 * Save a topic after user completes clarifying question
 */
export function saveTopic(userInput: string, clarifyingAnswer?: string): SavedTopic {
  const data = getStorageData();
  const keywords = extractKeywords(userInput + " " + (clarifyingAnswer || ""));
  const label = generateLabel(keywords, userInput);
  const now = new Date().toISOString();

  // Check if similar topic exists (based on keywords overlap)
  const existingTopic = data.savedTopics.find((topic) => {
    const overlap = topic.keywords.filter((k) => keywords.includes(k));
    return overlap.length >= 2; // At least 2 keywords match
  });

  if (existingTopic) {
    // Update existing topic
    existingTopic.lastVisited = now;
    existingTopic.visitCount += 1;
    if (clarifyingAnswer) {
      existingTopic.clarifyingAnswer = clarifyingAnswer;
    }
    saveStorageData(data);
    return existingTopic;
  }

  // Create new topic
  const newTopic: SavedTopic = {
    id: `topic_${Date.now()}`,
    label,
    context: userInput,
    clarifyingAnswer,
    keywords,
    createdAt: now,
    lastVisited: now,
    visitCount: 1,
  };

  // Keep only the 5 most recent topics
  data.savedTopics = [newTopic, ...data.savedTopics].slice(0, 5);
  saveStorageData(data);

  return newTopic;
}

/**
 * Get all saved topics
 */
export function getSavedTopics(): SavedTopic[] {
  return getStorageData().savedTopics;
}

/**
 * Update topic's last visited time
 */
export function updateTopicVisit(topicId: string): void {
  const data = getStorageData();
  const topic = data.savedTopics.find((t) => t.id === topicId);
  if (topic) {
    topic.lastVisited = new Date().toISOString();
    topic.visitCount += 1;
    saveStorageData(data);
  }
}

/**
 * Delete a saved topic
 */
export function deleteTopic(topicId: string): void {
  const data = getStorageData();
  data.savedTopics = data.savedTopics.filter((t) => t.id !== topicId);
  saveStorageData(data);
}

/**
 * Clear all saved topics
 */
export function clearAllTopics(): void {
  const data = getStorageData();
  data.savedTopics = [];
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
  TOPIC_SELECTED: "topic_selected",
  TOPIC_SAVED: "topic_saved",
} as const;
