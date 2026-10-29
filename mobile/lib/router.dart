import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

// Screens
import 'screens/landing/landing_screen.dart';
import 'screens/auth/login_screen.dart';
import 'screens/auth/register_screen.dart';
import 'screens/onboarding/onboarding_screen.dart';
import 'screens/dashboard/dashboard_screen.dart';
import 'screens/matching/requirement_form_screen.dart';
import 'screens/matching/match_processing_screen.dart';
import 'screens/matching/matches_screen.dart';
import 'screens/matching/candidate_profile_screen.dart';
import 'screens/matching/match_explanation_screen.dart';
import 'screens/connections/connection_request_screen.dart';
import 'screens/connections/connection_success_screen.dart';
import 'screens/connections/connection_requests_screen.dart';
import 'screens/chat/chat_screen.dart';
import 'screens/workspace/workspace_screen.dart';
import 'screens/workspace/project_progress_screen.dart';
import 'screens/workspace/teammate_rating_detailed_screen.dart';
import 'screens/workspace/teammate_rating_modal_screen.dart';

class AppRouter {
  AppRouter._();

  static final GoRouter router = GoRouter(
    initialLocation: '/',
    routes: [
      // Screen 1: Marketing Landing Page
      GoRoute(
        path: '/',
        builder: (context, state) => const LandingScreen(),
      ),

      // Screen 2 & 3: Authentication
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/register',
        builder: (context, state) => const RegisterScreen(),
      ),

      // Screens 4–7: Onboarding Flow
      GoRoute(
        path: '/onboarding/profile',
        builder: (context, state) => const OnboardingScreen(initialStep: 1),
      ),
      GoRoute(
        path: '/onboarding/skills',
        builder: (context, state) => const OnboardingScreen(initialStep: 2),
      ),
      GoRoute(
        path: '/onboarding/learn',
        builder: (context, state) => const OnboardingScreen(initialStep: 3),
      ),
      GoRoute(
        path: '/onboarding/partner-type',
        builder: (context, state) => const OnboardingScreen(initialStep: 4),
      ),

      // Screen 16: User Dashboard
      GoRoute(
        path: '/dashboard',
        builder: (context, state) => const DashboardScreen(),
      ),

      // Screen 8: Project Partner Requirements
      GoRoute(
        path: '/requirements/new',
        builder: (context, state) => const RequirementFormScreen(),
      ),

      // Screen 9: AI Match Processing
      GoRoute(
        path: '/matching/processing',
        builder: (context, state) => const MatchProcessingScreen(),
      ),

      // Screen 10: Matching Results
      GoRoute(
        path: '/matches',
        builder: (context, state) => const MatchesScreen(),
      ),

      // Screen 11: Candidate Profile Deep Dive
      GoRoute(
        path: '/candidates/:candidateId',
        builder: (context, state) {
          final id = state.pathParameters['candidateId'] ?? 'k-thulaanchan';
          return CandidateProfileScreen(candidateId: id);
        },
      ),

      // Screen 12: AI Match Explanation
      GoRoute(
        path: '/matches/:candidateId/explanation',
        builder: (context, state) {
          final id = state.pathParameters['candidateId'] ?? 'k-thulaanchan';
          return MatchExplanationScreen(candidateId: id);
        },
      ),

      // Screen 13: Connection Request
      GoRoute(
        path: '/connections/request/:candidateId',
        builder: (context, state) {
          final id = state.pathParameters['candidateId'] ?? 'k-thulaanchan';
          return ConnectionRequestScreen(candidateId: id);
        },
      ),

      // Screen 14: Connection Successful
      GoRoute(
        path: '/connections/success/:candidateId',
        builder: (context, state) {
          final id = state.pathParameters['candidateId'] ?? 'k-thulaanchan';
          return ConnectionSuccessScreen(candidateId: id);
        },
      ),

      // Screen 15: Connection Requests Hub
      GoRoute(
        path: '/connections/requests',
        builder: (context, state) => const ConnectionRequestsScreen(),
      ),

      // Screen 17: Direct Messaging / Chat
      GoRoute(
        path: '/messages',
        builder: (context, state) => const ChatScreen(),
      ),

      // Screen 18: Collaboration Workspace
      GoRoute(
        path: '/workspace/:projectId',
        builder: (context, state) {
          final id = state.pathParameters['projectId'] ?? 'ai-event-assistant';
          return WorkspaceScreen(projectId: id);
        },
      ),

      // Screen 19: Project Progress & Milestones
      GoRoute(
        path: '/workspace/:projectId/progress',
        builder: (context, state) {
          final id = state.pathParameters['projectId'] ?? 'ai-event-assistant';
          return ProjectProgressScreen(projectId: id);
        },
      ),

      // Screen 20: Teammate Rating Detailed View
      GoRoute(
        path: '/workspace/:projectId/review/:userId',
        builder: (context, state) {
          final pId = state.pathParameters['projectId'] ?? 'ai-event-assistant';
          final uId = state.pathParameters['userId'] ?? 'k-thulaanchan';
          return TeammateRatingDetailedScreen(projectId: pId, userId: uId);
        },
      ),

      // Screen 21: Teammate Rating Simplified Modal View
      GoRoute(
        path: '/workspace/:projectId/rate/:userId',
        builder: (context, state) {
          final pId = state.pathParameters['projectId'] ?? 'ai-event-assistant';
          final uId = state.pathParameters['userId'] ?? 'k-thulaanchan';
          return TeammateRatingModalScreen(projectId: pId, userId: uId);
        },
      ),
    ],
    errorBuilder: (context, state) => Scaffold(
      body: Center(
        child: Text('Route not found: ${state.uri.toString()}'),
      ),
    ),
  );
}
