import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../constants/app_colors.dart';
import '../../constants/app_styles.dart';
import '../../models/workspace_model.dart';
import '../../providers/workspace_provider.dart';
import '../../widgets/app_header.dart';
import '../../widgets/bottom_nav_bar.dart';
import '../../widgets/custom_button.dart';

class WorkspaceScreen extends StatefulWidget {
  final String projectId;

  const WorkspaceScreen({super.key, required this.projectId});

  @override
  State<WorkspaceScreen> createState() => _WorkspaceScreenState();
}

class _WorkspaceScreenState extends State<WorkspaceScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final workspaceProvider = context.watch<WorkspaceProvider>();
    final workspace =
        workspaceProvider.getWorkspaceById(widget.projectId) ??
            workspaceProvider.activeWorkspace;

    if (workspace == null) {
      return Scaffold(
        appBar: const AppHeader(title: 'Workspace', showBackButton: true),
        body: const Center(child: Text('Workspace not found')),
      );
    }

    return Scaffold(
      backgroundColor: AppColors.backgroundLight,
      appBar: AppHeader(
        title: workspace.name,
        actions: [
          IconButton(
            icon: const Icon(Icons.chat_bubble_outline, color: Colors.white),
            tooltip: 'Chat',
            onPressed: () => context.go('/messages'),
          ),
        ],
      ),
      bottomNavigationBar: const MobileBottomNavBar(currentIndex: 4),
      body: SafeArea(
        child: Column(
          children: [
            // Project Header Card
            Container(
              padding: const EdgeInsets.all(16),
              color: Colors.white,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Text(
                          workspace.name,
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w700,
                            color: AppColors.textPrimary,
                          ),
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: AppColors.successBg,
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(
                          workspace.status,
                          style: const TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w700,
                            color: AppColors.success,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(
                    workspace.tagline,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppColors.textSecondary,
                    ),
                  ),
                  const SizedBox(height: 12),

                  // Progress Row
                  Row(
                    children: [
                      Expanded(
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(4),
                          child: LinearProgressIndicator(
                            value: workspace.progressPercentage / 100.0,
                            backgroundColor: AppColors.surfaceContainerHigh,
                            valueColor: const AlwaysStoppedAnimation<Color>(
                                AppColors.primary),
                            minHeight: 6,
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Text(
                        '${workspace.progressPercentage}%',
                        style: const TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                          color: AppColors.primary,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),

                  CustomButton.outline(
                    text: 'View Project Milestones & Roadmap →',
                    height: 38,
                    width: double.infinity,
                    onPressed: () {
                      context.push('/workspace/${workspace.id}/progress');
                    },
                  ),
                ],
              ),
            ),

            // Tab bar
            Container(
              color: Colors.white,
              child: TabBar(
                controller: _tabController,
                indicatorColor: AppColors.primary,
                labelColor: AppColors.primary,
                unselectedLabelColor: AppColors.textSecondary,
                labelStyle:
                    const TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
                tabs: const [
                  Tab(text: 'Tasks'),
                  Tab(text: 'Team'),
                  Tab(text: 'Milestones'),
                ],
              ),
            ),
            const Divider(height: 1),

            // Tab Views
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  _buildTasksTab(workspace, workspaceProvider),
                  _buildTeamTab(workspace),
                  _buildMilestonesTab(workspace, workspaceProvider),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Tasks Tab
  Widget _buildTasksTab(
      ProjectWorkspace workspace, WorkspaceProvider provider) {
    if (workspace.tasks.isEmpty) {
      return const Center(child: Text('No active tasks'));
    }

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: workspace.tasks.length,
      itemBuilder: (context, index) {
        final task = workspace.tasks[index];
        return Container(
          margin: const EdgeInsets.only(bottom: 10),
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
          decoration: AppStyles.cardDecoration,
          child: Row(
            children: [
              Checkbox(
                value: task.isDone,
                activeColor: AppColors.primary,
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(4)),
                onChanged: (_) => provider.toggleTask(workspace.id, task.id),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      task.title,
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: task.isDone
                            ? AppColors.textMuted
                            : AppColors.textPrimary,
                        decoration: task.isDone
                            ? TextDecoration.lineThrough
                            : null,
                      ),
                    ),
                    Text(
                      'Assigned to ${task.assignedTo}',
                      style: const TextStyle(
                        fontSize: 11,
                        color: AppColors.textSecondary,
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: task.priority == 'High'
                      ? AppColors.errorBg
                      : AppColors.surfaceContainer,
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(
                  task.priority,
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.w700,
                    color: task.priority == 'High'
                        ? AppColors.error
                        : AppColors.textSecondary,
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  // Team Tab
  Widget _buildTeamTab(ProjectWorkspace workspace) {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: workspace.members.length,
      itemBuilder: (context, index) {
        final member = workspace.members[index];
        final isMe = member.userId == 'user-thusha';

        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(16),
          decoration: AppStyles.cardDecoration,
          child: Row(
            children: [
              Container(
                width: 44,
                height: 44,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppColors.accentTint,
                  border: Border.all(color: AppColors.borderTint),
                ),
                child: Center(
                  child: Text(
                    member.initials,
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
                    Row(
                      children: [
                        Text(
                          member.name,
                          style: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w700,
                            color: AppColors.textPrimary,
                          ),
                        ),
                        if (isMe) ...[
                          const SizedBox(width: 4),
                          const Text(
                            '(You)',
                            style: TextStyle(
                              fontSize: 12,
                              color: AppColors.primary,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ],
                    ),
                    Text(
                      member.role,
                      style: const TextStyle(
                        fontSize: 12,
                        color: AppColors.textSecondary,
                      ),
                    ),
                  ],
                ),
              ),
              if (!isMe)
                PopupMenuButton<String>(
                  icon: const Icon(Icons.more_vert,
                      color: AppColors.textSecondary),
                  onSelected: (val) {
                    if (val == 'review_detailed') {
                      context.push(
                          '/workspace/${workspace.id}/review/${member.userId}');
                    } else if (val == 'review_quick') {
                      context.push(
                          '/workspace/${workspace.id}/rate/${member.userId}');
                    } else if (val == 'profile') {
                      context.push('/candidates/${member.userId}');
                    }
                  },
                  itemBuilder: (context) => [
                    const PopupMenuItem(
                      value: 'review_detailed',
                      child: Row(
                        children: [
                          Icon(Icons.rate_review,
                              size: 18, color: AppColors.primary),
                          SizedBox(width: 8),
                          Text('Rate Teammate (Detailed)',
                              style: TextStyle(fontSize: 13)),
                        ],
                      ),
                    ),
                    const PopupMenuItem(
                      value: 'review_quick',
                      child: Row(
                        children: [
                          Icon(Icons.star_outline,
                              size: 18, color: AppColors.warning),
                          SizedBox(width: 8),
                          Text('Rate Teammate (Quick)',
                              style: TextStyle(fontSize: 13)),
                        ],
                      ),
                    ),
                    const PopupMenuItem(
                      value: 'profile',
                      child: Row(
                        children: [
                          Icon(Icons.person_outline,
                              size: 18, color: AppColors.textSecondary),
                          SizedBox(width: 8),
                          Text('View Profile',
                              style: TextStyle(fontSize: 13)),
                        ],
                      ),
                    ),
                  ],
                ),
            ],
          ),
        );
      },
    );
  }

  // Milestones Tab
  Widget _buildMilestonesTab(
      ProjectWorkspace workspace, WorkspaceProvider provider) {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: workspace.milestones.length,
      itemBuilder: (context, index) {
        final m = workspace.milestones[index];
        return Container(
          margin: const EdgeInsets.only(bottom: 10),
          padding: const EdgeInsets.all(14),
          decoration: AppStyles.cardDecoration,
          child: Row(
            children: [
              Checkbox(
                value: m.isCompleted,
                activeColor: AppColors.primary,
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(4)),
                onChanged: (_) =>
                    provider.toggleMilestone(workspace.id, m.id),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      m.title,
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                        color: m.isCompleted
                            ? AppColors.textMuted
                            : AppColors.textPrimary,
                        decoration:
                            m.isCompleted ? TextDecoration.lineThrough : null,
                      ),
                    ),
                    Text(
                      m.category,
                      style: const TextStyle(
                        fontSize: 11,
                        color: AppColors.textSecondary,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
