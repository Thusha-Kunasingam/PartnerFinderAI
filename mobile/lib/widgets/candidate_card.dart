import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../models/candidate_model.dart';
import '../constants/app_colors.dart';
import '../constants/app_styles.dart';
import '../providers/matching_provider.dart';
import 'badge_pill.dart';
import 'custom_button.dart';

class CandidateCard extends StatelessWidget {
  final CandidateMatch candidate;

  const CandidateCard({
    super.key,
    required this.candidate,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: AppStyles.cardDecoration,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header: Avatar, Info, and Bookmark
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Avatar
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppColors.accentTint,
                  border: Border.all(color: AppColors.borderTint, width: 2),
                ),
                child: Center(
                  child: Text(
                    candidate.initials,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w700,
                      color: AppColors.primary,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              // Name, Title & University
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      candidate.candidateName,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w700,
                        color: AppColors.textPrimary,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      candidate.title,
                      style: const TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w500,
                        color: AppColors.textSecondary,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Row(
                      children: [
                        const Icon(Icons.school_outlined,
                            size: 14, color: AppColors.textMuted),
                        const SizedBox(width: 4),
                        Text(
                          candidate.university,
                          style: const TextStyle(
                            fontSize: 12,
                            color: AppColors.textMuted,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              // Bookmark Icon
              Consumer<MatchingProvider>(
                builder: (context, provider, _) => IconButton(
                  icon: Icon(
                    candidate.isBookmarked
                        ? Icons.bookmark
                        : Icons.bookmark_border,
                    color: candidate.isBookmarked
                        ? AppColors.primary
                        : AppColors.textMuted,
                  ),
                  onPressed: () =>
                      provider.toggleBookmark(candidate.candidateId),
                ),
              ),
            ],
          ),

          const SizedBox(height: 12),

          // Badges: Match Score and Availability
          Row(
            children: [
              BadgePill.matchScore(candidate.matchScore),
              const SizedBox(width: 8),
              Expanded(
                child: Row(
                  children: [
                    const Icon(Icons.schedule,
                        size: 14, color: AppColors.textSecondary),
                    const SizedBox(width: 4),
                    Expanded(
                      child: Text(
                        candidate.availabilityText,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          fontSize: 12,
                          color: AppColors.textSecondary,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),

          const SizedBox(height: 12),

          // Tech stack chips
          Wrap(
            spacing: 6,
            runSpacing: 6,
            children: candidate.matchingTechStack
                .map((skill) => BadgePill.skill(skill))
                .toList(),
          ),

          const SizedBox(height: 14),
          const Divider(height: 1),
          const SizedBox(height: 12),

          // Actions: Profile & Connect
          Row(
            children: [
              Expanded(
                child: CustomButton.outline(
                  text: 'View Profile',
                  height: 38,
                  onPressed: () {
                    context.push('/candidates/${candidate.candidateId}');
                  },
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: CustomButton.gradient(
                  text: 'Connect',
                  height: 38,
                  icon: Icons.send,
                  onPressed: () {
                    context.push('/connections/request/${candidate.candidateId}');
                  },
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
