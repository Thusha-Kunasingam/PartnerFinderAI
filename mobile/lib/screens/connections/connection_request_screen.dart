import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../constants/app_colors.dart';
import '../../constants/app_styles.dart';
import '../../providers/matching_provider.dart';
import '../../providers/connection_provider.dart';
import '../../widgets/app_header.dart';
import '../../widgets/badge_pill.dart';
import '../../widgets/custom_button.dart';
import '../../widgets/custom_text_field.dart';

class ConnectionRequestScreen extends StatefulWidget {
  final String candidateId;

  const ConnectionRequestScreen({super.key, required this.candidateId});

  @override
  State<ConnectionRequestScreen> createState() =>
      _ConnectionRequestScreenState();
}

class _ConnectionRequestScreenState extends State<ConnectionRequestScreen> {
  final _messageController = TextEditingController();
  String _selectedProject = 'AI Event Assistant';

  @override
  void initState() {
    super.initState();
    final matching = context.read<MatchingProvider>();
    final candidate = matching.getCandidateById(widget.candidateId);
    final candidateName = candidate?.candidateName ?? 'Candidate';

    _messageController.text =
        'Hi $candidateName, I saw your profile and impressive skills. I am building $_selectedProject and would love to collaborate together on this sprint!';
  }

  @override
  void dispose() {
    _messageController.dispose();
    super.dispose();
  }

  void _handleSend() {
    final matching = context.read<MatchingProvider>();
    final candidate = matching.getCandidateById(widget.candidateId);
    if (candidate == null) return;

    final connProvider = context.read<ConnectionProvider>();
    connProvider.sendConnectionRequest(
      recipientId: candidate.candidateId,
      projectId: 'ai-event-assistant',
      projectName: _selectedProject,
      projectDuration: '6 Weeks',
      skillsNeeded: candidate.matchingTechStack,
      message: _messageController.text.trim(),
    );

    context.go('/connections/success/${candidate.candidateId}');
  }

  @override
  Widget build(BuildContext context) {
    final matching = context.watch<MatchingProvider>();
    final candidate = matching.getCandidateById(widget.candidateId);

    if (candidate == null) {
      return Scaffold(
        appBar: const AppHeader(title: 'Connect', showBackButton: true),
        body: const Center(child: Text('Candidate not found')),
      );
    }

    return Scaffold(
      backgroundColor: AppColors.backgroundLight,
      appBar: const AppHeader(title: 'Send Invitation', showBackButton: true),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Container(
            padding: const EdgeInsets.all(20),
            decoration: AppStyles.cardDecoration,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Candidate Micro Card
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
                        child: Center(
                          child: Text(
                            candidate.initials,
                            style: const TextStyle(
                              fontSize: 15,
                              fontWeight: FontWeight.w700,
                              color: AppColors.primary,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              candidate.candidateName,
                              style: const TextStyle(
                                fontSize: 15,
                                fontWeight: FontWeight.w700,
                                color: AppColors.textPrimary,
                              ),
                            ),
                            Text(
                              candidate.title,
                              style: const TextStyle(
                                fontSize: 12,
                                color: AppColors.textSecondary,
                              ),
                            ),
                          ],
                        ),
                      ),
                      BadgePill.matchScore(candidate.matchScore),
                    ],
                  ),
                ),

                const SizedBox(height: 20),

                // Target Project Selector
                const Text(
                  'Attach to Project',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: AppColors.textPrimary,
                  ),
                ),
                const SizedBox(height: 6),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    border: Border.all(color: AppColors.border),
                    borderRadius: AppStyles.roundedMd,
                  ),
                  child: DropdownButtonHideUnderline(
                    child: DropdownButton<String>(
                      value: _selectedProject,
                      isExpanded: true,
                      items: [
                        'AI Event Assistant',
                        'Student Management System',
                      ]
                          .map((p) => DropdownMenuItem(
                                value: p,
                                child:
                                    Text(p, style: const TextStyle(fontSize: 13)),
                              ))
                          .toList(),
                      onChanged: (val) {
                        if (val != null) {
                          setState(() => _selectedProject = val);
                        }
                      },
                    ),
                  ),
                ),

                const SizedBox(height: 16),

                // Invitation Message
                CustomTextField(
                  label: 'Personalized Message',
                  hint: 'Write a note explaining why you want to collaborate...',
                  controller: _messageController,
                  maxLines: 5,
                ),

                const SizedBox(height: 24),

                CustomButton.gradient(
                  text: 'Send Connection Request',
                  icon: Icons.send,
                  height: 48,
                  onPressed: _handleSend,
                ),
                const SizedBox(height: 10),
                CustomButton.outline(
                  text: 'Cancel',
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
