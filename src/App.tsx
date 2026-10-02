import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from './components/layouts/PublicLayout';
import { OnboardingLayout } from './components/layouts/OnboardingLayout';
import { AppShellLayout } from './components/layouts/AppShellLayout';

// Pages
import { LandingPage } from './pages/landing/LandingPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { LoginPage } from './pages/auth/LoginPage';

import { OnboardingProfilePage } from './pages/onboarding/OnboardingProfilePage';
import { OnboardingSkillsPage } from './pages/onboarding/OnboardingSkillsPage';
import { OnboardingLearnPage } from './pages/onboarding/OnboardingLearnPage';
import { OnboardingPartnerTypePage } from './pages/onboarding/OnboardingPartnerTypePage';

import { PartnerRequirementFormPage } from './pages/matching/PartnerRequirementFormPage';
import { MatchingProcessingPage } from './pages/matching/MatchingProcessingPage';
import { MatchingResultsPage } from './pages/matching/MatchingResultsPage';
import { CandidateProfilePage } from './pages/matching/CandidateProfilePage';
import { MatchExplanationPage } from './pages/matching/MatchExplanationPage';

import { SendConnectionRequestModal } from './pages/connections/SendConnectionRequestModal';
import { ConnectionSuccessPage } from './pages/connections/ConnectionSuccessPage';
import { ConnectionRequestsPage } from './pages/connections/ConnectionRequestsPage';

import { UserDashboardPage } from './pages/dashboard/UserDashboardPage';
import { ChatPage } from './pages/chat/ChatPage';
import { CollaborationWorkspacePage } from './pages/workspace/CollaborationWorkspacePage';
import { ProjectProgressPage } from './pages/workspace/ProjectProgressPage';
import { TeammateRatingDetailedPage } from './pages/workspace/TeammateRatingDetailedPage';
import { TeammateRatingModal } from './pages/workspace/TeammateRatingModal';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standalone Auth Routes (Centered cards on #f8f9ff, matching Stitch) */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Public Routes with Global Dark Header & Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />

          {/* Focused Matching & Connection Flow Pages */}
          <Route path="/requirements/new" element={<PartnerRequirementFormPage />} />
          <Route path="/matching/processing" element={<MatchingProcessingPage />} />
          <Route path="/matches" element={<MatchingResultsPage />} />
          <Route path="/candidates/:candidateId" element={<CandidateProfilePage />} />
          <Route path="/matches/:candidateId/explanation" element={<MatchExplanationPage />} />
          <Route path="/connections/request/:candidateId" element={<SendConnectionRequestModal />} />
          <Route path="/connections/success/:candidateId" element={<ConnectionSuccessPage />} />

          {/* Workspace Views */}
          <Route path="/workspace/:projectId" element={<CollaborationWorkspacePage />} />
          <Route path="/workspace/:projectId/progress" element={<ProjectProgressPage />} />
          <Route path="/workspace/:projectId/review/:userId" element={<TeammateRatingDetailedPage />} />
          <Route path="/workspace/:projectId/rate/:userId" element={<TeammateRatingModal />} />
        </Route>

        {/* Multi-step Onboarding Routes */}
        <Route element={<OnboardingLayout />}>
          <Route path="/onboarding/profile" element={<OnboardingProfilePage />} />
          <Route path="/onboarding/skills" element={<OnboardingSkillsPage />} />
          <Route path="/onboarding/learn" element={<OnboardingLearnPage />} />
          <Route path="/onboarding/partner-type" element={<OnboardingPartnerTypePage />} />
        </Route>

        {/* Authenticated Application Shell Routes (260px SideNavRail + 64px TopCommandBar) */}
        <Route element={<AppShellLayout />}>
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/connections/requests" element={<ConnectionRequestsPage />} />
          <Route path="/messages" element={<ChatPage />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
