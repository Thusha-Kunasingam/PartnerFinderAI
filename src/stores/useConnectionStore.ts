import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ConnectionRequest } from '../types';
import { initialConnectionRequests } from '../data/mockData';

interface ConnectionState {
  receivedRequests: ConnectionRequest[];
  sentRequests: ConnectionRequest[];
  acceptedConnectionIds: string[];
  activeTab: 'received' | 'sent';
  setActiveTab: (tab: 'received' | 'sent') => void;
  sendRequest: (
    recipientId: string,
    recipientName: string,
    projectName: string,
    message: string
  ) => void;
  acceptRequest: (requestId: string) => void;
  rejectRequest: (requestId: string) => void;
  cancelSentRequest: (requestId: string) => void;
  hasSentRequest: (candidateId: string) => boolean;
}

export const useConnectionStore = create<ConnectionState>()(
  persist(
    (set, get) => ({
      receivedRequests: initialConnectionRequests.filter((r) => r.recipientId === 'user-thusha'),
      sentRequests: initialConnectionRequests.filter((r) => r.senderId === 'user-thusha'),
      acceptedConnectionIds: ['k-thulaanchan', 'v-vishanan'],
      activeTab: 'received',

      setActiveTab: (activeTab) => set({ activeTab }),

      sendRequest: (recipientId, recipientName, projectName, message) =>
        set((state) => {
          // Check if already sent
          const existing = state.sentRequests.find((r) => r.recipientId === recipientId);
          if (existing) {
            // Update message if exists
            return {
              sentRequests: state.sentRequests.map((r) =>
                r.recipientId === recipientId ? { ...r, message, createdAt: 'Just now' } : r
              ),
            };
          }

          const newReq: ConnectionRequest = {
            id: `req-${Date.now()}`,
            senderId: 'user-thusha',
            senderName: 'K.Thusha',
            senderInitials: 'KT',
            recipientId,
            projectId: 'ai-event-assistant',
            projectName: projectName || 'AI Event Assistant',
            projectDuration: '6 Weeks',
            skillsNeeded: ['Python', 'AI'],
            message,
            status: 'pending',
            createdAt: 'Just now',
          };
          return { sentRequests: [newReq, ...state.sentRequests] };
        }),

      acceptRequest: (requestId) =>
        set((state) => {
          const req = state.receivedRequests.find((r) => r.id === requestId);
          const acceptedId = req ? req.senderId : '';
          return {
            receivedRequests: state.receivedRequests.filter((r) => r.id !== requestId),
            acceptedConnectionIds: acceptedId && !state.acceptedConnectionIds.includes(acceptedId)
              ? [...state.acceptedConnectionIds, acceptedId]
              : state.acceptedConnectionIds,
          };
        }),

      rejectRequest: (requestId) =>
        set((state) => ({
          receivedRequests: state.receivedRequests.filter((r) => r.id !== requestId),
        })),

      cancelSentRequest: (requestId) =>
        set((state) => ({
          sentRequests: state.sentRequests.filter((r) => r.id !== requestId),
        })),

      hasSentRequest: (candidateId) => {
        return get().sentRequests.some((r) => r.recipientId === candidateId);
      },
    }),
    {
      name: 'partnerfinder-connections',
    }
  )
);
