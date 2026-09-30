import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatConversation, ChatMessage } from '../types';
import { initialConversations } from '../data/mockData';

interface ChatState {
  conversations: ChatConversation[];
  activeConversationId: string;
  setActiveConversationId: (id: string) => void;
  sendMessage: (conversationId: string, text: string) => void;
  getActiveConversation: () => ChatConversation | undefined;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: initialConversations,
      activeConversationId: 'conv-thulaanchan',

      setActiveConversationId: (id) => set({ activeConversationId: id }),

      sendMessage: (conversationId, text) =>
        set((state) => {
          const now = new Date();
          const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          const newMessage: ChatMessage = {
            id: `msg-${Date.now()}`,
            senderId: 'user-thusha',
            senderName: 'K.Thusha',
            text,
            timestamp: timeString,
            isDelivered: true,
            isRead: true,
          };

          return {
            conversations: state.conversations.map((c) =>
              c.id === conversationId
                ? {
                    ...c,
                    lastMessageSnippet: text,
                    lastMessageTimestamp: 'Just now',
                    messages: [...c.messages, newMessage],
                  }
                : c
            ),
          };
        }),

      getActiveConversation: () => {
        const { conversations, activeConversationId } = get();
        return conversations.find((c) => c.id === activeConversationId) || conversations[0];
      },
    }),
    {
      name: 'partnerfinder-chat',
    }
  )
);
