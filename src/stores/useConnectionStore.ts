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
  sendRequest: (recipientId: string, recipientName: string, projectName: string, message: string) => void;
  acceptRequest: (requestId: string) => void;
  rejectRequest: (requestId: string) => void;
}

export const useConnectionStore = create<ConnectionState>()(
  persist(
    (set) => ({
      receivedRequests: initialConnectionRequests.filter((r) => r.recipientId === 'user-thusha'),
      sentRequests: initialConnectionRequests.filter((r) => r.senderId === 'user-thusha'),
      acceptedConnectionIds: ['k-thulaanchan', 'v-vishanan'],
      activeTab: 'received',

      setActiveTab: (activeTab) => set({ activeTab }),

      sendRequest: (recipientId, recipientName, projectName, message) =>
        set((state) => {
          const newReq: ConnectionRequest = {
            id: `req-${Date.now()}`,
            senderId: 'user-thusha',
            senderName: 'K.Thusha',
            senderInitials: 'KT',
            recipientId,
            projectId: 'ai-event-assistant',
            projectName,
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
            acceptedConnectionIds: acceptedId ? [...state.acceptedConnectionIds, acceptedId] : state.acceptedConnectionIds,
          };
        }),

      rejectRequest: (requestId) =>
        set((state) => ({
          receivedRequests: state.receivedRequests.filter((r) => r.id !== requestId),
        })),
    }),
    {
      name: 'partnerfinder-connections',
    }
  )
);
