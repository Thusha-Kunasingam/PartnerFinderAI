import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatchingStore } from '../../stores/useMatchingStore';
import { useConnectionStore } from '../../stores/useConnectionStore';
import { useWorkspaceStore } from '../../stores/useWorkspaceStore';

export const UserDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { matches } = useMatchingStore();
  const { acceptedConnectionIds, receivedRequests } = useConnectionStore();
  const { workspaces } = useWorkspaceStore();

  const totalMatchesCount = matches.length > 0 ? matches.length : 12;
  const totalConnectionsCount = 5 + acceptedConnectionIds.length;
  const activeProjectsCount = workspaces.length > 0 ? workspaces.length : 3;

  const project1 = workspaces.find((w) => w.id === 'ai-event-assistant') || workspaces[0];
  const project2 = workspaces.find((w) => w.id === 'student-management') || workspaces[1];

  const recentMatches = [
    {
      candidateId: 'k-thulaanchan',
      candidateName: 'K.Thulaanchan',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA41x2kdo4mNHLziiiTusSRiXcm-16_tRJYhDwtM3sZ1CQm3KHPTwSj3N29lOyp7tYA0VF02pZGLLtbUQvYv5jDhnBZwNJBRh-ngmMb_BGundxYyEZX_bCUg_dYcO_4DzCpogpzQNRDDLb1gJ5ipcAEIeB0qDLjhP2DSMQ3WUpEjoZNBAlIj1m0C55w2wGDMo6zSf4cRlRaoihMN_lbN1qUjJZoA3e8Jtr2BwwuflGNOBficWtMbFexaA',
      skills: ['Python', 'AI'],
      matchScore: 91,
    },
    {
      candidateId: 'v-vishanan',
      candidateName: 'V.Vishanan',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCJn7n9jLbCqQfiJRw-3L87HPiaaeN-kUqsyvuao_kzjJUzn5sAGUu4IKLqEpilgf3HoNTPcV3t7fxq8d9W_9H4mn3ZV1epJ4YmU0mfzI1J9wPXMI6v0Ekm4qVbmyOD0KazOnMICRW1Ir-8k0xR_EjrCJaP-AaFKmj8o0gZT1fgtl50uSr918uUSW2F_f1NohvVWcMesJ3Kf17jns2uRWGMI_A8qckFRJ0WEBXpx80798kdY9Ub7OePxA',
      skills: ['UI/UX', 'Figma'],
      matchScore: 86,
    },
    {
      candidateId: 's-priyanka',
      candidateName: 'S.Priyanka',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAiv6XNER1lJuVFh6f3oMwFcWSxPqKza8xFXN9CbHE_HyFuL3hbokigqSXJt2qJyUr5YZCRW2tddBDR81Bn5EK9Yy7w_9pjjujD-RwTwiktCijo8GCmxtyd_zREyJdLFhF2a9sMOqHKP-2i21pS8cIs-cp-N63_kRctBAgfWJXjFWwWzeaGR8VYkOX4Llzuhgd5bXO1ZMQ1IIWsMQoiHDEpanpUOK3oWLk8d3zVR4nQgsu3DH-VpdR9pg',
      skills: ['Machine Learning', 'Data Science'],
      matchScore: 82,
    },
  ];

  return (
    <main className="p-6 lg:p-8 max-w-[1180px] w-full flex flex-col gap-6">
      {/* Statistic Cards (Horizontal Row of Exactly 4) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {/* Stat 1: Matches */}
        <div
          onClick={() => navigate('/matches')}
          className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high shadow-sm hover:border-outline-variant transition-all cursor-pointer select-none"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
              Matches
            </span>
            <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">join</span>
            </div>
          </div>
          <div className="text-display-lg font-display-lg text-on-surface tracking-tight">
            {totalMatchesCount} Matches
          </div>
        </div>

        {/* Stat 2: Connections */}
        <div
          onClick={() => navigate('/connections/requests')}
          className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high shadow-sm hover:border-outline-variant transition-all cursor-pointer select-none"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
              Connections
            </span>
            <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">hub</span>
            </div>
          </div>
          <div className="text-display-lg font-display-lg text-on-surface tracking-tight">
            {totalConnectionsCount} Connections
          </div>
        </div>

        {/* Stat 3: 3 Projects */}
        <div
          onClick={() => navigate('/workspace/ai-event-assistant')}
          className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high shadow-sm hover:border-outline-variant transition-all cursor-pointer select-none"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
              Active
            </span>
            <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">folder</span>
            </div>
          </div>
          <div className="text-display-lg font-display-lg text-on-surface tracking-tight">
            {activeProjectsCount} Projects
          </div>
        </div>

        {/* Stat 4: 1 Completed */}
        <div
          onClick={() => navigate('/workspace/ai-event-assistant/progress')}
          className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high shadow-sm hover:border-outline-variant transition-all cursor-pointer select-none"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
              Delivered
            </span>
            <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
            </div>
          </div>
          <div className="text-display-lg font-display-lg text-on-surface tracking-tight">
            1 Completed
          </div>
        </div>
      </section>

      {/* Two-column Split Lower Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Main Column: Recent Matches */}
        <div className="col-span-1 lg:col-span-7 bg-surface-container-lowest p-6 rounded-xl border border-surface-container-high shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-surface-container-high pb-4">
            <h2 className="text-headline-sm font-headline-sm text-on-surface">Recent Matches</h2>
            <span className="text-label-sm font-label-sm text-primary font-medium">
              Algorithmic Rank
            </span>
          </div>

          {/* Cards List */}
          <div className="flex flex-col gap-3">
            {recentMatches.map((cand) => (
              <div
                key={cand.candidateId}
                onClick={() => navigate(`/candidates/${cand.candidateId}`)}
                className="p-4 rounded-xl border border-surface-container-high bg-surface-container-lowest hover:border-outline-variant hover:shadow-sm transition-all flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    className="w-11 h-11 rounded-full object-cover border border-surface-container-high flex-shrink-0"
                    alt={cand.candidateName}
                    src={cand.avatarUrl}
                  />
                  <div className="flex flex-col">
                    <span className="text-headline-sm font-headline-sm text-on-surface font-semibold">
                      {cand.candidateName}
                    </span>
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      {cand.skills.map((skill) => (
                        <span
                          key={skill}
                          className="h-6 px-2.5 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] text-[#0284C7] text-label-sm font-label-sm flex items-center"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center shrink-0 ml-2">
                  <span className="px-2.5 py-1 rounded-full text-label-sm font-label-sm font-semibold bg-primary-fixed text-primary border border-primary-fixed-dim whitespace-nowrap">
                    {cand.matchScore}% Match
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: My Projects */}
        <div className="col-span-1 lg:col-span-5 bg-surface-container-lowest p-6 rounded-xl border border-surface-container-high shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-surface-container-high pb-4">
            <h2 className="text-headline-sm font-headline-sm text-on-surface">My Projects</h2>
            <span className="text-body-sm font-body-sm text-on-surface-variant">
              Active Engagements
            </span>
          </div>

          {/* Projects Content */}
          <div className="flex flex-col gap-4">
            {/* Project 1: AI Event Assistant */}
            <div
              onClick={() => navigate('/workspace/ai-event-assistant')}
              className="p-4 rounded-xl border border-surface-container-high bg-surface-container-lowest flex flex-col gap-3 cursor-pointer hover:border-outline-variant hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-label-md font-label-md text-on-surface font-semibold">
                  {project1?.name || 'AI Event Assistant'}
                </span>
                <span className="px-2 py-0.5 rounded text-label-xs font-label-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {project1?.status || 'In Progress'}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-body-sm font-body-sm">
                  <span className="text-on-surface-variant">Progress</span>
                  <span className="font-medium text-on-surface">
                    {project1?.progressPercentage ?? 70}%
                  </span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary-container to-secondary-container h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project1?.progressPercentage ?? 70}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Project 2: Student Management */}
            <div
              onClick={() => navigate('/workspace/student-management')}
              className="p-4 rounded-xl border border-surface-container-high bg-surface-container-lowest flex flex-col gap-3 cursor-pointer hover:border-outline-variant hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-label-md font-label-md text-on-surface font-semibold">
                  {project2?.name || 'Student Management'}
                </span>
                <span className="px-2 py-0.5 rounded text-label-xs font-label-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  {project2?.status || 'Planning'}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-body-sm font-body-sm">
                  <span className="text-on-surface-variant">Progress</span>
                  <span className="font-medium text-on-surface">
                    {project2?.progressPercentage ?? 30}%
                  </span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary-container to-secondary-container h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project2?.progressPercentage ?? 30}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
