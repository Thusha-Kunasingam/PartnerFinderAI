// User & Authentication Types
export type PartnerType = 
  | 'study_partner' 
  | 'project_partner' 
  | 'hackathon_team' 
  | 'skill_exchange' 
  | 'startup_partner';

export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface SkillProficiency {
  skillName: string;
  level: ProficiencyLevel;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  initials: string;
  university: string;
  major: string;
  yearOfStudy: string;
  location: string;
  bio: string;
  skillsOffered: SkillProficiency[];
  skillsToLearn: string[];
  preferredPartnerType: PartnerType;
  verifiedTeammateRating?: number;
  totalReviewsCount?: number;
  createdAt: string;
}

// Project Requirements & AI Matching Types
export interface ProjectRequirement {
  id: string;
  creatorId: string;
  projectHeadline: string;
  requiredRole: string;
  experienceLevel: 'Entry Level (0 - 1 year)' | 'Intermediate (2 - 4 years)' | 'Senior (5+ years)' | 'Lead / Architect';
  requiredSkills: string[];
  weeklyHoursCommitment: number;
  availabilityDays: ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun')[];
  projectDuration: '2 Weeks (Sprint MVP)' | '4 Weeks (Prototype)' | '6 Weeks (Full V1 Build)' | '3 Months (Production Scale)';
  locationPreference: 'Remote' | 'Hybrid' | 'On-site';
  projectDescription: string;
  createdAt: string;
}

export interface CandidateMatch {
  candidateId: string;
  candidateName: string;
  avatarUrl?: string;
  initials: string;
  title: string;
  university: string;
  location: string;
  availabilityText: string;
  matchScore: number; // e.g. 91
  dimensionalScores: {
    skillsMatch: number;      // 40% weight
    availability: number;     // 25% weight
    interests: number;        // 20% weight
    location: number;         // 15% weight
  };
  matchingRationale: string[];
  matchingTechStack: string[];
  rating: number;
  reviewsCount: number;
  bio: string;
  isBookmarked: boolean;
  previousProjects?: {
    title: string;
    description: string;
    tags: string[];
  }[];
}

// Connection Requests
export interface ConnectionRequest {
  id: string;
  senderId: string;
  senderName: string;
  senderInitials: string;
  senderAvatarUrl?: string;
  recipientId: string;
  projectId: string;
  projectName: string;
  projectDuration: string;
  skillsNeeded: string[];
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

// Collaboration Workspace & Milestones
export interface WorkspaceMember {
  userId: string;
  name: string;
  initials: string;
  avatarUrl?: string;
  role: string;
  isActive: boolean;
  skills: string[];
  matchCompatibility?: number;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  category: 'Requirements' | 'UI Design' | 'Database' | 'Backend API' | 'AI Integration' | 'Testing';
  isCompleted: boolean;
  completedAt?: string;
}

export interface ProjectWorkspace {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  status: 'Planning' | 'In Progress' | 'Completed';
  progressPercentage: number;
  members: WorkspaceMember[];
  milestones: ProjectMilestone[];
  filesCount: number;
  tasksCount: number;
  createdAt: string;
}

// Direct Messaging / Chat Types
export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isDelivered: boolean;
  isRead: boolean;
}

export interface ChatConversation {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerInitials: string;
  partnerAvatarUrl?: string;
  isOnline: boolean;
  lastMessageSnippet: string;
  lastMessageTimestamp: string;
  unreadCount: number;
  messages: ChatMessage[];
}

// Teammate Review / Rating
export interface TeammateReview {
  id: string;
  projectId: string;
  reviewerId: string;
  revieweeId: string;
  communicationRating: number;
  technicalSkillsRating: number;
  teamworkRating: number;
  reliabilityRating: number;
  feedbackText: string;
  isAnonymous: boolean;
  createdAt: string;
}
