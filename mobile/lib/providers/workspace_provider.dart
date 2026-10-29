import 'package:flutter/foundation.dart';
import '../models/workspace_model.dart';
import '../models/review_model.dart';
import '../data/mock_data.dart';

class WorkspaceProvider extends ChangeNotifier {
  List<ProjectWorkspace> _workspaces = List.from(MockData.initialWorkspaces);
  String _activeWorkspaceId = 'ai-event-assistant';
  final List<TeammateReview> _reviews = [];

  List<ProjectWorkspace> get workspaces => _workspaces;
  String get activeWorkspaceId => _activeWorkspaceId;
  List<TeammateReview> get reviews => _reviews;

  ProjectWorkspace? get activeWorkspace {
    try {
      return _workspaces.firstWhere((w) => w.id == _activeWorkspaceId);
    } catch (_) {
      return _workspaces.isNotEmpty ? _workspaces.first : null;
    }
  }

  ProjectWorkspace? getWorkspaceById(String id) {
    try {
      return _workspaces.firstWhere((w) => w.id == id);
    } catch (_) {
      return null;
    }
  }

  void setActiveWorkspace(String id) {
    _activeWorkspaceId = id;
    notifyListeners();
  }

  void toggleTask(String workspaceId, String taskId) {
    final wIndex = _workspaces.indexWhere((w) => w.id == workspaceId);
    if (wIndex != -1) {
      final workspace = _workspaces[wIndex];
      final updatedTasks = workspace.tasks.map((t) {
        if (t.id == taskId) {
          return t.copyWith(isDone: !t.isDone);
        }
        return t;
      }).toList();

      _workspaces[wIndex] = workspace.copyWith(tasks: updatedTasks);
      notifyListeners();
    }
  }

  void toggleMilestone(String workspaceId, String milestoneId) {
    final wIndex = _workspaces.indexWhere((w) => w.id == workspaceId);
    if (wIndex != -1) {
      final workspace = _workspaces[wIndex];
      final updatedMilestones = workspace.milestones.map((m) {
        if (m.id == milestoneId) {
          return m.copyWith(
            isCompleted: !m.isCompleted,
            completedAt: !m.isCompleted ? 'Just now' : null,
          );
        }
        return m;
      }).toList();

      final completedCount = updatedMilestones.where((m) => m.isCompleted).length;
      final progress = ((completedCount / updatedMilestones.length) * 100).round();

      _workspaces[wIndex] = workspace.copyWith(
        milestones: updatedMilestones,
        progressPercentage: progress,
      );
      notifyListeners();
    }
  }

  void submitReview(TeammateReview review) {
    _reviews.add(review);
    notifyListeners();
  }

  List<TeammateReview> getReviewsForUser(String userId) {
    return _reviews.where((r) => r.revieweeId == userId).toList();
  }
}
