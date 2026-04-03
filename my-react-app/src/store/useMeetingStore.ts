import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { Participant, TimelineEvent } from '../types/meeting.types';
import type { ActionItem, TranscriptChunk } from '../types/ai.types';

export type TranscriptLine = TranscriptChunk & {
  speakerName: string;
};

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
  reactions: string[];
}

export interface MeetingFile {
  id: string;
  name: string;
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: number;
  type: string;
}

export interface AgendaItem {
  id: string;
  title: string;
  duration: number;
  completed: boolean;
}

export type LayoutMode = 'gallery' | 'speaker' | 'spotlight' | 'sidebar';
export type MediaPermissionState = 'prompt' | 'granted' | 'denied' | 'error' | 'loading';

interface MeetingState {
  // Participants
  participants: Participant[];
  activeSpeakerId: string | null;

  // Media & Controls
  micOn: boolean;
  camOn: boolean;
  isRecording: boolean;
  isScreenSharing: boolean;
  screenShareStream: MediaStream | null;
  localStream: MediaStream | null;
  mediaPermission: MediaPermissionState;
  connectionStatus: 'connected' | 'reconnecting' | 'failed';
  aiStatus: 'online' | 'degraded' | 'offline';

  // AI Intelligence
  transcript: TranscriptLine[];
  aiSummary: string;
  actionItems: ActionItem[];
  timeline: TimelineEvent[];
  sentiment: 'positive' | 'neutral' | 'negative' | 'analyzing';

  // Chat
  chatMessages: ChatMessage[];

  // Notes
  notes: string;

  // Files
  files: MeetingFile[];

  // Layout
  layout: LayoutMode;
  pinnedParticipantId: string | null;

  // Meeting meta
  meetingTitle: string;
  meetingStartTime: number;

  // Agenda
  agendaItems: AgendaItem[];
  currentAgendaIndex: number;

  // Hand raise
  handRaiseQueue: string[];

  // UI Panels
  isAIPanelOpen: boolean;
  isSidebarOpen: boolean;
  sidebarTab: 'participants' | 'chat' | 'notes' | 'files' | 'agenda';
  sidebarWidth: number;
  aiPanelWidth: number;

  // Actions
  toggleMic: () => void;
  toggleCam: () => void;
  toggleRecording: () => void;
  toggleAIPanel: () => void;
  toggleSidebar: () => void;
  setSidebarTab: (tab: 'participants' | 'chat' | 'notes' | 'files' | 'agenda') => void;
  setSidebarWidth: (width: number) => void;
  setAIPanelWidth: (width: number) => void;

  // Media
  requestMediaDevices: () => Promise<void>;
  stopLocalStream: () => void;
  setLocalStream: (stream: MediaStream | null) => void;
  setMediaPermission: (state: MediaPermissionState) => void;

  // AI Pipeline
  addTranscriptLine: (speakerId: string, text: string) => void;
  updateSummary: (summary: string) => void;
  addActionItem: (task: string, assignee: string) => void;
  toggleActionItem: (id: string) => void;
  addTimelineEvent: (event: string, type: TimelineEvent['type']) => void;
  setSentiment: (sentiment: 'positive' | 'neutral' | 'negative' | 'analyzing') => void;
  setActiveSpeaker: (id: string | null) => void;

  // Chat
  sendMessage: (text: string, senderId: string) => void;
  addReaction: (messageId: string, emoji: string) => void;

  // Files
  uploadFile: (file: File, uploadedBy: string) => void;

  // Layout
  setLayout: (layout: LayoutMode) => void;
  pinParticipant: (id: string | null) => void;

  // Hand raise
  raiseHand: (participantId: string) => void;
  lowerHand: (participantId: string) => void;

  // Notes
  setNotes: (notes: string) => void;

  // Host controls
  admitParticipant: (id: string) => void;
  removeParticipant: (id: string) => void;
  muteAll: () => void;
  makeHost: (id: string) => void;

  // Screen share
  setScreenShareStream: (stream: MediaStream | null) => void;

  // Agenda
  addAgendaItem: (title: string, duration: number) => void;
  removeAgendaItem: (id: string) => void;
  markAgendaDone: () => void;
  toggleAgendaItem: (id: string) => void;

  // Dev helpers
  addBotParticipant: () => void;
}

const HOST: Participant = {
  id: 'host-local',
  name: 'You',
  role: 'host',
  isSpeaking: false,
  isMuted: false,
  isVideoOn: true,
  connectionQuality: 'good',
  joinedAt: Date.now(),
  avatar: 'YO',
};

const BOT_NAMES = [
  { name: 'Sarah Jameson', avatar: 'SJ' },
  { name: 'Michael Chen', avatar: 'MC' },
  { name: 'Elena Rodriguez', avatar: 'ER' },
  { name: 'Alex Thompson', avatar: 'AT' },
  { name: 'Priya Patel', avatar: 'PP' },
  { name: 'James Wilson', avatar: 'JW' },
  { name: 'Aiko Tanaka', avatar: 'AK' },
  { name: 'David Kim', avatar: 'DK' },
];

const defaultAgenda: AgendaItem[] = [
  { id: uuidv4(), title: 'Team check-in & blockers', duration: 10, completed: false },
  { id: uuidv4(), title: 'Product roadmap Q2 review', duration: 20, completed: false },
  { id: uuidv4(), title: 'Sprint planning & assignments', duration: 15, completed: false },
  { id: uuidv4(), title: 'Open Q&A', duration: 10, completed: false },
];

export const useMeetingStore = create<MeetingState>()(
  persist(
    (set, get) => ({
      participants: [HOST],
      activeSpeakerId: null,

      micOn: true,
      camOn: true,
      isRecording: false,
      isScreenSharing: false,
      screenShareStream: null,
      localStream: null,
      mediaPermission: 'prompt',

      connectionStatus: 'connected',
      aiStatus: 'online',

      transcript: [],
      aiSummary: 'Waiting for meeting to begin…',
      actionItems: [],
      timeline: [
        { id: uuidv4(), timestamp: Date.now(), label: 'Meeting Started', type: 'summary' }
      ],
      sentiment: 'neutral',

      chatMessages: [],
      notes: '',
      files: [],
      layout: 'gallery',
      pinnedParticipantId: null,
      meetingTitle: 'Project Nexus Planning',
      meetingStartTime: Date.now(),
      agendaItems: defaultAgenda,
      currentAgendaIndex: 0,
      handRaiseQueue: [],

      isAIPanelOpen: false,
      isSidebarOpen: true,
      sidebarTab: 'participants',
      sidebarWidth: 340,
      aiPanelWidth: 380,

      // ─── Media device access ────────────────────────────────────────────
      requestMediaDevices: async () => {
        set({ mediaPermission: 'loading' });
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          set({
            localStream: stream,
            mediaPermission: 'granted',
            camOn: true,
            micOn: true,
            participants: get().participants.map(p =>
              p.id === 'host-local' ? { ...p, isVideoOn: true, isMuted: false } : p
            ),
          });
        } catch (err: any) {
          if (err.name === 'NotAllowedError') {
            set({ mediaPermission: 'denied', camOn: false, micOn: false });
          } else {
            set({ mediaPermission: 'error', camOn: false, micOn: false });
          }
          set({
            participants: get().participants.map(p =>
              p.id === 'host-local' ? { ...p, isVideoOn: false, isMuted: true } : p
            ),
          });
        }
      },

      setSidebarWidth: (width) => set({ sidebarWidth: width }),
      setAIPanelWidth: (width) => set({ aiPanelWidth: width }),

      stopLocalStream: () => {
        const stream = get().localStream;
        if (stream) {
          stream.getTracks().forEach(t => t.stop());
        }
        set({ localStream: null });
      },

      setLocalStream: (stream) => set({ localStream: stream }),
      setMediaPermission: (state) => set({ mediaPermission: state }),

      // ─── Basic controls ─────────────────────────────────────────────────
      toggleMic: () => {
        const { micOn, localStream } = get();
        if (localStream) {
          localStream.getAudioTracks().forEach(t => { t.enabled = !micOn; });
        }
        set((state) => ({
          micOn: !state.micOn,
          participants: state.participants.map(p =>
            p.id === 'host-local' ? { ...p, isMuted: state.micOn } : p
          ),
        }));
      },

      toggleCam: () => {
        const { camOn, localStream } = get();
        if (localStream) {
          localStream.getVideoTracks().forEach(t => { t.enabled = !camOn; });
        }
        set((state) => ({
          camOn: !state.camOn,
          participants: state.participants.map(p =>
            p.id === 'host-local' ? { ...p, isVideoOn: !state.camOn } : p
          ),
        }));
      },

      toggleRecording: () => set((state) => ({ isRecording: !state.isRecording })),
      toggleAIPanel: () => set((state) => ({ isAIPanelOpen: !state.isAIPanelOpen })),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarTab: (tab) => set({ sidebarTab: tab, isSidebarOpen: true }),

      // ─── AI pipeline ───────────────────────────────────────────────────
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
        const newEvent: TimelineEvent = { id: uuidv4(), timestamp: Date.now(), label: event, type };
        set((state) => ({ timeline: [...state.timeline, newEvent] }));
      },

      setSentiment: (sentiment) => set({ sentiment }),

      setActiveSpeaker: (id) => set((state) => ({
        activeSpeakerId: id,
        participants: state.participants.map(p =>
          p.id === id ? { ...p, isSpeaking: true } : { ...p, isSpeaking: false }
        )
      })),

      // ─── Chat ──────────────────────────────────────────────────────────
      sendMessage: (text, senderId) => {
        const sender = get().participants.find(p => p.id === senderId);
        const msg: ChatMessage = {
          id: uuidv4(),
          senderId,
          senderName: sender?.name || 'You',
          text,
          timestamp: Date.now(),
          reactions: [],
        };
        set((state) => ({ chatMessages: [...state.chatMessages, msg] }));
      },

      addReaction: (messageId, emoji) => {
        set((state) => ({
          chatMessages: state.chatMessages.map(m =>
            m.id === messageId ? { ...m, reactions: [...m.reactions, emoji] } : m
          )
        }));
      },

      // ─── Files ─────────────────────────────────────────────────────────
      uploadFile: (file, uploadedBy) => {
        const url = URL.createObjectURL(file);
        const newFile: MeetingFile = {
          id: uuidv4(),
          name: file.name,
          size: file.size,
          url,
          uploadedBy,
          uploadedAt: Date.now(),
          type: file.type,
        };
        set((state) => ({ files: [...state.files, newFile] }));
      },

      // ─── Layout ────────────────────────────────────────────────────────
      setLayout: (layout) => set({ layout }),
      pinParticipant: (id) => set({ pinnedParticipantId: id }),

      // ─── Hand raise ────────────────────────────────────────────────────
      raiseHand: (participantId) => {
        set((state) => ({
          handRaiseQueue: state.handRaiseQueue.includes(participantId)
            ? state.handRaiseQueue
            : [...state.handRaiseQueue, participantId]
        }));
      },
      lowerHand: (participantId) => {
        set((state) => ({
          handRaiseQueue: state.handRaiseQueue.filter(id => id !== participantId)
        }));
      },

      // ─── Notes ─────────────────────────────────────────────────────────
      setNotes: (notes) => set({ notes }),

      // ─── Host controls ─────────────────────────────────────────────────
      admitParticipant: (_id) => { /* WebSocket placeholder */ },
      removeParticipant: (id) => {
        set((state) => ({
          participants: state.participants.filter(p => p.id !== id)
        }));
      },
      muteAll: () => {
        set((state) => ({
          participants: state.participants.map(p => ({ ...p, isMuted: true }))
        }));
      },
      makeHost: (id) => {
        set((state) => ({
          participants: state.participants.map(p =>
            p.id === id ? { ...p, role: 'host' } : p
          )
        }));
      },

      // ─── Screen share ──────────────────────────────────────────────────
      setScreenShareStream: (stream) => {
        set({ screenShareStream: stream, isScreenSharing: stream !== null });
      },

      // ─── Agenda ────────────────────────────────────────────────────────
      addAgendaItem: (title, duration) => {
        const item: AgendaItem = { id: uuidv4(), title, duration, completed: false };
        set((state) => ({ agendaItems: [...state.agendaItems, item] }));
      },
      removeAgendaItem: (id) => {
        set((state) => ({ agendaItems: state.agendaItems.filter(a => a.id !== id) }));
      },
      markAgendaDone: () => {
        set((state) => {
          const idx = state.currentAgendaIndex;
          const updated = state.agendaItems.map((a, i) =>
            i === idx ? { ...a, completed: true } : a
          );
          return {
            agendaItems: updated,
            currentAgendaIndex: Math.min(idx + 1, updated.length - 1),
          };
        });
      },
      toggleAgendaItem: (id) => {
        set((state) => ({
          agendaItems: state.agendaItems.map(a =>
            a.id === id ? { ...a, completed: !a.completed } : a
          )
        }));
      },

      // ─── Dev helpers ────────────────────────────────────────────────────
      addBotParticipant: () => {
        const existing = get().participants;
        const botIdx = existing.length - 1; // skip host
        if (botIdx >= BOT_NAMES.length) return;
        const bot = BOT_NAMES[botIdx];
        const newP: Participant = {
          id: uuidv4(),
          name: bot.name,
          role: 'participant',
          isSpeaking: false,
          isMuted: Math.random() > 0.5,
          isVideoOn: Math.random() > 0.3,
          connectionQuality: (['good', 'moderate', 'good'] as const)[Math.floor(Math.random() * 3)],
          joinedAt: Date.now(),
          avatar: bot.avatar,
        };
        set((state) => ({
          participants: [...state.participants, newP],
          timeline: [...state.timeline, { id: uuidv4(), timestamp: Date.now(), label: `${bot.name} joined`, type: 'join' as TimelineEvent['type'] }],
        }));
      },
    }),
    {
      name: 'intellmeet-session-v3',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        transcript: state.transcript,
        aiSummary: state.aiSummary,
        actionItems: state.actionItems,
        timeline: state.timeline,
        isAIPanelOpen: state.isAIPanelOpen,
        isSidebarOpen: state.isSidebarOpen,
        chatMessages: state.chatMessages,
        notes: state.notes,
        agendaItems: state.agendaItems,
        currentAgendaIndex: state.currentAgendaIndex,
        meetingTitle: state.meetingTitle,
        meetingStartTime: state.meetingStartTime,
        layout: state.layout,
      }),
    }
  )
);
