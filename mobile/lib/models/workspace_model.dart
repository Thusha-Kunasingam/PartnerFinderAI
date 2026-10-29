class WorkspaceMember {
  final String userId;
  final String name;
  final String initials;
  final String? avatarUrl;
  final String role;
  final bool isActive;
  final List<String> skills;
  final int matchCompatibility;

  WorkspaceMember({
    required this.userId,
    required this.name,
    required this.initials,
    this.avatarUrl,
    required this.role,
    this.isActive = true,
    required this.skills,
    this.matchCompatibility = 95,
  });

  Map<String, dynamic> toJson() => {
        'userId': userId,
        'name': name,
        'initials': initials,
        'avatarUrl': avatarUrl,
        'role': role,
        'isActive': isActive,
        'skills': skills,
        'matchCompatibility': matchCompatibility,
      };

  factory WorkspaceMember.fromJson(Map<String, dynamic> json) =>
      WorkspaceMember(
        userId: json['userId'] ?? '',
        name: json['name'] ?? '',
        initials: json['initials'] ?? 'PF',
        avatarUrl: json['avatarUrl'],
        role: json['role'] ?? 'Partner',
        isActive: json['isActive'] ?? true,
        skills: (json['skills'] as List<dynamic>?)
                ?.map((e) => e.toString())
                .toList() ??
            [],
        matchCompatibility: json['matchCompatibility'] ?? 95,
      );
}

class ProjectMilestone {
  final String id;
  final String title;
  final String category; // 'Requirements' | 'UI Design' | 'Database' | 'Backend API' | 'AI Integration' | 'Testing'
  final bool isCompleted;
  final String? completedAt;

  ProjectMilestone({
    required this.id,
    required this.title,
    required this.category,
    this.isCompleted = false,
    this.completedAt,
  });

  ProjectMilestone copyWith({
    String? id,
    String? title,
    String? category,
    bool? isCompleted,
    String? completedAt,
  }) {
    return ProjectMilestone(
      id: id ?? this.id,
      title: title ?? this.title,
      category: category ?? this.category,
      isCompleted: isCompleted ?? this.isCompleted,
      completedAt: completedAt ?? this.completedAt,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'category': category,
        'isCompleted': isCompleted,
        'completedAt': completedAt,
      };

  factory ProjectMilestone.fromJson(Map<String, dynamic> json) =>
      ProjectMilestone(
        id: json['id'] ?? '',
        title: json['title'] ?? '',
        category: json['category'] ?? 'Requirements',
        isCompleted: json['isCompleted'] ?? false,
        completedAt: json['completedAt'],
      );
}

class WorkspaceTask {
  final String id;
  final String title;
  final String assignedTo;
  final bool isDone;
  final String priority; // 'High' | 'Medium' | 'Low'

  WorkspaceTask({
    required this.id,
    required this.title,
    required this.assignedTo,
    this.isDone = false,
    this.priority = 'Medium',
  });

  WorkspaceTask copyWith({
    String? id,
    String? title,
    String? assignedTo,
    bool? isDone,
    String? priority,
  }) {
    return WorkspaceTask(
      id: id ?? this.id,
      title: title ?? this.title,
      assignedTo: assignedTo ?? this.assignedTo,
      isDone: isDone ?? this.isDone,
      priority: priority ?? this.priority,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'assignedTo': assignedTo,
        'isDone': isDone,
        'priority': priority,
      };

  factory WorkspaceTask.fromJson(Map<String, dynamic> json) => WorkspaceTask(
        id: json['id'] ?? '',
        title: json['title'] ?? '',
        assignedTo: json['assignedTo'] ?? '',
        isDone: json['isDone'] ?? false,
        priority: json['priority'] ?? 'Medium',
      );
}

class ProjectWorkspace {
  final String id;
  final String name;
  final String tagline;
  final String duration;
  final String status; // 'Planning' | 'In Progress' | 'Completed'
  final int progressPercentage;
  final List<WorkspaceMember> members;
  final List<ProjectMilestone> milestones;
  final List<WorkspaceTask> tasks;
  final int filesCount;
  final String createdAt;

  ProjectWorkspace({
    required this.id,
    required this.name,
    required this.tagline,
    required this.duration,
    this.status = 'In Progress',
    this.progressPercentage = 68,
    required this.members,
    required this.milestones,
    this.tasks = const [],
    this.filesCount = 8,
    required this.createdAt,
  });

  ProjectWorkspace copyWith({
    String? id,
    String? name,
    String? tagline,
    String? duration,
    String? status,
    int? progressPercentage,
    List<WorkspaceMember>? members,
    List<ProjectMilestone>? milestones,
    List<WorkspaceTask>? tasks,
    int? filesCount,
    String? createdAt,
  }) {
    return ProjectWorkspace(
      id: id ?? this.id,
      name: name ?? this.name,
      tagline: tagline ?? this.tagline,
      duration: duration ?? this.duration,
      status: status ?? this.status,
      progressPercentage: progressPercentage ?? this.progressPercentage,
      members: members ?? this.members,
      milestones: milestones ?? this.milestones,
      tasks: tasks ?? this.tasks,
      filesCount: filesCount ?? this.filesCount,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'tagline': tagline,
        'duration': duration,
        'status': status,
        'progressPercentage': progressPercentage,
        'members': members.map((e) => e.toJson()).toList(),
        'milestones': milestones.map((e) => e.toJson()).toList(),
        'tasks': tasks.map((e) => e.toJson()).toList(),
        'filesCount': filesCount,
        'createdAt': createdAt,
      };

  factory ProjectWorkspace.fromJson(Map<String, dynamic> json) =>
      ProjectWorkspace(
        id: json['id'] ?? '',
        name: json['name'] ?? '',
        tagline: json['tagline'] ?? '',
        duration: json['duration'] ?? '6 Weeks',
        status: json['status'] ?? 'In Progress',
        progressPercentage: json['progressPercentage'] ?? 68,
        members: (json['members'] as List<dynamic>?)
                ?.map((e) => WorkspaceMember.fromJson(e))
                .toList() ??
            [],
        milestones: (json['milestones'] as List<dynamic>?)
                ?.map((e) => ProjectMilestone.fromJson(e))
                .toList() ??
            [],
        tasks: (json['tasks'] as List<dynamic>?)
                ?.map((e) => WorkspaceTask.fromJson(e))
                .toList() ??
            [],
        filesCount: json['filesCount'] ?? 8,
        createdAt: json['createdAt'] ?? DateTime.now().toIso8601String(),
      );
}
