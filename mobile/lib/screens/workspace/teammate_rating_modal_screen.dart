import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../constants/app_colors.dart';
import '../../constants/app_styles.dart';
import '../../models/review_model.dart';
import '../../providers/workspace_provider.dart';
import '../../widgets/custom_button.dart';
import '../../widgets/custom_text_field.dart';
import '../../widgets/star_rating_bar.dart';

class TeammateRatingModalScreen extends StatefulWidget {
  final String projectId;
  final String userId;

  const TeammateRatingModalScreen({
    super.key,
    required this.projectId,
    required this.userId,
  });

  @override
  State<TeammateRatingModalScreen> createState() =>
      _TeammateRatingModalScreenState();
}

class _TeammateRatingModalScreenState extends State<TeammateRatingModalScreen> {
  double _communication = 5.0;
  double _technical = 4.0;
  double _teamwork = 5.0;
  double _reliability = 4.0;

  final _feedbackController = TextEditingController(
      text: 'Very helpful teammate. Great technical skills and good communication.');

  @override
  void dispose() {
    _feedbackController.dispose();
    super.dispose();
  }

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
      createdAt: DateTime.now().toIso8601String(),
    );

    workspaceProvider.submitReview(review);

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Quick rating submitted!'),
        backgroundColor: AppColors.success,
      ),
    );

    context.go('/workspace/${widget.projectId}');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black54,
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(20),
            child: Container(
              padding: const EdgeInsets.all(22),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: AppStyles.roundedLg,
                boxShadow: AppStyles.shadowLg,
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Header
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'Rate Teammate',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w700,
                          color: AppColors.textPrimary,
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.close, color: AppColors.textSecondary),
                        onPressed: () => context.pop(),
                      ),
                    ],
                  ),
                  const Divider(),
                  const SizedBox(height: 8),

                  // Candidate micro info
                  Row(
                    children: [
                      Container(
                        width: 40,
                        height: 40,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: AppColors.accentTint,
                          border: Border.all(color: AppColors.borderTint),
                        ),
                        child: const Center(
                          child: Text(
                            'KT',
                            style: TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w700,
                              color: AppColors.primary,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      const Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'K.Thulaanchan',
                            style: TextStyle(
                              fontSize: 15,
                              fontWeight: FontWeight.w700,
                              color: AppColors.textPrimary,
                            ),
                          ),
                          Text(
                            'Software Engineering Student',
                            style: TextStyle(
                              fontSize: 12,
                              color: AppColors.textSecondary,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),

                  const SizedBox(height: 18),

                  StarRatingBar(
                    label: 'Communication',
                    rating: _communication,
                    starSize: 22,
                    onRatingChanged: (val) =>
                        setState(() => _communication = val),
                  ),
                  const SizedBox(height: 12),

                  StarRatingBar(
                    label: 'Technical Skills',
                    rating: _technical,
                    starSize: 22,
                    onRatingChanged: (val) =>
                        setState(() => _technical = val),
                  ),
                  const SizedBox(height: 12),

                  StarRatingBar(
                    label: 'Teamwork',
                    rating: _teamwork,
                    starSize: 22,
                    onRatingChanged: (val) => setState(() => _teamwork = val),
                  ),
                  const SizedBox(height: 12),

                  StarRatingBar(
                    label: 'Reliability',
                    rating: _reliability,
                    starSize: 22,
                    onRatingChanged: (val) =>
                        setState(() => _reliability = val),
                  ),

                  const SizedBox(height: 16),

                  CustomTextField(
                    label: 'Your Review',
                    hint: 'Leave a brief review...',
                    controller: _feedbackController,
                    maxLines: 3,
                  ),

                  const SizedBox(height: 20),

                  CustomButton.gradient(
                    text: 'Submit Review',
                    width: double.infinity,
                    height: 44,
                    onPressed: _handleSubmit,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
