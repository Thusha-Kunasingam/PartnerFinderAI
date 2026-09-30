import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MaterialIcon } from '../../components/common/MaterialIcon';
import { useAuthStore } from '../../stores/useAuthStore';
import { useMatchingStore } from '../../stores/useMatchingStore';
import { useWorkspaceStore } from '../../stores/useWorkspaceStore';

export const UserDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const { matches } = useMatchingStore();
  const { workspaces } = useWorkspaceStore();

  const recentMatches = matches.length > 0 ? matches.slice(0, 3) : [
    {
      candidateId: 'cand-001',
      candidateName: 'K.Thulaanchan',
      title: 'Software Engineering Student',
      university: 'University of Jaffna',
      matchScore: 91,
      matchingTechStack: ['Python', 'AI'],
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA41x2kdo4mNHLziiiTusSRiXcm-16_tRJYhDwtM3sZ1CQm3KHPTwSj3N29lOyp7tYA0VF02pZGLLtbUQvYv5jDhnBZwNJBRh-ngmMb_BGundxYyEZX_bCUg_dYcO_4DzCpogpzQNRDDLb1gJ5ipcAEIeB0qDLjhP2DSMQ3WUpEjoZNBAlIj1m0C55w2wGDMo6zSf4cRlRaoihMN_lbN1qUjJZoA3e8Jtr2BwwuflGNOBficWtMbFexaA',
    },
    {
      candidateId: 'cand-002',
      candidateName: 'V.Vishanan',
      title: 'Computer Science Undergraduate',
      university: 'University of Jaffna',
      matchScore: 86,
      matchingTechStack: ['UI/UX', 'Figma'],
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJn7n9jLbCqQfiJRw-3L87HPiaaeN-kUqsyvuao_kzjJUzn5sAGUu4IKLqEpilgf3HoNTPcV3t7fxq8d9W_9H4mn3ZV1epJ4YmU0mfzI1J9wPXMI6v0Ekm4qVbmyOD0KazOnMICRW1Ir-8k0xR_EjrCJaP-AaFKmj8o0gZT1fgtl50uSr918uUSW2F_f1NohvVWcMesJ3Kf17jns2uRWGMI_A8qckFRJ0WEBXpx80798kdY9Ub7OePxA',
    },
    {
      candidateId: 'cand-003',
      candidateName: 'S.Priyanka',
      title: 'AI & Data Science Student',
      university: 'University of Colombo',
      matchScore: 82,
      matchingTechStack: ['Machine Learning', 'Data Science'],
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiv6XNER1lJuVFh6f3oMwFcWSxPqKza8xFXN9CbHE_HyFuL3hbokigqSXJt2qJyUr5YZCRW2tddBDR81Bn5EK9Yy7w_9pjjujD-RwTwiktCijo8GCmxtyd_zREyJdLFhF2a9sMOqHKP-2i21pS8cIs-cp-N63_kRctBAgfWJXjFWwWzeaGR8VYkOX4Llzuhgd5bXO1ZMQ1IIWsMQoiHDEpanpUOK3oWLk8d3zVR4nQgsu3DH-VpdR9pg',
    },
  ];

  return (
    <div className="p-8 max-w-[1180px] w-full flex flex-col gap-6">
      {/* Statistic Cards (Horizontal Row of Exactly 4) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Stat 1: 12 Matches */}
        <div
          onClick={() => navigate('/matches')}
          className="bg-white p-5 rounded-xl border border-[#dce9ff] shadow-sm hover:border-[#ccc3d8] transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-medium text-[#4a4455] uppercase tracking-wider">
              Matches
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#0058be]">
              <MaterialIcon icon="join" size={18} />
            </div>
          </div>
          <div className="text-[32px] font-bold text-[#0b1c30] tracking-tight">12 Matches</div>
        </div>

        {/* Stat 2: 5 Connections */}
        <div
          onClick={() => navigate('/connections/requests')}
          className="bg-white p-5 rounded-xl border border-[#dce9ff] shadow-sm hover:border-[#ccc3d8] transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-medium text-[#4a4455] uppercase tracking-wider">
              Connections
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#0058be]">
              <MaterialIcon icon="hub" size={18} />
            </div>
          </div>
          <div className="text-[32px] font-bold text-[#0b1c30] tracking-tight">5 Connections</div>
        </div>

        {/* Stat 3: 3 Projects */}
        <div
          onClick={() => navigate('/workspace/proj-001')}
          className="bg-white p-5 rounded-xl border border-[#dce9ff] shadow-sm hover:border-[#ccc3d8] transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-medium text-[#4a4455] uppercase tracking-wider">
              Active
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#0058be]">
              <MaterialIcon icon="folder" size={18} />
            </div>
          </div>
          <div className="text-[32px] font-bold text-[#0b1c30] tracking-tight">
            {workspaces.length > 0 ? `${workspaces.length} Projects` : '3 Projects'}
          </div>
        </div>

        {/* Stat 4: 1 Completed */}
        <div
          onClick={() => navigate('/workspace/proj-001/progress')}
          className="bg-white p-5 rounded-xl border border-[#dce9ff] shadow-sm hover:border-[#ccc3d8] transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-medium text-[#4a4455] uppercase tracking-wider">
              Delivered
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#0058be]">
              <MaterialIcon icon="check_circle" size={18} />
            </div>
          </div>
          <div className="text-[32px] font-bold text-[#0b1c30] tracking-tight">1 Completed</div>
        </div>
      </section>

      {/* Two-column Split Lower Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Recent Matches */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-[#dce9ff] shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-[#dce9ff] pb-4">
            <h2 className="text-[16px] font-semibold text-[#0b1c30]">Recent Matches</h2>
            <span className="text-[12px] text-[#630ed4] font-medium">Algorithmic Rank</span>
          </div>

          <div className="flex flex-col gap-3">
            {recentMatches.map((cand) => (
              <div
                key={cand.candidateId}
                onClick={() => navigate(`/candidates/${cand.candidateId}`)}
                className="p-4 rounded-xl border border-[#dce9ff] bg-white hover:border-[#ccc3d8] hover:shadow-sm transition-all flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    className="w-11 h-11 rounded-full object-cover border border-[#dce9ff] flex-shrink-0"
                    src={cand.avatarUrl}
                    alt={cand.candidateName}
                  />
                  <div className="flex flex-col">
                    <span className="text-[16px] font-semibold text-[#0b1c30]">
                      {cand.candidateName}
                    </span>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      {cand.matchingTechStack.map((skill: string) => (
                        <span
                          key={skill}
                          className="h-6 px-2.5 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] text-[#0284C7] text-[12px] font-medium flex items-center"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="px-2.5 py-1 rounded-full text-[12px] font-semibold bg-[#eaddff] text-[#630ed4] border border-[#d2bbff]">
                    {cand.matchScore}% Match
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: My Projects */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-[#dce9ff] shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-[#dce9ff] pb-4">
            <h2 className="text-[16px] font-semibold text-[#0b1c30]">My Projects</h2>
            <span className="text-[12px] text-[#4a4455]">Active Engagements</span>
          </div>

          <div className="flex flex-col gap-4">
            {/* Project 1: AI Event Assistant */}
            <div
              onClick={() => navigate('/workspace/proj-001')}
              className="p-4 rounded-xl border border-[#dce9ff] bg-white flex flex-col gap-3 cursor-pointer hover:border-[#ccc3d8] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold text-[#0b1c30]">
                  AI Event Assistant
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  In Progress
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[12px]">
                  <span className="text-[#4a4455]">Progress</span>
                  <span className="font-medium text-[#0b1c30]">70%</span>
                </div>
                <div className="w-full bg-[#e5eeff] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#7c3aed] to-[#2170e4] h-2 rounded-full transition-all duration-300"
                    style={{ width: '70%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Project 2: Student Management */}
            <div
              onClick={() => navigate('/workspace/proj-002')}
              className="p-4 rounded-xl border border-[#dce9ff] bg-white flex flex-col gap-3 cursor-pointer hover:border-[#ccc3d8] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold text-[#0b1c30]">
                  Student Management
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  Planning
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[12px]">
                  <span className="text-[#4a4455]">Progress</span>
                  <span className="font-medium text-[#0b1c30]">30%</span>
                </div>
                <div className="w-full bg-[#e5eeff] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#7c3aed] to-[#2170e4] h-2 rounded-full transition-all duration-300"
                    style={{ width: '30%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
