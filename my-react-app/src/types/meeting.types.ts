export interface Participant {
  id: string;
  name: string;
  role: "host" | "participant" | "guest";
  avatar?: string;
  isMuted: boolean;
  isVideoOn: boolean;
  isSpeaking: boolean;
  connectionQuality: "good" | "moderate" | "poor";
  joinedAt: number;
}

export interface TimelineEvent {
  id: string;
  type: "decision" | "task" | "summary" | "join" | "leave";
  label: string;
  timestamp: number;
}

export interface AnalyticsMetrics {
  talkTimeRatio: Record<string, number>;
  engagementScore: number;
  dominanceRatio: number;
}

export interface MeetingSession {
  id: string;
  startedAt: number;
  endedAt?: number;
  status: "idle" | "live" | "ended";
  analytics?: AnalyticsMetrics;
}
