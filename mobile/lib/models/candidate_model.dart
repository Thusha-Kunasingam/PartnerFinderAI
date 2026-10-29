class DimensionalScores {
  final int skillsMatch; // 40%
  final int availability; // 25%
  final int interests; // 20%
  final int location; // 15%

  DimensionalScores({
    required this.skillsMatch,
    required this.availability,
    required this.interests,
    required this.location,
  });

  Map<String, dynamic> toJson() => {
        'skillsMatch': skillsMatch,
        'availability': availability,
        'interests': interests,
        'location': location,
      };

  factory DimensionalScores.fromJson(Map<String, dynamic> json) =>
      DimensionalScores(
        skillsMatch: json['skillsMatch'] ?? 95,
        availability: json['availability'] ?? 90,
        interests: json['interests'] ?? 88,
        location: json['location'] ?? 85,
      );
}

class PreviousProject {
  final String title;
  final String description;
  final List<String> tags;

  PreviousProject({
    required this.title,
    required this.description,
    required this.tags,
  });

  Map<String, dynamic> toJson() => {
        'title': title,
        'description': description,
        'tags': tags,
      };

  factory PreviousProject.fromJson(Map<String, dynamic> json) =>
      PreviousProject(
        title: json['title'] ?? '',
        description: json['description'] ?? '',
        tags: (json['tags'] as List<dynamic>?)
                ?.map((e) => e.toString())
                .toList() ??
            [],
      );
}

class CandidateMatch {
  final String candidateId;
  final String candidateName;
  final String? avatarUrl;
  final String initials;
  final String title;
  final String university;
  final String location;
  final String availabilityText;
  final int matchScore; // e.g. 96
  final DimensionalScores dimensionalScores;
  final List<String> matchingRationale;
  final List<String> matchingTechStack;
  final double rating;
  final int reviewsCount;
  final String bio;
  final bool isBookmarked;
  final List<PreviousProject> previousProjects;

  CandidateMatch({
    required this.candidateId,
    required this.candidateName,
    this.avatarUrl,
    required this.initials,
    required this.title,
    required this.university,
    required this.location,
    required this.availabilityText,
    required this.matchScore,
    required this.dimensionalScores,
    required this.matchingRationale,
    required this.matchingTechStack,
    this.rating = 4.9,
    this.reviewsCount = 14,
    required this.bio,
    this.isBookmarked = false,
    this.previousProjects = const [],
  });

  CandidateMatch copyWith({
    String? candidateId,
    String? candidateName,
    String? avatarUrl,
    String? initials,
    String? title,
    String? university,
    String? location,
    String? availabilityText,
    int? matchScore,
    DimensionalScores? dimensionalScores,
    List<String>? matchingRationale,
    List<String>? matchingTechStack,
    double? rating,
    int? reviewsCount,
    String? bio,
    bool? isBookmarked,
    List<PreviousProject>? previousProjects,
  }) {
    return CandidateMatch(
      candidateId: candidateId ?? this.candidateId,
      candidateName: candidateName ?? this.candidateName,
      avatarUrl: avatarUrl ?? this.avatarUrl,
      initials: initials ?? this.initials,
      title: title ?? this.title,
      university: university ?? this.university,
      location: location ?? this.location,
      availabilityText: availabilityText ?? this.availabilityText,
      matchScore: matchScore ?? this.matchScore,
      dimensionalScores: dimensionalScores ?? this.dimensionalScores,
      matchingRationale: matchingRationale ?? this.matchingRationale,
      matchingTechStack: matchingTechStack ?? this.matchingTechStack,
      rating: rating ?? this.rating,
      reviewsCount: reviewsCount ?? this.reviewsCount,
      bio: bio ?? this.bio,
      isBookmarked: isBookmarked ?? this.isBookmarked,
      previousProjects: previousProjects ?? this.previousProjects,
    );
  }

  Map<String, dynamic> toJson() => {
        'candidateId': candidateId,
        'candidateName': candidateName,
        'avatarUrl': avatarUrl,
        'initials': initials,
        'title': title,
        'university': university,
        'location': location,
        'availabilityText': availabilityText,
        'matchScore': matchScore,
        'dimensionalScores': dimensionalScores.toJson(),
        'matchingRationale': matchingRationale,
        'matchingTechStack': matchingTechStack,
        'rating': rating,
        'reviewsCount': reviewsCount,
        'bio': bio,
        'isBookmarked': isBookmarked,
        'previousProjects': previousProjects.map((e) => e.toJson()).toList(),
      };

  factory CandidateMatch.fromJson(Map<String, dynamic> json) => CandidateMatch(
        candidateId: json['candidateId'] ?? '',
        candidateName: json['candidateName'] ?? '',
        avatarUrl: json['avatarUrl'],
        initials: json['initials'] ?? 'PF',
        title: json['title'] ?? '',
        university: json['university'] ?? '',
        location: json['location'] ?? '',
        availabilityText: json['availabilityText'] ?? '15 hrs/week',
        matchScore: json['matchScore'] ?? 90,
        dimensionalScores: DimensionalScores.fromJson(
            json['dimensionalScores'] ?? {}),
        matchingRationale: (json['matchingRationale'] as List<dynamic>?)
                ?.map((e) => e.toString())
                .toList() ??
            [],
        matchingTechStack: (json['matchingTechStack'] as List<dynamic>?)
                ?.map((e) => e.toString())
                .toList() ??
            [],
        rating: (json['rating'] as num?)?.toDouble() ?? 4.9,
        reviewsCount: json['reviewsCount'] ?? 14,
        bio: json['bio'] ?? '',
        isBookmarked: json['isBookmarked'] ?? false,
        previousProjects: (json['previousProjects'] as List<dynamic>?)
                ?.map((e) => PreviousProject.fromJson(e))
                .toList() ??
            [],
      );
}
