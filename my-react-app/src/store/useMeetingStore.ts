import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { Participant, TimelineEvent } from '../types/meeting.types';
import type { ActionItem, TranscriptChunk } from '../types/ai.types';

export type TranscriptLine = TranscriptChunk & {
  speakerName: string;
};

interface MeetingState {
  // Participants
  participants: Participant[];
  activeSpeakerId: string | null;

  // Media & Controls
  micOn: boolean;
  camOn: boolean;
  isRecording: boolean;
  connectionStatus: 'connected' | 'reconnecting' | 'failed';
  aiStatus: 'online' | 'degraded' | 'offline';

  // AI Intelligence
  transcript: TranscriptLine[];
  aiSummary: string;
  actionItems: ActionItem[];
  timeline: TimelineEvent[];
  sentiment: 'positive' | 'neutral' | 'negative' | 'analyzing';
  
  // UI Panels
  isAIPanelOpen: boolean;
  sidebarTab: 'participants' | 'chat' | 'notes' | 'files';
  
  // Actions
  toggleMic: () => void;
  toggleCam: () => void;
  toggleRecording: () => void;
  toggleAIPanel: () => void;
  setSidebarTab: (tab: 'participants' | 'chat' | 'notes' | 'files') => void;
  
  // AI Pipeline Mock Actions
  addTranscriptLine: (speakerId: string, text: string) => void;
  updateSummary: (summary: string) => void;
  addActionItem: (task: string, assignee: string) => void;
  toggleActionItem: (id: string) => void;
  addTimelineEvent: (event: string, type: TimelineEvent['type']) => void;
  setSentiment: (sentiment: 'positive' | 'neutral' | 'negative' | 'analyzing') => void;
  setActiveSpeaker: (id: string | null) => void;
}

const mockParticipants: Participant[] = [
  { id: '1', name: 'Dr. Sarah Jameson', role: 'host', isSpeaking: false, isMuted: false, isVideoOn: true, connectionQuality: 'good', joinedAt: Date.now(), avatar: 'SJ' },
  { id: '2', name: 'Michael Chen', role: 'participant', isSpeaking: false, isMuted: false, isVideoOn: true, connectionQuality: 'good', joinedAt: Date.now(), avatar: 'MC' },
  { id: '3', name: 'Elena Rodriguez', role: 'guest', isSpeaking: false, isMuted: true, isVideoOn: false, connectionQuality: 'moderate', joinedAt: Date.now(), avatar: 'ER' },
  { id: '4', name: 'Alex Thompson', role: 'participant', isSpeaking: false, isMuted: false, isVideoOn: false, connectionQuality: 'poor', joinedAt: Date.now(), avatar: 'AT' },
];

export const useMeetingStore = create<MeetingState>()(
  persist(
    (set, get) => ({
      participants: mockParticipants,
      activeSpeakerId: null,

      micOn: true,
      camOn: true,
      isRecording: false,
      isScreenSharing: false,
      
      connectionStatus: 'connected',
      aiStatus: 'online',

      transcript: [],
      aiSummary: 'Waiting for stream to begin...',
      actionItems: [],
      timeline: [
        { id: uuidv4(), timestamp: Date.now(), label: 'Meeting Started', type: 'system' as any }
      ],
      sentiment: 'neutral',

      isAIPanelOpen: false,
      sidebarTab: 'participants',

      toggleMic: () => set((state) => ({ micOn: !state.micOn })),
      toggleCam: () => set((state) => ({ camOn: !state.camOn })),
      toggleRecording: () => set((state) => ({ isRecording: !state.isRecording })),
      toggleAIPanel: () => set((state) => ({ isAIPanelOpen: !state.isAIPanelOpen })),
      setSidebarTab: (tab) => set({ sidebarTab: tab }),

      addTranscriptLine: (speakerId, text) => {
        const speaker = get().participants.find(p => p.id === speakerId);
        
        const newLine: TranscriptLine = {
          id: uuidv4(),
          speakerId,
          speakerName: speaker?.name || 'Unknown',
          text,
          timestamp: Date.now(),
          confidence: 0.95
        };

        set((state) => ({
          transcript: [...state.transcript, newLine],
          participants: state.participants.map(p => 
            p.id === speakerId ? { ...p, isSpeaking: true } : { ...p, isSpeaking: false }
          ),
          activeSpeakerId: speakerId,
        }));

        setTimeout(() => {
            if (get().activeSpeakerId === speakerId) {
                set((state) => ({
                    participants: state.participants.map(p => ({ ...p, isSpeaking: false })),
                    activeSpeakerId: null,
                }));
            }
        }, 3000);
      },

      updateSummary: (summary) => set({ aiSummary: summary }),
      
      addActionItem: (task, assignee) => {
        const newItem: ActionItem = { id: uuidv4(), task, assignee, completed: false, priority: 'medium' };
        set((state) => ({ actionItems: [...state.actionItems, newItem] }));
      },

      toggleActionItem: (id) => {
        set((state) => ({
          actionItems: state.actionItems.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
          ),
        }));
      },

      addTimelineEvent: (event, type) => {
        const newEvent: TimelineEvent = { id: uuidv4(), timestamp: Date.now(), label: event, type: type as any };
        set((state) => ({ timeline: [...state.timeline, newEvent] }));
      },

      setSentiment: (sentiment) => set({ sentiment }),
      
      setActiveSpeaker: (id) => set((state) => ({
        activeSpeakerId: id,
        participants: state.participants.map(p => 
          p.id === id ? { ...p, isSpeaking: true } : { ...p, isSpeaking: false }
        )
      })),

    }),
    {
      name: 'intellmeet-session-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ 
        transcript: state.transcript, 
        aiSummary: state.aiSummary, 
        actionItems: state.actionItems, 
        timeline: state.timeline,
        isAIPanelOpen: state.isAIPanelOpen
      }),
    }
  )
);
