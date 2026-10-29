import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../constants/app_colors.dart';
import '../../constants/app_styles.dart';
import '../../models/review_model.dart';
import '../../providers/workspace_provider.dart';
import '../../widgets/app_header.dart';
import '../../widgets/badge_pill.dart';
import '../../widgets/custom_button.dart';
import '../../widgets/custom_text_field.dart';
import '../../widgets/star_rating_bar.dart';

class TeammateRatingDetailedScreen extends StatefulWidget {
  final String projectId;
  final String userId;

  const TeammateRatingDetailedScreen({
    super.key,
    required this.projectId,
    required this.userId,
  });

  @override
  State<TeammateRatingDetailedScreen> createState() =>
      _TeammateRatingDetailedScreenState();
}

class _TeammateRatingDetailedScreenState
    extends State<TeammateRatingDetailedScreen> {
  double _communication = 5.0;
  double _technical = 4.0;
  double _teamwork = 5.0;
  double _reliability = 4.0;

  final _feedbackController = TextEditingController(
      text:
          'K.Thulaanchan was an outstanding collaborator! Delivered clean FastAPI endpoints on time and demonstrated deep understanding of LLM integration.');
  bool _isPublic = true;

  @override
  void dispose() {
    _feedbackController.dispose();
    super.dispose();
  }

  double get _averageScore =>
      (_communication + _technical + _teamwork + _reliability) / 4.0;

  void _handleSubmit() {
    final workspaceProvider = context.read<WorkspaceProvider>();

    final review = TeammateReview(
      id: 'rev-${DateTime.now().millisecondsSinceEpoch}',
      projectId: widget.projectId,
      reviewerId: 'user-thusha',
      revieweeId: widget.userId,
      communicationRating: _communication,
      technicalSkillsRating: _technical,
      teamworkRating: _teamwork,
      reliabilityRating: _reliability,
      feedbackText: _feedbackController.text.trim(),
      isAnonymous: !_isPublic,
      createdAt: DateTime.now().toIso8601String(),
    );

    workspaceProvider.submitReview(review);

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Review submitted successfully!'),
        backgroundColor: AppColors.success,
      ),
    );

    context.go('/workspace/${widget.projectId}');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundLight,
      appBar: const AppHeader(title: 'Rate Teammate', showBackButton: true),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Container(
            padding: const EdgeInsets.all(20),
            decoration: AppStyles.cardDecoration,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'Rate Your Teammate',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w700,
                        color: AppColors.textPrimary,
                      ),
                    ),
                    BadgePill.verified(),
                  ],
                ),
                const SizedBox(height: 4),
                const Text(
                  'Your review builds verified reputation on PartnerFinder AI.',
                  style: TextStyle(fontSize: 12, color: AppColors.textSecondary),
                ),
                const SizedBox(height: 16),

                // Teammate micro card
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppColors.accentTint,
                    borderRadius: AppStyles.roundedMd,
                    border: Border.all(color: AppColors.borderTint),
                  ),
                  child: Row(
                    children: [
                      Container(
                        width: 44,
                        height: 44,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: Colors.white,
                          border: Border.all(color: AppColors.borderTint),
                        ),
                        child: const Center(
                          child: Text(
                            'KT',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w700,
                              color: AppColors.primary,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      const Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'K.Thulaanchan',
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.w700,
                                color: AppColors.textPrimary,
                              ),
                            ),
                            Text(
                              'Backend & AI Developer • University of Jaffna',
                              style: TextStyle(
                                fontSize: 11,
                                color: AppColors.textSecondary,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 20),

                // 4 Criteria Rating Bars
                StarRatingBar(
                  label: '1. Communication',
                  description: 'Promptness, responsiveness, and clear discussions',
                  rating: _communication,
                  onRatingChanged: (val) =>
                      setState(() => _communication = val),
                ),
                const Divider(height: 28),

                StarRatingBar(
                  label: '2. Technical Skills',
                  description:
                      'Quality of code, problem-solving, and implementation',
                  rating: _technical,
                  onRatingChanged: (val) =>
                      setState(() => _technical = val),
                ),
                const Divider(height: 28),

                StarRatingBar(
                  label: '3. Teamwork',
                  description:
                      'Collaboration, openness to feedback, and team spirit',
                  rating: _teamwork,
                  onRatingChanged: (val) => setState(() => _teamwork = val),
                ),
                const Divider(height: 28),

                StarRatingBar(
                  label: '4. Reliability & Timeliness',
                  description:
                      'Meeting milestone deadlines and fulfilling commitments',
                  rating: _reliability,
                  onRatingChanged: (val) =>
                      setState(() => _reliability = val),
                ),

                const SizedBox(height: 20),

                // Calculated Score Callout
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: AppColors.accentTint,
                    borderRadius: AppStyles.roundedMd,
                    border: Border.all(color: AppColors.borderTint),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Row(
                        children: [
                          Icon(Icons.insights,
                              color: AppColors.primary, size: 20),
                          SizedBox(width: 8),
                          Text(
                            'Calculated Score',
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.w700,
                              color: AppColors.textPrimary,
                            ),
                          ),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.primary,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          'Overall: ${_averageScore.toStringAsFixed(1)} / 5.0',
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w700,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 18),

                // Written Feedback Textarea
                CustomTextField(
                  label: 'Written Feedback',
                  hint: 'Describe your collaboration experience with this teammate...',
                  controller: _feedbackController,
                  maxLines: 4,
                ),

                const SizedBox(height: 12),

                // Public display checkbox
                Row(
                  children: [
                    Checkbox(
                      value: _isPublic,
                      activeColor: AppColors.primary,
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(4)),
                      onChanged: (val) =>
                          setState(() => _isPublic = val ?? true),
                    ),
                    const Expanded(
                      child: Text(
                        'Display this review publicly on teammate profile',
                        style: TextStyle(
                            fontSize: 12, color: AppColors.textSecondary),
                      ),
                    ),
                  ],
                ),

                const SizedBox(height: 20),

                CustomButton.gradient(
                  text: 'Submit Verified Review',
                  icon: Icons.send,
                  height: 48,
                  onPressed: _handleSubmit,
                ),
                const SizedBox(height: 10),
                CustomButton.outline(
                  text: 'Skip for Now',
                  height: 42,
                  onPressed: () => context.pop(),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
