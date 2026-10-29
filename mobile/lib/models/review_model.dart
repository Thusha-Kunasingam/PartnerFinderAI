class TeammateReview {
  final String id;
  final String projectId;
  final String reviewerId;
  final String revieweeId;
  final double communicationRating;
  final double technicalSkillsRating;
  final double teamworkRating;
  final double reliabilityRating;
  final String feedbackText;
  final bool isAnonymous;
  final String createdAt;

  TeammateReview({
    required this.id,
    required this.projectId,
    required this.reviewerId,
    required this.revieweeId,
    required this.communicationRating,
    required this.technicalSkillsRating,
    required this.teamworkRating,
    required this.reliabilityRating,
    required this.feedbackText,
    this.isAnonymous = false,
    required this.createdAt,
  });

  double get averageScore =>
      (communicationRating +
          technicalSkillsRating +
          teamworkRating +
          reliabilityRating) /
      4.0;

  Map<String, dynamic> toJson() => {
        'id': id,
        'projectId': projectId,
        'reviewerId': reviewerId,
        'revieweeId': revieweeId,
        'communicationRating': communicationRating,
        'technicalSkillsRating': technicalSkillsRating,
        'teamworkRating': teamworkRating,
        'reliabilityRating': reliabilityRating,
        'feedbackText': feedbackText,
        'isAnonymous': isAnonymous,
        'createdAt': createdAt,
      };

  factory TeammateReview.fromJson(Map<String, dynamic> json) => TeammateReview(
        id: json['id'] ?? '',
        projectId: json['projectId'] ?? '',
        reviewerId: json['reviewerId'] ?? '',
        revieweeId: json['revieweeId'] ?? '',
        communicationRating:
            (json['communicationRating'] as num?)?.toDouble() ?? 5.0,
        technicalSkillsRating:
            (json['technicalSkillsRating'] as num?)?.toDouble() ?? 4.0,
        teamworkRating: (json['teamworkRating'] as num?)?.toDouble() ?? 5.0,
        reliabilityRating:
            (json['reliabilityRating'] as num?)?.toDouble() ?? 4.0,
        feedbackText: json['feedbackText'] ?? '',
        isAnonymous: json['isAnonymous'] ?? false,
        createdAt: json['createdAt'] ?? DateTime.now().toIso8601String(),
      );
}
