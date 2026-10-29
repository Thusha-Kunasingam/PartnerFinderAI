class ConnectionRequest {
  final String id;
  final String senderId;
  final String senderName;
  final String senderInitials;
  final String? senderAvatarUrl;
  final String recipientId;
  final String projectId;
  final String projectName;
  final String projectDuration;
  final List<String> skillsNeeded;
  final String message;
  final String status; // 'pending' | 'accepted' | 'rejected'
  final String createdAt;

  ConnectionRequest({
    required this.id,
    required this.senderId,
    required this.senderName,
    required this.senderInitials,
    this.senderAvatarUrl,
    required this.recipientId,
    required this.projectId,
    required this.projectName,
    required this.projectDuration,
    required this.skillsNeeded,
    required this.message,
    this.status = 'pending',
    required this.createdAt,
  });

  ConnectionRequest copyWith({
    String? id,
    String? senderId,
    String? senderName,
    String? senderInitials,
    String? senderAvatarUrl,
    String? recipientId,
    String? projectId,
    String? projectName,
    String? projectDuration,
    List<String>? skillsNeeded,
    String? message,
    String? status,
    String? createdAt,
  }) {
    return ConnectionRequest(
      id: id ?? this.id,
      senderId: senderId ?? this.senderId,
      senderName: senderName ?? this.senderName,
      senderInitials: senderInitials ?? this.senderInitials,
      senderAvatarUrl: senderAvatarUrl ?? this.senderAvatarUrl,
      recipientId: recipientId ?? this.recipientId,
      projectId: projectId ?? this.projectId,
      projectName: projectName ?? this.projectName,
      projectDuration: projectDuration ?? this.projectDuration,
      skillsNeeded: skillsNeeded ?? this.skillsNeeded,
      message: message ?? this.message,
      status: status ?? this.status,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'senderId': senderId,
        'senderName': senderName,
        'senderInitials': senderInitials,
        'senderAvatarUrl': senderAvatarUrl,
        'recipientId': recipientId,
        'projectId': projectId,
        'projectName': projectName,
        'projectDuration': projectDuration,
        'skillsNeeded': skillsNeeded,
        'message': message,
        'status': status,
        'createdAt': createdAt,
      };

  factory ConnectionRequest.fromJson(Map<String, dynamic> json) =>
      ConnectionRequest(
        id: json['id'] ?? '',
        senderId: json['senderId'] ?? '',
        senderName: json['senderName'] ?? '',
        senderInitials: json['senderInitials'] ?? 'PF',
        senderAvatarUrl: json['senderAvatarUrl'],
        recipientId: json['recipientId'] ?? '',
        projectId: json['projectId'] ?? '',
        projectName: json['projectName'] ?? '',
        projectDuration: json['projectDuration'] ?? '6 Weeks',
        skillsNeeded: (json['skillsNeeded'] as List<dynamic>?)
                ?.map((e) => e.toString())
                .toList() ??
            [],
        message: json['message'] ?? '',
        status: json['status'] ?? 'pending',
        createdAt: json['createdAt'] ?? DateTime.now().toIso8601String(),
      );
}
