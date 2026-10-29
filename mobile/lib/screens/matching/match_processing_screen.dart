import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../constants/app_colors.dart';
import '../../constants/app_styles.dart';
import '../../providers/matching_provider.dart';

class MatchProcessingScreen extends StatefulWidget {
  const MatchProcessingScreen({super.key});

  @override
  State<MatchProcessingScreen> createState() => _MatchProcessingScreenState();
}

class _MatchProcessingScreenState extends State<MatchProcessingScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _animController;

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: true);

    // Trigger AI match processing simulation
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final matching = context.read<MatchingProvider>();
      matching.startProcessing(() {
        if (mounted) {
          context.go('/matches');
        }
      });
    });
  }

  @override
  void dispose() {
    _animController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final matching = context.watch<MatchingProvider>();
    final progress = matching.processingProgress;

    return Scaffold(
      backgroundColor: AppColors.backgroundLight,
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
                  // Glowing Animated Orb
                  ScaleTransition(
                    scale: Tween<double>(begin: 0.9, end: 1.1)
                        .animate(CurvedAnimation(
                      parent: _animController,
                      curve: Curves.easeInOut,
                    )),
                    child: Container(
                      width: 90,
                      height: 90,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        gradient: AppColors.primaryGradient,
                        boxShadow: AppStyles.shadowGlowPurple,
                      ),
                      child: const Icon(
                        Icons.auto_awesome,
                        size: 44,
                        color: Colors.white,
                      ),
                    ),
                  ),

                  const SizedBox(height: 24),

                  const Text(
                    'Analyzing Teammate Compatibility...',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w700,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 6),
                  const Text(
                    'Comparing candidate profiles across skills, schedules, and past project ratings.',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 13,
                      color: AppColors.textSecondary,
                    ),
                  ),

                  const SizedBox(height: 28),

                  // Checklist
                  _buildChecklistItem(
                    'Parsing technical requirements & stack',
                    progress >= 0.25,
                  ),
                  _buildChecklistItem(
                    'Evaluating schedule & weekend availability',
                    progress >= 0.50,
                  ),
                  _buildChecklistItem(
                    'Calculating 4-factor dimensional vectors',
                    progress >= 0.75,
                  ),
                  _buildChecklistItem(
                    'Ranking candidates by holistic match score',
                    progress >= 1.0,
                  ),

                  const SizedBox(height: 28),

                  // Progress Bar & Percentage
                  ClipRRect(
                    borderRadius: BorderRadius.circular(6),
                    child: LinearProgressIndicator(
                      value: progress,
                      backgroundColor: AppColors.surfaceContainerHigh,
                      valueColor: const AlwaysStoppedAnimation<Color>(
                          AppColors.primary),
                      minHeight: 8,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    '${(progress * 100).round()}% Completed',
                    style: const TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w700,
                      color: AppColors.primary,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildChecklistItem(String title, bool isDone) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        children: [
          Container(
            width: 22,
            height: 22,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: isDone ? AppColors.success : AppColors.surfaceContainerHigh,
            ),
            child: Icon(
              isDone ? Icons.check : Icons.hourglass_top,
              color: isDone ? Colors.white : AppColors.textMuted,
              size: 14,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              title,
              style: TextStyle(
                fontSize: 13,
                fontWeight: isDone ? FontWeight.w600 : FontWeight.w400,
                color:
                    isDone ? AppColors.textPrimary : AppColors.textSecondary,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
