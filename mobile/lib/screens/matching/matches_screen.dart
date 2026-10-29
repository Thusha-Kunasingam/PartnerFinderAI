import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../constants/app_colors.dart';
import '../../providers/matching_provider.dart';
import '../../widgets/app_header.dart';
import '../../widgets/bottom_nav_bar.dart';
import '../../widgets/candidate_card.dart';

class MatchesScreen extends StatelessWidget {
  const MatchesScreen({super.key});

  final List<String> _filterSkills = const [
    'All',
    'Python',
    'AI',
    'FastAPI',
    'SQL',
    'UI/UX',
    'Flutter',
    'React',
  ];

  @override
  Widget build(BuildContext context) {
    final matching = context.watch<MatchingProvider>();
    final candidates = matching.filteredCandidates;

    return Scaffold(
      backgroundColor: AppColors.backgroundLight,
      appBar: const AppHeader(title: 'Potential Partners'),
      bottomNavigationBar: const MobileBottomNavBar(currentIndex: 1),
      body: SafeArea(
        child: Column(
          children: [
            // Filter Header
            Container(
              color: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Found ${candidates.length} Matches',
                        style: const TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w700,
                          color: AppColors.textPrimary,
                        ),
                      ),
                      TextButton.icon(
                        style: TextButton.styleFrom(padding: EdgeInsets.zero),
                        icon: const Icon(Icons.add, size: 16, color: AppColors.primary),
                        label: const Text(
                          'New Requirement',
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                            color: AppColors.primary,
                          ),
                        ),
                        onPressed: () => context.push('/requirements/new'),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),

                  // Horizontal Skill Chips
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: _filterSkills.map((skill) {
                        final isSelected =
                            matching.selectedSkillFilter == skill;
                        return Padding(
                          padding: const EdgeInsets.only(right: 8),
                          child: ChoiceChip(
                            label: Text(skill),
                            selected: isSelected,
                            selectedColor: AppColors.primary,
                            backgroundColor: AppColors.surfaceContainer,
                            labelStyle: TextStyle(
                              color: isSelected
                                  ? Colors.white
                                  : AppColors.textPrimary,
                              fontWeight: FontWeight.w600,
                              fontSize: 12,
                            ),
                            onSelected: (_) =>
                                matching.setFilterSkill(skill),
                          ),
                        );
                      }).toList(),
                    ),
                  ),
                ],
              ),
            ),

            const Divider(height: 1),

            // Candidate List
            Expanded(
              child: candidates.isEmpty
                  ? Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.person_search,
                              size: 48, color: AppColors.textMuted),
                          const SizedBox(height: 12),
                          const Text(
                            'No candidates match your filter',
                            style: TextStyle(
                              fontSize: 15,
                              fontWeight: FontWeight.w600,
                              color: AppColors.textSecondary,
                            ),
                          ),
                          const SizedBox(height: 8),
                          TextButton(
                            onPressed: () => matching.setFilterSkill('All'),
                            child: const Text('Reset Filter'),
                          ),
                        ],
                      ),
                    )
                  : ListView.builder(
                      padding: const EdgeInsets.all(16),
                      itemCount: candidates.length,
                      itemBuilder: (context, index) {
                        return CandidateCard(candidate: candidates[index]);
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
