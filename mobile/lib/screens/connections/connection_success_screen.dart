import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../constants/app_colors.dart';
import '../../constants/app_styles.dart';
import '../../providers/matching_provider.dart';
import '../../widgets/app_header.dart';
import '../../widgets/custom_button.dart';

class ConnectionSuccessScreen extends StatelessWidget {
  final String candidateId;

  const ConnectionSuccessScreen({super.key, required this.candidateId});

  @override
  Widget build(BuildContext context) {
    final matching = context.watch<MatchingProvider>();
    final candidate = matching.getCandidateById(candidateId);
    final candidateName = candidate?.candidateName ?? 'Candidate';

    return Scaffold(
      backgroundColor: AppColors.backgroundLight,
      appBar: const AppHeader(title: 'Request Sent', showBackButton: true),
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Container(
              padding: const EdgeInsets.all(28),
              decoration: AppStyles.cardDecoration,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Success Icon Circle
                  Container(
                    width: 72,
                    height: 72,
                    decoration: const BoxDecoration(
                      shape: BoxShape.circle,
                      color: AppColors.successBg,
                    ),
                    child: const Icon(
                      Icons.check_circle,
                      size: 48,
                      color: AppColors.success,
                    ),
                  ),
                  const SizedBox(height: 20),
                  const Text(
                    'Connection Request Sent!',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w700,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'We notified $candidateName. Once they accept your invitation, a collaboration workspace and direct chat will unlock.',
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 13,
                      color: AppColors.textSecondary,
                      height: 1.45,
                    ),
                  ),
                  const SizedBox(height: 24),

                  CustomButton.gradient(
                    text: 'View Connection Requests',
                    icon: Icons.swap_horiz,
                    width: double.infinity,
                    height: 46,
                    onPressed: () => context.go('/connections/requests'),
                  ),
                  const SizedBox(height: 10),
                  CustomButton.outline(
                    text: 'Explore More Matches',
                    width: double.infinity,
                    height: 44,
                    onPressed: () => context.go('/matches'),
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
