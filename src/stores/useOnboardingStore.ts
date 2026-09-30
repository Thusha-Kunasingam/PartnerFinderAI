import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PartnerType, SkillProficiency } from '../types';

interface OnboardingState {
  currentStep: number;
  fullName: string;
  university: string;
  major: string;
  yearOfStudy: string;
  location: string;
  bio: string;
  skillsOffered: SkillProficiency[];
  skillsToLearn: string[];
  partnerType: PartnerType;
  setStep: (step: number) => void;
  setProfileData: (data: Partial<OnboardingState>) => void;
  toggleSkillOffered: (skillName: string, level?: SkillProficiency['level']) => void;
  updateSkillLevel: (skillName: string, level: SkillProficiency['level']) => void;
  removeSkillOffered: (skillName: string) => void;
  toggleSkillToLearn: (skill: string) => void;
  removeSkillToLearn: (skill: string) => void;
  setPartnerType: (type: PartnerType) => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      currentStep: 1,
      fullName: 'Alex Morgan',
      university: 'Stanford University',
      major: 'Computer Science',
      yearOfStudy: 'Junior (Year 3)',
      location: 'San Francisco, CA',
      bio: 'Building scalable distributed systems and intelligent agents. Excited to pair up on AI hackathon prototypes and semester projects.',
      skillsOffered: [
        { skillName: 'C#', level: 'Intermediate' },
        { skillName: 'Angular', level: 'Advanced' },
        { skillName: 'SQL', level: 'Intermediate' },
        { skillName: 'HTML', level: 'Expert' },
        { skillName: 'CSS', level: 'Advanced' },
      ],
      skillsToLearn: ['Python', 'Machine Learning', 'Flutter'],
      partnerType: 'project_partner',

      setStep: (step) => set({ currentStep: step }),
      setProfileData: (data) => set((state) => ({ ...state, ...data })),

      toggleSkillOffered: (skillName, level = 'Intermediate') =>
        set((state) => {
          const exists = state.skillsOffered.some((s) => s.skillName === skillName);
          if (exists) {
            return {
              skillsOffered: state.skillsOffered.filter((s) => s.skillName !== skillName),
            };
          }
          return {
            skillsOffered: [...state.skillsOffered, { skillName, level }],
          };
        }),

      updateSkillLevel: (skillName, level) =>
        set((state) => ({
          skillsOffered: state.skillsOffered.map((s) =>
            s.skillName === skillName ? { ...s, level } : s
          ),
        })),

      removeSkillOffered: (skillName) =>
        set((state) => ({
          skillsOffered: state.skillsOffered.filter((s) => s.skillName !== skillName),
        })),

      toggleSkillToLearn: (skill) =>
        set((state) => {
          const exists = state.skillsToLearn.includes(skill);
          if (exists) {
            return { skillsToLearn: state.skillsToLearn.filter((s) => s !== skill) };
          }
          return { skillsToLearn: [...state.skillsToLearn, skill] };
        }),

      removeSkillToLearn: (skill) =>
        set((state) => ({
          skillsToLearn: state.skillsToLearn.filter((s) => s !== skill),
        })),

      setPartnerType: (partnerType) => set({ partnerType }),

      resetOnboarding: () =>
        set({
          currentStep: 1,
          skillsOffered: [],
          skillsToLearn: [],
          partnerType: 'project_partner',
        }),
    }),
    {
      name: 'partnerfinder-onboarding',
    }
  )
);
