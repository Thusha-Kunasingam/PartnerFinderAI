import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../constants/app_colors.dart';
import '../../constants/app_styles.dart';
import '../../models/connection_model.dart';
import '../../providers/connection_provider.dart';
import '../../widgets/app_header.dart';
import '../../widgets/bottom_nav_bar.dart';
import '../../widgets/badge_pill.dart';
import '../../widgets/custom_button.dart';

class ConnectionRequestsScreen extends StatefulWidget {
  const ConnectionRequestsScreen({super.key});

  @override
  State<ConnectionRequestsScreen> createState() =>
      _ConnectionRequestsScreenState();
}

class _ConnectionRequestsScreenState extends State<ConnectionRequestsScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final connProvider = context.watch<ConnectionProvider>();
    final received = connProvider.receivedRequests;
    final sent = connProvider.sentRequests;

    return Scaffold(
      backgroundColor: AppColors.backgroundLight,
      appBar: const AppHeader(title: 'Connections Hub'),
      bottomNavigationBar: const MobileBottomNavBar(currentIndex: 2),
      body: SafeArea(
        child: Column(
          children: [
            Container(
              color: Colors.white,
              child: TabBar(
                controller: _tabController,
                indicatorColor: AppColors.primary,
                labelColor: AppColors.primary,
                unselectedLabelColor: AppColors.textSecondary,
                labelStyle:
                    const TextStyle(fontSize: 14, fontWeight: FontWeight.w700),
                tabs: [
                  Tab(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text('Received'),
                        const SizedBox(width: 6),
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(
                            color: AppColors.accentTint,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Text(
                            '${received.length}',
                            style: const TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w700,
                              color: AppColors.primary,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Tab(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text('Sent'),
                        const SizedBox(width: 6),
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(
                            color: AppColors.surfaceContainer,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Text(
                            '${sent.length}',
                            style: const TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w700,
                              color: AppColors.textSecondary,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const Divider(height: 1),

            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  _buildRequestList(received, isReceived: true),
                  _buildRequestList(sent, isReceived: false),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRequestList(List<ConnectionRequest> list,
      {required bool isReceived}) {
    if (list.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.inbox_outlined,
                size: 48, color: AppColors.textMuted),
            const SizedBox(height: 12),
            Text(
              isReceived
                  ? 'No connection requests received'
                  : 'No requests sent yet',
              style: const TextStyle(
                fontSize: 14,
                color: AppColors.textSecondary,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      );
    }

    final connProvider = context.read<ConnectionProvider>();

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: list.length,
      itemBuilder: (context, index) {
        final req = list[index];
        final name = isReceived ? req.senderName : 'To: Partner';
        final initials = isReceived ? req.senderInitials : 'PT';

        return Container(
          margin: const EdgeInsets.only(bottom: 14),
          padding: const EdgeInsets.all(16),
          decoration: AppStyles.cardDecoration,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
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
                    child: Center(
                      child: Text(
                        initials,
                        style: const TextStyle(
                          fontSize: 14,
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
                          name,
                          style: const TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w700,
                            color: AppColors.textPrimary,
                          ),
                        ),
                        Text(
                          'Project: ${req.projectName}',
                          style: const TextStyle(
                            fontSize: 12,
                            color: AppColors.textSecondary,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: req.status == 'accepted'
                          ? AppColors.successBg
                          : AppColors.warningBg,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      req.status.toUpperCase(),
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.w700,
                        color: req.status == 'accepted'
                            ? AppColors.success
                            : AppColors.warning,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),

              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: AppColors.surfaceContainerLow,
                  borderRadius: AppStyles.roundedSm,
                ),
                child: Text(
                  '"${req.message}"',
                  style: const TextStyle(
                    fontSize: 12,
                    fontStyle: FontStyle.italic,
                    color: AppColors.textSecondary,
                    height: 1.4,
                  ),
                ),
              ),

              const SizedBox(height: 12),

              Wrap(
                spacing: 6,
                children: req.skillsNeeded
                    .map((s) => BadgePill.skill(s))
                    .toList(),
              ),

              if (isReceived && req.status == 'pending') ...[
                const SizedBox(height: 14),
                Row(
                  children: [
                    Expanded(
                      child: CustomButton.gradient(
                        text: 'Accept Invitation',
                        height: 38,
                        onPressed: () => connProvider.acceptRequest(req.id),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: CustomButton.outline(
                        text: 'Decline',
                        height: 38,
                        onPressed: () => connProvider.rejectRequest(req.id),
                      ),
                    ),
                  ],
                ),
              ] else if (req.status == 'accepted') ...[
                const SizedBox(height: 14),
                CustomButton.primary(
                  text: 'Open Chat',
                  icon: Icons.chat_bubble_outline,
                  height: 38,
                  onPressed: () => context.go('/messages'),
                ),
              ],
            ],
          ),
        );
      },
    );
  }
}
