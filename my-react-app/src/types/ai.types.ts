export interface TranscriptChunk {
  id: string;
  speakerId: string;
  text: string;
  timestamp: number;
  confidence: number;
}

export interface ActionItem {
  id: string;
  assignee?: string;
  task: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  dueDate?: string;
}

export interface SentimentData {
  overall: "positive" | "neutral" | "negative";
  confidence: number;
  scores: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export interface ConfidenceMetrics {
  summary: number;
  decision: number;
  sentiment: number;
  speaker: number;
}
