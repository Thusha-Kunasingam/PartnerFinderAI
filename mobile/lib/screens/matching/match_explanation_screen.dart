import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../constants/app_colors.dart';
import '../../constants/app_styles.dart';
import '../../providers/matching_provider.dart';
import '../../widgets/app_header.dart';
import '../../widgets/custom_button.dart';

class MatchExplanationScreen extends StatelessWidget {
  final String candidateId;

  const MatchExplanationScreen({super.key, required this.candidateId});

  @override
  Widget build(BuildContext context) {
    final matching = context.watch<MatchingProvider>();
    final candidate = matching.getCandidateById(candidateId);

    if (candidate == null) {
      return Scaffold(
        appBar: const AppHeader(title: 'Match Explanation', showBackButton: true),
        body: const Center(child: Text('Candidate not found')),
      );
    }

    final d = candidate.dimensionalScores;

    return Scaffold(
      backgroundColor: AppColors.backgroundLight,
      appBar: AppHeader(
        title: 'Why This Match?',
        showBackButton: true,
      ),
      bottomNavigationBar: Container(
        padding: const EdgeInsets.all(16),
        decoration: const BoxDecoration(
          color: Colors.white,
          border: Border(top: BorderSide(color: AppColors.border, width: 1)),
        ),
        child: CustomButton.gradient(
          text: 'Connect with ${candidate.candidateName}',
          icon: Icons.send,
          height: 48,
          onPressed: () {
            context.push('/connections/request/${candidate.candidateId}');
          },
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Overall Compatibility Score Card
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  gradient: AppColors.primaryGradient,
                  borderRadius: AppStyles.roundedLg,
                  boxShadow: AppStyles.shadowGlowPurple,
                ),
                child: Row(
                  children: [
                    Container(
                      width: 60,
                      height: 60,
                      decoration: const BoxDecoration(
                        shape: BoxShape.circle,
                        color: Colors.white,
                      ),
                      child: Center(
                        child: Text(
                          '${candidate.matchScore}%',
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w800,
                            color: AppColors.primary,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            candidate.candidateName,
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w700,
                              color: Colors.white,
                            ),
                          ),
                          const SizedBox(height: 2),
                          const Text(
                            'High Compatibility Match',
                            style: TextStyle(
                              fontSize: 12,
                              color: Color(0xFFD8B4FE),
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 20),

              // 4-Dimensional Breakdown
              const Text(
                'AI Multi-Factor Breakdown',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textPrimary,
                ),
              ),
              const SizedBox(height: 12),

              _buildDimensionCard(
                title: 'Technical Skills Alignment',
                weight: '40% Weight',
                score: d.skillsMatch,
                icon: Icons.code,
                explanation:
                    'Strong overlap with Python, PyTorch, FastAPI, and SQL requirement.',
              ),
              _buildDimensionCard(
                title: 'Schedule & Availability',
                weight: '25% Weight',
                score: d.availability,
                icon: Icons.schedule,
                explanation:
                    '15 hours/week available over Saturday and Sunday sprints.',
              ),
              _buildDimensionCard(
                title: 'Shared Project Interests',
                weight: '20% Weight',
                score: d.interests,
                icon: Icons.interests,
                explanation:
                    'Mutual focus on Generative AI tooling and LLM agent architecture.',
              ),
              _buildDimensionCard(
                title: 'Timezone & Location',
                weight: '15% Weight',
                score: d.location,
                icon: Icons.public,
                explanation:
                    'Based in Sri Lanka (UTC+5:30), zero timezone lag for synchronous calls.',
              ),

              const SizedBox(height: 20),

              // AI Matching Rationale
              Container(
                padding: const EdgeInsets.all(18),
                decoration: AppStyles.cardDecoration,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.auto_awesome,
                            color: AppColors.primary, size: 20),
                        const SizedBox(width: 8),
                        const Text(
                          'Key Match Insights',
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w700,
                            color: AppColors.textPrimary,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    ...candidate.matchingRationale.map(
                      (item) => Padding(
                        padding: const EdgeInsets.only(bottom: 8),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text('• ',
                                style: TextStyle(
                                    color: AppColors.primary,
                                    fontSize: 14,
                                    fontWeight: FontWeight.bold)),
                            Expanded(
                              child: Text(
                                item,
                                style: const TextStyle(
                                  fontSize: 13,
                                  color: AppColors.textSecondary,
                                  height: 1.4,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDimensionCard({
    required String title,
    required String weight,
    required int score,
    required IconData icon,
    required String explanation,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: AppStyles.cardDecoration,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: AppColors.accentTint,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(icon, color: AppColors.primary, size: 20),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w700,
                        color: AppColors.textPrimary,
                      ),
                    ),
                    Text(
                      weight,
                      style: const TextStyle(
                        fontSize: 11,
                        color: AppColors.textMuted,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
              Text(
                '$score%',
                style: const TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w700,
                  color: AppColors.primary,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: score / 100.0,
              backgroundColor: AppColors.surfaceContainerHigh,
              valueColor:
                  const AlwaysStoppedAnimation<Color>(AppColors.primary),
              minHeight: 5,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            explanation,
            style: const TextStyle(
              fontSize: 12,
              color: AppColors.textSecondary,
            ),
          ),
        ],
      ),
    );
  }
}
