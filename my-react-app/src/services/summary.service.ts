import type { ActionItem, SentimentData } from '../types/ai.types';

export class SummaryService {
  constructor() {}

  public async generateSummary(_transcript: string): Promise<string> {
    console.log('[SummaryService] Generating summary for transcript of length:', _transcript.length);
    return "Stub AI Summary";
  }

  public async extractActionItems(_transcript: string): Promise<ActionItem[]> {
    console.log('[SummaryService] Extracting action items...');
    return [];
  }

  public async inferSentiment(_transcriptChunk: string): Promise<SentimentData> {
    console.log('[SummaryService] Inferring sentiment...');
    return {
      overall: "neutral",
      confidence: 0.8,
      scores: { positive: 0.1, neutral: 0.8, negative: 0.1 }
    };
  }
}

export const summaryService = new SummaryService();
