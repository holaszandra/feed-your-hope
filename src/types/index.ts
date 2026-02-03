// Types for the Feed Your Hope app

export interface Scripture {
  text: string;
  reference: string;
}

export interface ValidationSection {
  acknowledgment: string;
  scripture: Scripture;
  whoElseFeltThis: string;
  bridge: string;
}

export interface EncouragementSection {
  scripture: Scripture;
  application: string;
  purpose: string;
}

export interface ClaudeFirstResponse {
  needsClarification: boolean;
  clarifyingQuestion?: string;
  biblicalContext?: string; // e.g., "Even David felt that way..."
  // If needsClarification is false, include the full response
  validation?: ValidationSection;
  encouragement?: EncouragementSection;
  lie?: string;
  affirmation?: string;
  topicTags?: string[]; // Claude-generated specific topic tags (legacy, kept for backward compatibility)
  sessionSummary?: string; // Claude-generated session summary phrase (e.g., "Job rejection & losing confidence")
}

export interface ClaudeFullResponse {
  validation: ValidationSection;
  encouragement: EncouragementSection;
  lie?: string; // Optional - may be skipped if not enough context
  affirmation: string;
  topicTags?: string[]; // Claude-generated specific topic tags (legacy, kept for backward compatibility)
  sessionSummary?: string; // Claude-generated session summary phrase (e.g., "Job rejection & losing confidence")
}

export interface SessionData {
  userInput: string;
  clarifyingAnswer?: string;
  response?: ClaudeFullResponse;
  rating?: number;
}

export interface StoredLie {
  date: string;
  lie: string;
}

export interface FeedbackEntry {
  date: string;
  versesShown: string[];
  userContext: string;
  rating: number;
}

export interface AnalyticsEvent {
  event: string;
  timestamp: string;
  data?: Record<string, unknown>;
}

export interface SavedTopic {
  id: string;
  label: string; // Short label for the tag (e.g., "Work stress", "Family") - kept for backward compatibility
  context: string; // The original user input
  clarifyingAnswer?: string; // What they answered in clarifying
  keywords: string[]; // Extracted keywords for matching - kept for backward compatibility
  tags: string[]; // Claude-generated specific topic tags (e.g., ["singleness", "injustice", "feeling forgotten"])
  sessionSummary?: string; // Claude-generated session summary phrase (e.g., "Job rejection & losing confidence")
  createdAt: string;
  lastVisited: string;
  visitCount: number;
}

export interface SessionHistory {
  id: string;
  date: string;
  summary: string; // e.g., "Job rejection & losing confidence"
  context: string; // The original user input for context when returning
  clarifyingAnswer?: string;
}

export interface LocalStorageData {
  seenVerses: string[];
  liesIdentified: StoredLie[];
  feedbackHistory: FeedbackEntry[];
  analytics: AnalyticsEvent[];
  savedTopics: SavedTopic[];
  sessionHistory: SessionHistory[]; // New: stores session summaries for display
}

export type Screen =
  | "welcome"
  | "clarifying"
  | "loading"
  | "validation"
  | "encouragement"
  | "lie"
  | "affirmation";
