import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../constants/app_colors.dart';
import '../../constants/app_styles.dart';
import '../../models/user_model.dart';
import '../../providers/onboarding_provider.dart';
import '../../widgets/custom_button.dart';
import '../../widgets/custom_text_field.dart';

class OnboardingScreen extends StatefulWidget {
  final int initialStep;

  const OnboardingScreen({super.key, this.initialStep = 1});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  late int _step;
  final _titleController = TextEditingController(text: 'Full Stack Developer');
  final _universityController =
      TextEditingController(text: 'University of Moratuwa');
  final _majorController =
      TextEditingController(text: 'Computer Science & Engineering');
  final _locationController = TextEditingController(text: 'Colombo, Sri Lanka');
  final _bioController = TextEditingController(
      text:
          'Passionate about full-stack web architectures, AI tooling, and enterprise SaaS.');

  final _newSkillController = TextEditingController();
  String _selectedLevel = 'Advanced';

  final List<String> _suggestedLearnSkills = [
    'Python',
    'Machine Learning',
    'Flutter',
    'AI Integration',
    'Kubernetes',
    'FastAPI',
    'Figma',
    'Rust',
    'TypeScript',
  ];

  final List<Map<String, dynamic>> _partnerTypes = [
    {
      'id': 'project_partner',
      'title': 'Project Partner',
      'desc': 'Build an MVP or prototype together with complementary skills.',
      'icon': Icons.rocket_launch,
    },
    {
      'id': 'hackathon_team',
      'title': 'Hackathon Team',
      'desc': 'Compete in fast-paced weekend coding competitions.',
      'icon': Icons.military_tech,
    },
    {
      'id': 'skill_exchange',
      'title': 'Skill Exchange',
      'desc': 'Teach what you know and learn new stacks from a peer.',
      'icon': Icons.sync_alt,
    },
    {
      'id': 'startup_partner',
      'title': 'Startup Co-Founder',
      'desc': 'Collaborate on long-term commercial software ventures.',
      'icon': Icons.business_center,
    },
  ];

  @override
  void initState() {
    super.initState();
    _step = widget.initialStep;
  }

  @override
  void dispose() {
    _titleController.dispose();
    _universityController.dispose();
    _majorController.dispose();
    _locationController.dispose();
    _bioController.dispose();
    _newSkillController.dispose();
    super.dispose();
  }

  void _nextStep() {
    if (_step < 4) {
      setState(() => _step++);
    } else {
      // Completed!
      final provider = context.read<OnboardingProvider>();
      provider.completeOnboarding();
      context.go('/dashboard');
    }
  }

  void _prevStep() {
    if (_step > 1) {
      setState(() => _step--);
    } else {
      context.go('/login');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundLight,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppColors.textPrimary),
          onPressed: _prevStep,
        ),
        title: Text(
          'Step $_step of 4',
          style: const TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w600,
            color: AppColors.textSecondary,
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => context.go('/dashboard'),
            child: const Text(
              'Skip',
              style: TextStyle(
                color: AppColors.textMuted,
                fontWeight: FontWeight.w600,
                fontSize: 14,
              ),
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Progress Bar
            LinearProgressIndicator(
              value: _step / 4.0,
              backgroundColor: AppColors.border,
              valueColor:
                  const AlwaysStoppedAnimation<Color>(AppColors.primary),
              minHeight: 4,
            ),

            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(20),
                child: Container(
                  padding: const EdgeInsets.all(20),
                  decoration: AppStyles.cardDecoration,
                  child: _buildStepContent(),
                ),
              ),
            ),

            // Bottom Buttons
            Container(
              padding: const EdgeInsets.all(16),
              decoration: const BoxDecoration(
                color: Colors.white,
                border:
                    Border(top: BorderSide(color: AppColors.border, width: 1)),
              ),
              child: Row(
                children: [
                  if (_step > 1) ...[
                    Expanded(
                      flex: 1,
                      child: CustomButton.outline(
                        text: 'Back',
                        onPressed: _prevStep,
                      ),
                    ),
                    const SizedBox(width: 12),
                  ],
                  Expanded(
                    flex: 2,
                    child: CustomButton.gradient(
                      text: _step == 4 ? 'Complete Setup' : 'Continue',
                      onPressed: _nextStep,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStepContent() {
    switch (_step) {
      case 1:
        return _buildStep1Profile();
      case 2:
        return _buildStep2Skills();
      case 3:
        return _buildStep3Learn();
      case 4:
        return _buildStep4PartnerType();
      default:
        return _buildStep1Profile();
    }
  }

  // Step 1: Profile Information
  Widget _buildStep1Profile() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Personal Profile',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w700,
            color: AppColors.textPrimary,
          ),
        ),
        const SizedBox(height: 4),
        const Text(
          'Help prospective teammates get to know your background and focus.',
          style: TextStyle(fontSize: 13, color: AppColors.textSecondary),
        ),
        const SizedBox(height: 20),
        CustomTextField(
          label: 'Primary Role / Headline',
          hint: 'e.g. Full Stack Developer',
          controller: _titleController,
        ),
        const SizedBox(height: 14),
        CustomTextField(
          label: 'University / Institute',
          hint: 'e.g. University of Moratuwa',
          controller: _universityController,
        ),
        const SizedBox(height: 14),
        CustomTextField(
          label: 'Major / Field of Study',
          hint: 'e.g. Computer Science',
          controller: _majorController,
        ),
        const SizedBox(height: 14),
        CustomTextField(
          label: 'Location / Timezone',
          hint: 'e.g. Colombo, Sri Lanka',
          controller: _locationController,
        ),
        const SizedBox(height: 14),
        CustomTextField(
          label: 'Short Bio',
          hint: 'Tell others about your interests and past projects...',
          controller: _bioController,
          maxLines: 3,
        ),
      ],
    );
  }

  // Step 2: Add Skills
  Widget _buildStep2Skills() {
    final provider = context.watch<OnboardingProvider>();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Skills You Offer',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w700,
            color: AppColors.textPrimary,
          ),
        ),
        const SizedBox(height: 4),
        const Text(
          'Add technologies and frameworks you are proficient in.',
          style: TextStyle(fontSize: 13, color: AppColors.textSecondary),
        ),
        const SizedBox(height: 20),

        // Add skill input
        Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Expanded(
              flex: 2,
              child: CustomTextField(
                label: 'Skill Name',
                hint: 'e.g. Flutter',
                controller: _newSkillController,
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              flex: 2,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Level',
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Container(
                    height: 48,
                    padding: const EdgeInsets.symmetric(horizontal: 12),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      border: Border.all(color: AppColors.border),
                      borderRadius: AppStyles.roundedMd,
                    ),
                    child: DropdownButtonHideUnderline(
                      child: DropdownButton<String>(
                        value: _selectedLevel,
                        isExpanded: true,
                        items: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
                            .map((lvl) => DropdownMenuItem(
                                  value: lvl,
                                  child: Text(lvl,
                                      style: const TextStyle(fontSize: 13)),
                                ))
                            .toList(),
                        onChanged: (val) {
                          if (val != null) setState(() => _selectedLevel = val);
                        },
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(width: 8),
            Container(
              height: 48,
              margin: const EdgeInsets.only(bottom: 1),
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  padding: const EdgeInsets.symmetric(horizontal: 14),
                  shape: RoundedRectangleBorder(
                      borderRadius: AppStyles.roundedMd),
                ),
                onPressed: () {
                  final text = _newSkillController.text.trim();
                  if (text.isNotEmpty) {
                    provider.addSkillOffered(text, _selectedLevel);
                    _newSkillController.clear();
                  }
                },
                child: const Icon(Icons.add, color: Colors.white),
              ),
            ),
          ],
        ),

        const SizedBox(height: 20),
        const Text(
          'Your Current Stack:',
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w600,
            color: AppColors.textPrimary,
          ),
        ),
        const SizedBox(height: 10),

        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: provider.skillsOffered.map((skill) {
            return Chip(
              backgroundColor: AppColors.accentTint,
              side: const BorderSide(color: AppColors.borderTint),
              label: Text(
                '${skill.skillName} • ${skill.level}',
                style: const TextStyle(
                  color: AppColors.primary,
                  fontWeight: FontWeight.w600,
                  fontSize: 12,
                ),
              ),
              deleteIcon:
                  const Icon(Icons.close, size: 16, color: AppColors.primary),
              onDeleted: () => provider.removeSkillOffered(skill.skillName),
            );
          }).toList(),
        ),
      ],
    );
  }

  // Step 3: Skills to Learn
  Widget _buildStep3Learn() {
    final provider = context.watch<OnboardingProvider>();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Skills You Want to Learn',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w700,
            color: AppColors.textPrimary,
          ),
        ),
        const SizedBox(height: 4),
        const Text(
          'Our AI matches you with partners who know what you want to learn.',
          style: TextStyle(fontSize: 13, color: AppColors.textSecondary),
        ),
        const SizedBox(height: 20),

        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: _suggestedLearnSkills.map((skill) {
            final isSelected = provider.skillsToLearn.contains(skill);
            return FilterChip(
              label: Text(skill),
              selected: isSelected,
              selectedColor: AppColors.primary,
              backgroundColor: AppColors.surfaceContainer,
              labelStyle: TextStyle(
                color: isSelected ? Colors.white : AppColors.textPrimary,
                fontWeight: FontWeight.w600,
                fontSize: 13,
              ),
              onSelected: (_) => provider.toggleSkillToLearn(skill),
            );
          }).toList(),
        ),
      ],
    );
  }

  // Step 4: Choose Partner Type
  Widget _buildStep4PartnerType() {
    final provider = context.watch<OnboardingProvider>();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Preferred Collaboration Type',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w700,
            color: AppColors.textPrimary,
          ),
        ),
        const SizedBox(height: 4),
        const Text(
          'Select your primary goal on PartnerFinder AI.',
          style: TextStyle(fontSize: 13, color: AppColors.textSecondary),
        ),
        const SizedBox(height: 18),

        ..._partnerTypes.map((type) {
          final isSelected = provider.preferredPartnerType == type['id'];
          return GestureDetector(
            onTap: () => provider.setPreferredPartnerType(type['id']),
            child: Container(
              margin: const EdgeInsets.only(bottom: 12),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: isSelected ? AppColors.accentTint : Colors.white,
                borderRadius: AppStyles.roundedMd,
                border: Border.all(
                  color: isSelected ? AppColors.primary : AppColors.border,
                  width: isSelected ? 2 : 1,
                ),
              ),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: isSelected
                          ? AppColors.primary
                          : AppColors.surfaceContainer,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Icon(
                      type['icon'] as IconData,
                      color: isSelected ? Colors.white : AppColors.primary,
                      size: 22,
                    ),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          type['title'] as String,
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w700,
                            color: isSelected
                                ? AppColors.primary
                                : AppColors.textPrimary,
                          ),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          type['desc'] as String,
                          style: const TextStyle(
                            fontSize: 12,
                            color: AppColors.textSecondary,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          );
        }),
      ],
    );
  }
}
