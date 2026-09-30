import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile } from '../types';
import { initialCurrentUser } from '../data/mockData';

interface AuthState {
  currentUser: UserProfile;
  isAuthenticated: boolean;
  login: (email?: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: initialCurrentUser,
      isAuthenticated: true,
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
      updateProfile: (updates) =>
        set((state) => ({
          currentUser: { ...state.currentUser, ...updates },
        })),
    }),
    {
      name: 'partnerfinder-auth',
    }
  )
);
