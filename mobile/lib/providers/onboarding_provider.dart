import 'package:flutter/foundation.dart';
import '../models/user_model.dart';

class OnboardingProvider extends ChangeNotifier {
  int _currentStep = 1; // 1 to 4
  String _title = 'Full Stack Developer';
  String _university = 'University of Moratuwa';
  String _major = 'Computer Science & Engineering';
  String _yearOfStudy = 'Senior (Year 4)';
  String _location = 'Colombo, Sri Lanka';
  String _bio = 'Full stack developer passionate about AI and distributed web applications.';

  List<SkillProficiency> _skillsOffered = [
    SkillProficiency(skillName: 'Angular', level: 'Advanced'),
    SkillProficiency(skillName: 'C#', level: 'Advanced'),
    SkillProficiency(skillName: 'SQL', level: 'Intermediate'),
    SkillProficiency(skillName: 'React', level: 'Intermediate'),
  ];

  List<String> _skillsToLearn = ['Python', 'Machine Learning', 'Flutter', 'AI Integration'];
  String _preferredPartnerType = 'project_partner';
  bool _isCompleted = false;

  int get currentStep => _currentStep;
  String get title => _title;
  String get university => _university;
  String get major => _major;
  String get yearOfStudy => _yearOfStudy;
  String get location => _location;
  String get bio => _bio;
  List<SkillProficiency> get skillsOffered => _skillsOffered;
  List<String> get skillsToLearn => _skillsToLearn;
  String get preferredPartnerType => _preferredPartnerType;
  bool get isCompleted => _isCompleted;

  void setStep(int step) {
    _currentStep = step.clamp(1, 4);
    notifyListeners();
  }

  void updateProfileData({
    String? title,
    String? university,
    String? major,
    String? yearOfStudy,
    String? location,
    String? bio,
  }) {
    if (title != null) _title = title;
    if (university != null) _university = university;
    if (major != null) _major = major;
    if (yearOfStudy != null) _yearOfStudy = yearOfStudy;
    if (location != null) _location = location;
    if (bio != null) _bio = bio;
    notifyListeners();
  }

  void addSkillOffered(String skillName, String level) {
    if (!_skillsOffered.any((s) => s.skillName.toLowerCase() == skillName.toLowerCase())) {
      _skillsOffered.add(SkillProficiency(skillName: skillName, level: level));
      notifyListeners();
    }
  }

  void removeSkillOffered(String skillName) {
    _skillsOffered.removeWhere((s) => s.skillName.toLowerCase() == skillName.toLowerCase());
    notifyListeners();
  }

  void toggleSkillToLearn(String skill) {
    if (_skillsToLearn.contains(skill)) {
      _skillsToLearn.remove(skill);
    } else {
      _skillsToLearn.add(skill);
    }
    notifyListeners();
  }

  void setPreferredPartnerType(String type) {
    _preferredPartnerType = type;
    notifyListeners();
  }

  void completeOnboarding() {
    _isCompleted = true;
    notifyListeners();
  }
}
