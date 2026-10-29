import '../models/user_model.dart';
import '../models/candidate_model.dart';
import '../models/connection_model.dart';
import '../models/workspace_model.dart';
import '../models/chat_model.dart';

class MockData {
  MockData._();

  static final UserProfile initialCurrentUser = UserProfile(
    id: 'user-thusha',
    fullName: 'K.Thusha',
    email: 'k.thusha@example.com',
    avatarUrl:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    initials: 'KT',
    university: 'University of Moratuwa',
    major: 'Computer Science & Engineering',
    yearOfStudy: 'Senior (Year 4)',
    location: 'Colombo, Sri Lanka',
    bio:
        'Full stack developer focused on responsive web architectures, AI tooling, and enterprise SaaS systems. Looking to collaborate on ambitious MVP projects and hackathon challenges.',
    skillsOffered: [
      SkillProficiency(skillName: 'Angular', level: 'Advanced'),
      SkillProficiency(skillName: 'C#', level: 'Advanced'),
      SkillProficiency(skillName: 'SQL', level: 'Intermediate'),
      SkillProficiency(skillName: 'HTML', level: 'Expert'),
      SkillProficiency(skillName: 'CSS', level: 'Advanced'),
      SkillProficiency(skillName: 'React', level: 'Intermediate'),
    ],
    skillsToLearn: ['Python', 'Machine Learning', 'Flutter', 'AI Integration'],
    preferredPartnerType: 'project_partner',
    verifiedTeammateRating: 4.95,
    totalReviewsCount: 14,
    createdAt: '2025-01-15T10:00:00Z',
  );

  static final List<CandidateMatch> initialCandidates = [
    CandidateMatch(
      candidateId: 'k-thulaanchan',
      candidateName: 'K.Thulaanchan',
      avatarUrl:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      initials: 'KT',
      title: 'Full Stack AI Developer',
      university: 'University of Jaffna',
      location: 'Jaffna / Remote',
      availabilityText: 'Available Sat & Sun (15 hrs/week)',
      matchScore: 91,
      dimensionalScores: DimensionalScores(
        skillsMatch: 95,
        availability: 90,
        interests: 88,
        location: 85,
      ),
      matchingRationale: [
        'Has strong Python & PyTorch backend experience',
        'Actively interested in building generative AI & LLM tooling',
        'Available on weekends (15 hrs/week commitment)',
        'Looking for an AI project with matching 6-week timeline',
        'High track record of on-time project completion',
      ],
      matchingTechStack: ['Python', 'AI', 'FastAPI', 'SQL'],
      rating: 4.9,
      reviewsCount: 12,
      bio:
          'Passionate about building AI-driven web apps and fine-tuning LLMs. Looking to collaborate on production-ready hackathon or MVP projects with strong frontend partners.',
      isBookmarked: false,
      previousProjects: [
        PreviousProject(
          title: 'AI Chatbot',
          description:
              'Context-aware customer service copilot with hybrid RAG architecture.',
          tags: ['Python', 'FastAPI', 'VectorDB', 'LangChain'],
        ),
        PreviousProject(
          title: 'Student Management System',
          description:
              'Role-based university portal handling course enrollment and grades.',
          tags: ['Angular', 'C#', '.NET', 'SQL Server'],
        ),
      ],
    ),
    CandidateMatch(
      candidateId: 'v-vishanan',
      candidateName: 'V.Vishanan',
      avatarUrl:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      initials: 'VV',
      title: 'UI/UX Designer & Frontend Developer',
      university: 'University of Colombo',
      location: 'Colombo / Hybrid',
      availabilityText: 'Available Evenings & Weekends (12 hrs/week)',
      matchScore: 86,
      dimensionalScores: DimensionalScores(
        skillsMatch: 88,
        availability: 85,
        interests: 86,
        location: 90,
      ),
      matchingRationale: [
        'Deep expertise in Figma, design systems, and modern Tailwind CSS',
        'Experienced in agile sprint delivery and component architectures',
        'Overlaps 12 hours/week during weekday evenings and Saturdays',
      ],
      matchingTechStack: ['UI/UX', 'Figma', 'Tailwind CSS', 'Angular'],
      rating: 4.8,
      reviewsCount: 9,
      bio:
          'Product designer and frontend engineer creating high-fidelity interactive interfaces and scalable design systems for SaaS platforms.',
      isBookmarked: true,
    ),
    CandidateMatch(
      candidateId: 's-priyanka',
      candidateName: 'S.Priyanka',
      avatarUrl:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      initials: 'SP',
      title: 'Machine Learning & Data Scientist',
      university: 'University of Peradeniya',
      location: 'Kandy / Remote',
      availabilityText: 'Available Weekends (10 hrs/week)',
      matchScore: 82,
      dimensionalScores: DimensionalScores(
        skillsMatch: 85,
        availability: 80,
        interests: 82,
        location: 80,
      ),
      matchingRationale: [
        'Proven background in statistical modeling, pandas, and predictive ML',
        'Interest in collaborative AI experimentation and hackathons',
      ],
      matchingTechStack: [
        'Machine Learning',
        'Data Science',
        'Python',
        'TensorFlow'
      ],
      rating: 4.7,
      reviewsCount: 7,
      bio:
          'Data science student passionate about predictive analytics, computer vision, and building clean data processing pipelines.',
      isBookmarked: false,
    ),
    CandidateMatch(
      candidateId: 'alex-morgan',
      candidateName: 'Alex Morgan',
      initials: 'AM',
      title: 'Cloud DevOps & Infrastructure Engineer',
      university: 'Stanford University',
      location: 'San Francisco, CA / Remote',
      availabilityText: 'Available Weekends (14 hrs/week)',
      matchScore: 92,
      dimensionalScores: DimensionalScores(
        skillsMatch: 94,
        availability: 92,
        interests: 90,
        location: 90,
      ),
      matchingRationale: [
        'Expertise in Docker, Kubernetes, and serverless backend pipelines',
        'High alignment on production-ready scalable cloud deployment',
      ],
      matchingTechStack: ['DevOps', 'Docker', 'AWS', 'Python'],
      rating: 4.95,
      reviewsCount: 15,
      bio:
          'Specializing in resilient cloud infrastructures, CI/CD automation, and high-availability API deployment.',
      isBookmarked: false,
    ),
  ];

  static final List<ProjectWorkspace> initialWorkspaces = [
    ProjectWorkspace(
      id: 'ai-event-assistant',
      name: 'AI Event Assistant',
      tagline:
          'Real-time intelligent attendee matchmaking and interactive scheduling copilot powered by hybrid LLM vectors.',
      duration: '6 Weeks Duration',
      status: 'In Progress',
      progressPercentage: 70,
      filesCount: 3,
      createdAt: '2025-02-01T08:00:00Z',
      members: [
        WorkspaceMember(
          userId: 'user-thusha',
          name: 'K.Thusha',
          initials: 'KT',
          role: 'Project Lead (You)',
          isActive: true,
          skills: ['Frontend', 'Angular', 'React'],
        ),
        WorkspaceMember(
          userId: 'k-thulaanchan',
          name: 'K.Thulaanchan',
          initials: 'KT',
          role: 'Backend & AI Developer',
          isActive: true,
          skills: ['Python', 'FastAPI', 'AI'],
          matchCompatibility: 96,
        ),
        WorkspaceMember(
          userId: 'v-vishanan',
          name: 'V.Vishanan',
          initials: 'VV',
          role: 'UI/UX Designer',
          isActive: true,
          skills: ['Figma', 'Design Systems'],
        ),
        WorkspaceMember(
          userId: 's-priyanka',
          name: 'S.Priyanka',
          initials: 'SP',
          role: 'ML Engineer',
          isActive: true,
          skills: ['TensorFlow', 'Python'],
        ),
      ],
      milestones: [
        ProjectMilestone(
          id: 'm1',
          title: 'Project Requirements & System Architecture',
          category: 'Requirements',
          isCompleted: true,
          completedAt: 'Feb 5, 2025',
        ),
        ProjectMilestone(
          id: 'm2',
          title: 'High-Fidelity UI Design & Design System',
          category: 'UI Design',
          isCompleted: true,
          completedAt: 'Feb 12, 2025',
        ),
        ProjectMilestone(
          id: 'm3',
          title: 'Relational Database Schema & Migrations',
          category: 'Database',
          isCompleted: true,
          completedAt: 'Feb 18, 2025',
        ),
        ProjectMilestone(
          id: 'm4',
          title: 'Core REST & WebSocket API Endpoints',
          category: 'Backend API',
          isCompleted: true,
          completedAt: 'Feb 24, 2025',
        ),
        ProjectMilestone(
          id: 'm5',
          title: 'Hybrid Vector Embeddings & AI Integration',
          category: 'AI Integration',
          isCompleted: false,
        ),
        ProjectMilestone(
          id: 'm6',
          title: 'End-to-End Testing & Performance Benchmarks',
          category: 'Testing',
          isCompleted: false,
        ),
      ],
      tasks: [
        WorkspaceTask(
          id: 't1',
          title: 'Implement Pinecone vector indexing',
          assignedTo: 'K.Thulaanchan',
          isDone: false,
          priority: 'High',
        ),
        WorkspaceTask(
          id: 't2',
          title: 'Finalize mobile responsive layouts',
          assignedTo: 'V.Vishanan',
          isDone: true,
          priority: 'Medium',
        ),
        WorkspaceTask(
          id: 't3',
          title: 'Test prompt latency and fallback logic',
          assignedTo: 'K.Thusha',
          isDone: false,
          priority: 'High',
        ),
      ],
    ),
  ];

  static final List<ConnectionRequest> initialConnectionRequests = [
    ConnectionRequest(
      id: 'req-1',
      senderId: 'user-thusha',
      senderName: 'K.Thusha',
      senderInitials: 'KT',
      recipientId: 'k-thulaanchan',
      projectId: 'ai-event-assistant',
      projectName: 'AI Event Assistant',
      projectDuration: '6 Weeks',
      skillsNeeded: ['Python', 'AI'],
      message:
          'Hi K.Thulaanchan, I am working on an AI Event Assistant and looking for someone with Python and AI experience. Would you like to collaborate?',
      status: 'pending',
      createdAt: '2 hours ago',
    ),
    ConnectionRequest(
      id: 'req-2',
      senderId: 'v-vishanan',
      senderName: 'V.Vishanan',
      senderInitials: 'VV',
      recipientId: 'user-thusha',
      projectId: 'student-management',
      projectName: 'Student Management System',
      projectDuration: '4 Weeks',
      skillsNeeded: ['Angular', 'UI/UX'],
      message:
          'Hey Thusha! Saw your profile and your experience with Angular. We need a frontend specialist for our student portal prototype.',
      status: 'pending',
      createdAt: '5 hours ago',
    ),
  ];

  static final List<ChatConversation> initialConversations = [
    ChatConversation(
      id: 'conv-thulaanchan',
      partnerId: 'k-thulaanchan',
      partnerName: 'K.Thulaanchan',
      partnerInitials: 'KT',
      partnerAvatarUrl:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      isOnline: true,
      lastMessageSnippet: "Awesome! Let's work together.",
      lastMessageTimestamp: 'Just now',
      unreadCount: 0,
      messages: [
        ChatMessage(
          id: 'm1',
          senderId: 'k-thulaanchan',
          senderName: 'K.Thulaanchan',
          text: 'Hi! I saw your AI project requirements.',
          timestamp: '10:30 AM',
        ),
        ChatMessage(
          id: 'm2',
          senderId: 'user-thusha',
          senderName: 'K.Thusha',
          text: 'Great! I mainly handle Angular, React, and frontend architectures.',
          timestamp: '10:32 AM',
        ),
        ChatMessage(
          id: 'm3',
          senderId: 'k-thulaanchan',
          senderName: 'K.Thulaanchan',
          text: 'I can handle Python, FastAPI, and AI integration.',
          timestamp: '10:33 AM',
        ),
        ChatMessage(
          id: 'm4',
          senderId: 'user-thusha',
          senderName: 'K.Thusha',
          text: "Awesome! Let's work together.",
          timestamp: '10:35 AM',
        ),
      ],
    ),
  ];
}
