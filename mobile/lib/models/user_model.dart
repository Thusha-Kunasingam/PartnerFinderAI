class SkillProficiency {
  final String skillName;
  final String level; // 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'

  SkillProficiency({
    required this.skillName,
    required this.level,
  });

  Map<String, dynamic> toJson() => {
        'skillName': skillName,
        'level': level,
      };

  factory SkillProficiency.fromJson(Map<String, dynamic> json) =>
      SkillProficiency(
        skillName: json['skillName'] ?? '',
        level: json['level'] ?? 'Intermediate',
      );
}

class UserProfile {
  final String id;
  final String fullName;
  final String email;
  final String? avatarUrl;
  final String initials;
  final String university;
  final String major;
  final String yearOfStudy;
  final String location;
  final String bio;
  final List<SkillProficiency> skillsOffered;
  final List<String> skillsToLearn;
  final String preferredPartnerType;
  final double verifiedTeammateRating;
  final int totalReviewsCount;
  final String createdAt;

  UserProfile({
    required this.id,
    required this.fullName,
    required this.email,
    this.avatarUrl,
    required this.initials,
    required this.university,
    required this.major,
    required this.yearOfStudy,
    required this.location,
    required this.bio,
    required this.skillsOffered,
    required this.skillsToLearn,
    required this.preferredPartnerType,
    this.verifiedTeammateRating = 4.8,
    this.totalReviewsCount = 12,
    required this.createdAt,
  });

  UserProfile copyWith({
    String? id,
    String? fullName,
    String? email,
    String? avatarUrl,
    String? initials,
    String? university,
    String? major,
    String? yearOfStudy,
    String? location,
    String? bio,
    List<SkillProficiency>? skillsOffered,
    List<String>? skillsToLearn,
    String? preferredPartnerType,
    double? verifiedTeammateRating,
    int? totalReviewsCount,
    String? createdAt,
  }) {
    return UserProfile(
      id: id ?? this.id,
      fullName: fullName ?? this.fullName,
      email: email ?? this.email,
      avatarUrl: avatarUrl ?? this.avatarUrl,
      initials: initials ?? this.initials,
      university: university ?? this.university,
      major: major ?? this.major,
      yearOfStudy: yearOfStudy ?? this.yearOfStudy,
      location: location ?? this.location,
      bio: bio ?? this.bio,
      skillsOffered: skillsOffered ?? this.skillsOffered,
      skillsToLearn: skillsToLearn ?? this.skillsToLearn,
      preferredPartnerType: preferredPartnerType ?? this.preferredPartnerType,
      verifiedTeammateRating:
          verifiedTeammateRating ?? this.verifiedTeammateRating,
      totalReviewsCount: totalReviewsCount ?? this.totalReviewsCount,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'fullName': fullName,
        'email': email,
        'avatarUrl': avatarUrl,
        'initials': initials,
        'university': university,
        'major': major,
        'yearOfStudy': yearOfStudy,
        'location': location,
        'bio': bio,
        'skillsOffered': skillsOffered.map((e) => e.toJson()).toList(),
        'skillsToLearn': skillsToLearn,
        'preferredPartnerType': preferredPartnerType,
        'verifiedTeammateRating': verifiedTeammateRating,
        'totalReviewsCount': totalReviewsCount,
        'createdAt': createdAt,
      };

  factory UserProfile.fromJson(Map<String, dynamic> json) => UserProfile(
        id: json['id'] ?? '',
        fullName: json['fullName'] ?? '',
        email: json['email'] ?? '',
        avatarUrl: json['avatarUrl'],
        initials: json['initials'] ?? 'PF',
        university: json['university'] ?? '',
        major: json['major'] ?? '',
        yearOfStudy: json['yearOfStudy'] ?? '',
        location: json['location'] ?? '',
        bio: json['bio'] ?? '',
        skillsOffered: (json['skillsOffered'] as List<dynamic>?)
                ?.map((e) => SkillProficiency.fromJson(e))
                .toList() ??
            [],
        skillsToLearn: (json['skillsToLearn'] as List<dynamic>?)
                ?.map((e) => e.toString())
                .toList() ??
            [],
        preferredPartnerType: json['preferredPartnerType'] ?? 'project_partner',
        verifiedTeammateRating:
            (json['verifiedTeammateRating'] as num?)?.toDouble() ?? 4.8,
        totalReviewsCount: json['totalReviewsCount'] ?? 12,
        createdAt: json['createdAt'] ?? DateTime.now().toIso8601String(),
      );
}
