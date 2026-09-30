import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProjectWorkspace, TeammateReview } from '../types';
import { initialWorkspaces } from '../data/mockData';

interface WorkspaceState {
  workspaces: ProjectWorkspace[];
  activeWorkspaceId: string;
  reviews: TeammateReview[];
  setActiveWorkspaceId: (id: string) => void;
  toggleMilestone: (workspaceId: string, milestoneId: string) => void;
  submitReview: (review: Omit<TeammateReview, 'id' | 'createdAt'>) => void;
  getActiveWorkspace: () => ProjectWorkspace | undefined;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      workspaces: initialWorkspaces,
      activeWorkspaceId: 'ai-event-assistant',
      reviews: [],

      setActiveWorkspaceId: (activeWorkspaceId) => set({ activeWorkspaceId }),

      toggleMilestone: (workspaceId, milestoneId) =>
        set((state) => ({
          workspaces: state.workspaces.map((ws) => {
            if (ws.id !== workspaceId) return ws;
            const updatedMilestones = ws.milestones.map((m) =>
              m.id === milestoneId ? { ...m, isCompleted: !m.isCompleted } : m
            );
            const completedCount = updatedMilestones.filter((m) => m.isCompleted).length;
            const progressPercentage = Math.round((completedCount / updatedMilestones.length) * 100);
            return {
              ...ws,
              milestones: updatedMilestones,
              progressPercentage,
            };
          }),
        })),

      submitReview: (reviewData) =>
        set((state) => {
          const newReview: TeammateReview = {
            ...reviewData,
            id: `rev-${Date.now()}`,
            createdAt: new Date().toISOString(),
          };
          return { reviews: [...state.reviews, newReview] };
        }),

      getActiveWorkspace: () => {
        const { workspaces, activeWorkspaceId } = get();
        return workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];
      },
    }),
    {
      name: 'partnerfinder-workspaces',
    }
  )
);
