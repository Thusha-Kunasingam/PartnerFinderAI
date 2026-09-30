import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CandidateMatch, ProjectRequirement } from '../types';
import { initialCandidates } from '../data/mockData';

interface MatchingState {
  requirementsDraft: ProjectRequirement;
  matches: CandidateMatch[];
  activeFilter: 'all' | '90+' | 'weekends';
  sortBy: 'score' | 'availability' | 'experience';
  processingProgress: number;
  isProcessing: boolean;
  setRequirements: (req: Partial<ProjectRequirement>) => void;
  setActiveFilter: (filter: 'all' | '90+' | 'weekends') => void;
  setSortBy: (sort: 'score' | 'availability' | 'experience') => void;
  toggleBookmark: (candidateId: string) => void;
  setProcessingProgress: (progress: number) => void;
  setIsProcessing: (status: boolean) => void;
  getFilteredMatches: () => CandidateMatch[];
}

const defaultRequirements: ProjectRequirement = {
  id: 'req-active',
  creatorId: 'user-thusha',
  projectHeadline: 'AI Event Assistant - Intelligent Attendee Matchmaking',
  requiredRole: 'Backend & AI Developer',
  experienceLevel: 'Intermediate (2 - 4 years)',
  requiredSkills: ['Python', 'AI', 'FastAPI'],
  weeklyHoursCommitment: 15,
  availabilityDays: ['Sat', 'Sun'],
  projectDuration: '6 Weeks (Full V1 Build)',
  locationPreference: 'Remote',
  projectDescription: 'Building a real-time event copilot that analyzes attendee profiles and schedules targeted networking matches with automated reminders.',
  createdAt: '2025-02-01T10:00:00Z',
};

export const useMatchingStore = create<MatchingState>()(
  persist(
    (set, get) => ({
      requirementsDraft: defaultRequirements,
      matches: initialCandidates,
      activeFilter: 'all',
      sortBy: 'score',
      processingProgress: 100,
      isProcessing: false,

      setRequirements: (req) =>
        set((state) => ({
          requirementsDraft: { ...state.requirementsDraft, ...req },
        })),

      setActiveFilter: (activeFilter) => set({ activeFilter }),
      setSortBy: (sortBy) => set({ sortBy }),

      toggleBookmark: (candidateId) =>
        set((state) => ({
          matches: state.matches.map((c) =>
            c.candidateId === candidateId ? { ...c, isBookmarked: !c.isBookmarked } : c
          ),
        })),

      setProcessingProgress: (processingProgress) => set({ processingProgress }),
      setIsProcessing: (isProcessing) => set({ isProcessing }),

      getFilteredMatches: () => {
        const { matches, activeFilter, sortBy } = get();
        let list = [...matches];

        if (activeFilter === '90+') {
          list = list.filter((c) => c.matchScore >= 90);
        } else if (activeFilter === 'weekends') {
          list = list.filter((c) => c.availabilityText.toLowerCase().includes('sat') || c.availabilityText.toLowerCase().includes('weekend'));
        }

        if (sortBy === 'score') {
          list.sort((a, b) => b.matchScore - a.matchScore);
        } else if (sortBy === 'availability') {
          list.sort((a, b) => b.dimensionalScores.availability - a.dimensionalScores.availability);
        } else if (sortBy === 'experience') {
          list.sort((a, b) => b.rating - a.rating);
        }

        return list;
      },
    }),
    {
      name: 'partnerfinder-matching',
    }
  )
);
