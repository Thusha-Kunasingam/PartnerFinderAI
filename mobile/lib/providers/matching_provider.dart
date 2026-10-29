import 'package:flutter/foundation.dart';
import '../models/requirement_model.dart';
import '../models/candidate_model.dart';
import '../data/mock_data.dart';

class MatchingProvider extends ChangeNotifier {
  ProjectRequirement? _currentRequirement;
  List<CandidateMatch> _candidates = List.from(MockData.initialCandidates);
  bool _isProcessing = false;
  double _processingProgress = 0.0;
  String _selectedSkillFilter = 'All';
  int _minScoreFilter = 0;

  ProjectRequirement? get currentRequirement => _currentRequirement;
  List<CandidateMatch> get candidates => _candidates;
  bool get isProcessing => _isProcessing;
  double get processingProgress => _processingProgress;
  String get selectedSkillFilter => _selectedSkillFilter;
  int get minScoreFilter => _minScoreFilter;

  List<CandidateMatch> get filteredCandidates {
    return _candidates.where((c) {
      if (c.matchScore < _minScoreFilter) return false;
      if (_selectedSkillFilter != 'All' &&
          !c.matchingTechStack
              .any((s) => s.toLowerCase() == _selectedSkillFilter.toLowerCase())) {
        return false;
      }
      return true;
    }).toList();
  }

  CandidateMatch? getCandidateById(String id) {
    try {
      return _candidates.firstWhere((c) => c.candidateId == id);
    } catch (_) {
      return null;
    }
  }

  void setFilterSkill(String skill) {
    _selectedSkillFilter = skill;
    notifyListeners();
  }

  void setMinScoreFilter(int score) {
    _minScoreFilter = score;
    notifyListeners();
  }

  void toggleBookmark(String candidateId) {
    final index = _candidates.indexWhere((c) => c.candidateId == candidateId);
    if (index != -1) {
      final current = _candidates[index];
      _candidates[index] = current.copyWith(isBookmarked: !current.isBookmarked);
      notifyListeners();
    }
  }

  void setRequirement(ProjectRequirement requirement) {
    _currentRequirement = requirement;
    notifyListeners();
  }

  void startProcessing(VoidCallback onComplete) async {
    _isProcessing = true;
    _processingProgress = 0.0;
    notifyListeners();

    // Smooth matching progress simulation
    for (int i = 1; i <= 10; i++) {
      await Future.delayed(const Duration(milliseconds: 250));
      _processingProgress = i / 10.0;
      notifyListeners();
    }

    _isProcessing = false;
    notifyListeners();
    onComplete();
  }
}
