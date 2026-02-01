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
}

export interface ClaudeFullResponse {
  validation: ValidationSection;
  encouragement: EncouragementSection;
  lie?: string; // Optional - may be skipped if not enough context
  affirmation: string;
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

export interface LocalStorageData {
  seenVerses: string[];
  liesIdentified: StoredLie[];
  feedbackHistory: FeedbackEntry[];
  analytics: AnalyticsEvent[];
}

export type Screen =
  | "welcome"
  | "clarifying"
  | "loading"
  | "validation"
  | "encouragement"
  | "lie"
  | "affirmation";
