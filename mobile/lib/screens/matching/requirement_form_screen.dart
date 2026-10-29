import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../constants/app_colors.dart';
import '../../constants/app_styles.dart';
import '../../models/requirement_model.dart';
import '../../providers/matching_provider.dart';
import '../../widgets/app_header.dart';
import '../../widgets/custom_button.dart';
import '../../widgets/custom_text_field.dart';

class RequirementFormScreen extends StatefulWidget {
  const RequirementFormScreen({super.key});

  @override
  State<RequirementFormScreen> createState() => _RequirementFormScreenState();
}

class _RequirementFormScreenState extends State<RequirementFormScreen> {
  final _headlineController =
      TextEditingController(text: 'AI Event Assistant');
  final _roleController =
      TextEditingController(text: 'Backend & AI Developer');
  final _descController = TextEditingController(
      text:
          'Building an AI-driven attendee matching system with LangChain, FastAPI, and vector embeddings.');
  final _skillInputController = TextEditingController();

  String _experienceLevel = 'Intermediate (2 - 4 years)';
  int _weeklyHours = 15;
  String _projectDuration = '6 Weeks (Full V1 Build)';
  String _locationPreference = 'Remote';

  final List<String> _skills = ['Python', 'FastAPI', 'AI', 'SQL'];
  final List<String> _selectedDays = ['Sat', 'Sun'];

  final List<String> _allDays = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
  ];

  @override
  void dispose() {
    _headlineController.dispose();
    _roleController.dispose();
    _descController.dispose();
    _skillInputController.dispose();
    super.dispose();
  }

  void _handleSubmit() {
    final provider = context.read<MatchingProvider>();

    final requirement = ProjectRequirement(
      id: 'req-${DateTime.now().millisecondsSinceEpoch}',
      creatorId: 'user-thusha',
      projectHeadline: _headlineController.text.trim(),
      requiredRole: _roleController.text.trim(),
      experienceLevel: _experienceLevel,
      requiredSkills: _skills,
      weeklyHoursCommitment: _weeklyHours,
      availabilityDays: _selectedDays,
      projectDuration: _projectDuration,
      locationPreference: _locationPreference,
      projectDescription: _descController.text.trim(),
      createdAt: DateTime.now().toIso8601String(),
    );

    provider.setRequirement(requirement);
    context.push('/matching/processing');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundLight,
      appBar: const AppHeader(title: 'Project Requirements', showBackButton: true),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Container(
            padding: const EdgeInsets.all(20),
            decoration: AppStyles.cardDecoration,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Post Partner Requirements',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w700,
                    color: AppColors.textPrimary,
                  ),
                ),
                const SizedBox(height: 4),
                const Text(
                  'Define technical criteria and schedule to let our AI identify the ideal match.',
                  style: TextStyle(fontSize: 13, color: AppColors.textSecondary),
                ),
                const SizedBox(height: 20),

                CustomTextField(
                  label: 'Project Title / Headline',
                  hint: 'e.g. AI Event Assistant',
                  controller: _headlineController,
                ),
                const SizedBox(height: 14),

                CustomTextField(
                  label: 'Role Needed',
                  hint: 'e.g. Backend & AI Developer',
                  controller: _roleController,
                ),
                const SizedBox(height: 14),

                // Skills Needed
                const Text(
                  'Required Skills & Tech Stack',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: AppColors.textPrimary,
                  ),
                ),
                const SizedBox(height: 6),
                Row(
                  children: [
                    Expanded(
                      child: CustomTextField(
                        hint: 'Type a skill and tap add',
                        controller: _skillInputController,
                      ),
                    ),
                    const SizedBox(width: 8),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primary,
                        shape: RoundedRectangleBorder(
                            borderRadius: AppStyles.roundedMd),
                      ),
                      onPressed: () {
                        final val = _skillInputController.text.trim();
                        if (val.isNotEmpty && !_skills.contains(val)) {
                          setState(() => _skills.add(val));
                          _skillInputController.clear();
                        }
                      },
                      child: const Text('Add'),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                Wrap(
                  spacing: 6,
                  runSpacing: 6,
                  children: _skills.map((skill) {
                    return Chip(
                      backgroundColor: AppColors.accentTint,
                      label: Text(
                        skill,
                        style: const TextStyle(
                            color: AppColors.primary,
                            fontSize: 12,
                            fontWeight: FontWeight.w600),
                      ),
                      deleteIcon: const Icon(Icons.close,
                          size: 14, color: AppColors.primary),
                      onDeleted: () => setState(() => _skills.remove(skill)),
                    );
                  }).toList(),
                ),

                const SizedBox(height: 16),

                // Experience Level Dropdown
                const Text(
                  'Experience Level',
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
                      value: _experienceLevel,
                      isExpanded: true,
                      items: [
                        'Entry Level (0 - 1 year)',
                        'Intermediate (2 - 4 years)',
                        'Senior (5+ years)',
                        'Lead / Architect',
                      ]
                          .map((lvl) => DropdownMenuItem(
                                value: lvl,
                                child: Text(lvl,
                                    style: const TextStyle(fontSize: 13)),
                              ))
                          .toList(),
                      onChanged: (val) {
                        if (val != null) setState(() => _experienceLevel = val);
                      },
                    ),
                  ),
                ),

                const SizedBox(height: 16),

                // Weekly Hours Slider
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'Weekly Time Commitment',
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                        color: AppColors.textPrimary,
                      ),
                    ),
                    Text(
                      '$_weeklyHours hrs / week',
                      style: const TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                        color: AppColors.primary,
                      ),
                    ),
                  ],
                ),
                Slider(
                  value: _weeklyHours.toDouble(),
                  min: 5,
                  max: 40,
                  divisions: 7,
                  activeColor: AppColors.primary,
                  inactiveColor: AppColors.surfaceContainerHigh,
                  onChanged: (val) => setState(() => _weeklyHours = val.round()),
                ),

                const SizedBox(height: 12),

                // Preferred Days
                const Text(
                  'Availability Days',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: AppColors.textPrimary,
                  ),
                ),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 6,
                  children: _allDays.map((day) {
                    final isSel = _selectedDays.contains(day);
                    return ChoiceChip(
                      label: Text(day),
                      selected: isSel,
                      selectedColor: AppColors.primary,
                      labelStyle: TextStyle(
                        color: isSel ? Colors.white : AppColors.textPrimary,
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                      ),
                      onSelected: (selected) {
                        setState(() {
                          if (selected) {
                            _selectedDays.add(day);
                          } else {
                            _selectedDays.remove(day);
                          }
                        });
                      },
                    );
                  }).toList(),
                ),

                const SizedBox(height: 16),

                CustomTextField(
                  label: 'Project Overview',
                  hint: 'Describe project goals, deliverables, and architecture...',
                  controller: _descController,
                  maxLines: 4,
                ),

                const SizedBox(height: 24),

                CustomButton.gradient(
                  text: 'Find Matching Partners',
                  icon: Icons.auto_awesome,
                  width: double.infinity,
                  height: 48,
                  onPressed: _handleSubmit,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
