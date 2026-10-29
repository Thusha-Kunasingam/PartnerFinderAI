class ProjectRequirement {
  final String id;
  final String creatorId;
  final String projectHeadline;
  final String requiredRole;
  final String experienceLevel;
  final List<String> requiredSkills;
  final int weeklyHoursCommitment;
  final List<String> availabilityDays;
  final String projectDuration;
  final String locationPreference;
  final String projectDescription;
  final String createdAt;

  ProjectRequirement({
    required this.id,
    required this.creatorId,
    required this.projectHeadline,
    required this.requiredRole,
    required this.experienceLevel,
    required this.requiredSkills,
    required this.weeklyHoursCommitment,
    required this.availabilityDays,
    required this.projectDuration,
    required this.locationPreference,
    required this.projectDescription,
    required this.createdAt,
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'creatorId': creatorId,
        'projectHeadline': projectHeadline,
        'requiredRole': requiredRole,
        'experienceLevel': experienceLevel,
        'requiredSkills': requiredSkills,
        'weeklyHoursCommitment': weeklyHoursCommitment,
        'availabilityDays': availabilityDays,
        'projectDuration': projectDuration,
        'locationPreference': locationPreference,
        'projectDescription': projectDescription,
        'createdAt': createdAt,
      };

  factory ProjectRequirement.fromJson(Map<String, dynamic> json) =>
      ProjectRequirement(
        id: json['id'] ?? '',
        creatorId: json['creatorId'] ?? '',
        projectHeadline: json['projectHeadline'] ?? '',
        requiredRole: json['requiredRole'] ?? '',
        experienceLevel: json['experienceLevel'] ?? 'Intermediate (2 - 4 years)',
        requiredSkills: (json['requiredSkills'] as List<dynamic>?)
                ?.map((e) => e.toString())
                .toList() ??
            [],
        weeklyHoursCommitment: json['weeklyHoursCommitment'] ?? 15,
        availabilityDays: (json['availabilityDays'] as List<dynamic>?)
                ?.map((e) => e.toString())
                .toList() ??
            ['Mon', 'Wed', 'Sat'],
        projectDuration: json['projectDuration'] ?? '6 Weeks (Full V1 Build)',
        locationPreference: json['locationPreference'] ?? 'Remote',
        projectDescription: json['projectDescription'] ?? '',
        createdAt: json['createdAt'] ?? DateTime.now().toIso8601String(),
      );
}
