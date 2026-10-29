import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../constants/app_colors.dart';
import '../../constants/app_styles.dart';
import '../../providers/auth_provider.dart';
import '../../providers/matching_provider.dart';
import '../../providers/workspace_provider.dart';
import '../../providers/connection_provider.dart';
import '../../widgets/app_header.dart';
import '../../widgets/bottom_nav_bar.dart';
import '../../widgets/candidate_card.dart';
import '../../widgets/custom_button.dart';
import '../../widgets/badge_pill.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    final matching = context.watch<MatchingProvider>();
    final workspaceProvider = context.watch<WorkspaceProvider>();
    final connProvider = context.watch<ConnectionProvider>();
    final activeWorkspace = workspaceProvider.activeWorkspace;
    final topCandidates = matching.candidates.take(3).toList();

    return Scaffold(
      backgroundColor: AppColors.backgroundLight,
      appBar: const AppHeader(),
      bottomNavigationBar: const MobileBottomNavBar(currentIndex: 0),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Welcome Banner
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  gradient: AppColors.primaryGradient,
                  borderRadius: AppStyles.roundedXl,
                  boxShadow: AppStyles.shadowGlowPurple,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Welcome back, ${auth.currentUser?.fullName ?? "K.Thusha"} 👋',
                                style: const TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.w800,
                                  color: Colors.white,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                auth.currentUser?.university ??
                                    'University of Moratuwa',
                                style: const TextStyle(
                                  fontSize: 13,
                                  color: Color(0xFFD8B4FE),
                                ),
                              ),
                            ],
                          ),
                        ),
                        BadgePill.verified(),
                      ],
                    ),
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        _buildHeaderStat(
                            '${workspaceProvider.workspaces.length}',
                            'Active Workspace'),
                        _buildHeaderDivider(),
                        _buildHeaderStat(
                            '${connProvider.pendingReceivedCount}',
                            'New Requests'),
                        _buildHeaderDivider(),
                        _buildHeaderStat(
                            '${matching.candidates.length}', 'Top Matches'),
                      ],
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 16),

              // Quick Action Buttons
              Row(
                children: [
                  Expanded(
                    child: CustomButton.gradient(
                      text: 'Post Requirement',
                      icon: Icons.add_circle_outline,
                      height: 42,
                      onPressed: () => context.push('/requirements/new'),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: CustomButton.outline(
                      text: 'Find Partners',
                      icon: Icons.search,
                      height: 42,
                      onPressed: () => context.go('/matches'),
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 20),

              // Active Project Workspace Card
              if (activeWorkspace != null) ...[
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'Active Workspace',
                      style: TextStyle(
                        fontSize: 17,
                        fontWeight: FontWeight.w700,
                        color: AppColors.textPrimary,
                      ),
                    ),
                    TextButton(
                      onPressed: () =>
                          context.go('/workspace/${activeWorkspace.id}'),
                      child: const Text('View All',
                          style: TextStyle(
                              color: AppColors.primary,
                              fontWeight: FontWeight.w600)),
                    ),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: AppStyles.cardDecoration,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(
                            child: Text(
                              activeWorkspace.name,
                              style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w700,
                                color: AppColors.textPrimary,
                              ),
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(
                                horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: AppColors.successBg,
                              borderRadius: BorderRadius.circular(4),
                              border: Border.all(
                                  color: const Color(0xFFA7F3D0)),
                            ),
                            child: Text(
                              activeWorkspace.status,
                              style: const TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.w600,
                                color: AppColors.success,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      Text(
                        activeWorkspace.tagline,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          fontSize: 12,
                          color: AppColors.textSecondary,
                        ),
                      ),
                      const SizedBox(height: 14),

                      // Progress bar
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text(
                            'Sprint Progress',
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w600,
                              color: AppColors.textSecondary,
                            ),
                          ),
                          Text(
                            '${activeWorkspace.progressPercentage}%',
                            style: const TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w700,
                              color: AppColors.primary,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 6),
                      ClipRRect(
                        borderRadius: BorderRadius.circular(4),
                        child: LinearProgressIndicator(
                          value: activeWorkspace.progressPercentage / 100.0,
                          backgroundColor: AppColors.surfaceContainerHigh,
                          valueColor: const AlwaysStoppedAnimation<Color>(
                              AppColors.primary),
                          minHeight: 6,
                        ),
                      ),
                      const SizedBox(height: 14),

                      // Team members & Buttons
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: activeWorkspace.members.take(4).map((m) {
                              return Container(
                                margin: const EdgeInsets.only(right: 6),
                                width: 28,
                                height: 28,
                                decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  color: AppColors.accentTint,
                                  border: Border.all(
                                      color: AppColors.borderTint),
                                ),
                                child: Center(
                                  child: Text(
                                    m.initials,
                                    style: const TextStyle(
                                      fontSize: 10,
                                      fontWeight: FontWeight.w700,
                                      color: AppColors.primary,
                                    ),
                                  ),
                                ),
                              );
                            }).toList(),
                          ),
                          CustomButton.outline(
                            text: 'Open Workspace',
                            height: 34,
                            onPressed: () =>
                                context.go('/workspace/${activeWorkspace.id}'),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],

              const SizedBox(height: 24),

              // Recommended Matches Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Recommended Partners',
                    style: TextStyle(
                      fontSize: 17,
                      fontWeight: FontWeight.w700,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  TextButton(
                    onPressed: () => context.go('/matches'),
                    child: const Text('View All',
                        style: TextStyle(
                            color: AppColors.primary,
                            fontWeight: FontWeight.w600)),
                  ),
                ],
              ),

              // Candidate Cards
              ...topCandidates
                  .map((candidate) => CandidateCard(candidate: candidate)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeaderStat(String number, String label) {
    return Expanded(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            number,
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w800,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            label,
            style: const TextStyle(
              fontSize: 11,
              color: Color(0xFFE9D5FF),
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeaderDivider() {
    return Container(
      width: 1,
      height: 24,
      margin: const EdgeInsets.symmetric(horizontal: 8),
      color: Colors.white24,
    );
  }
}
