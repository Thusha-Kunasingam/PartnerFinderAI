import 'package:flutter/foundation.dart';
import '../models/user_model.dart';
import '../data/mock_data.dart';

class AuthProvider extends ChangeNotifier {
  UserProfile? _currentUser = MockData.initialCurrentUser;
  bool _isAuthenticated = true;

  UserProfile? get currentUser => _currentUser;
  bool get isAuthenticated => _isAuthenticated;

  void login(String email, String password) {
    _currentUser = MockData.initialCurrentUser;
    _isAuthenticated = true;
    notifyListeners();
  }

  void register({
    required String fullName,
    required String email,
    required String password,
  }) {
    final initials = fullName
        .trim()
        .split(' ')
        .map((e) => e.isNotEmpty ? e[0].toUpperCase() : '')
        .take(2)
        .join();

    _currentUser = UserProfile(
      id: 'user-${DateTime.now().millisecondsSinceEpoch}',
      fullName: fullName,
      email: email,
      initials: initials.isNotEmpty ? initials : 'PF',
      university: '',
      major: '',
      yearOfStudy: '',
      location: '',
      bio: '',
      skillsOffered: [],
      skillsToLearn: [],
      preferredPartnerType: 'project_partner',
      createdAt: DateTime.now().toIso8601String(),
    );
    _isAuthenticated = true;
    notifyListeners();
  }

  void logout() {
    _currentUser = null;
    _isAuthenticated = false;
    notifyListeners();
  }

  void updateProfile(UserProfile updated) {
    _currentUser = updated;
    notifyListeners();
  }
}
