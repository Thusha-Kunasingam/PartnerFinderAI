import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MaterialIcon } from '../../components/common/MaterialIcon';
import { useWorkspaceStore } from '../../stores/useWorkspaceStore';
import { ProjectWorkspace, WorkspaceMember } from '../../types';

export const CollaborationWorkspacePage: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const { workspaces } = useWorkspaceStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'members' | 'files'>('members');

  const defaultWorkspace: ProjectWorkspace = {
    id: 'ai-event-assistant',
    name: 'AI Event Assistant',
    tagline: 'Real-time intelligent attendee matchmaking and interactive scheduling copilot powered by hybrid LLM vectors.',
    duration: '6 Weeks Duration',
    status: 'In Progress',
    progressPercentage: 70,
    filesCount: 3,
    tasksCount: 8,
    createdAt: new Date().toISOString(),
    milestones: [],
    members: [
      {
        userId: 'user-001',
        name: 'K.Thusha',
        initials: 'KT',
        role: 'Project Lead (You)',
        isActive: true,
        skills: ['Frontend', 'Angular', 'TypeScript'],
        matchCompatibility: 100,
      },
      {
        userId: 'cand-001',
        name: 'K.Thulaanchan',
        initials: 'KT',
        role: 'Collaborator',
        isActive: true,
        skills: ['Backend', 'Python', 'AI / Fast-API'],
        matchCompatibility: 91,
      },
      {
        userId: 'cand-002',
        name: 'V.Vishanan',
        initials: 'VV',
        role: 'Collaborator',
        isActive: true,
        skills: ['Product Design', 'UI/UX', 'Figma'],
        matchCompatibility: 86,
      },
      {
        userId: 'cand-003',
        name: 'S.Priyanka',
        initials: 'SP',
        role: 'Collaborator',
        isActive: true,
        skills: ['Data Science', 'Machine Learning'],
        matchCompatibility: 82,
      },
    ],
  };

  const currentWorkspace =
    workspaces.find((w: ProjectWorkspace) => w.id === projectId) || workspaces[0] || defaultWorkspace;

  return (
    <div className="flex-1 py-10 px-6 sm:px-8 max-w-[1440px] w-full mx-auto flex flex-col items-center justify-start bg-[#f8f9ff]">
      {/* Centered Workspace Card Container (~1000px max width) */}
      <div className="w-full max-w-[1000px] bg-white rounded-xl border border-[#ccc3d8]/50 shadow-sm overflow-hidden flex flex-col transition-all">
        {/* 1. Workspace Header */}
        <div className="p-6 md:p-8 border-b border-[#e5eeff]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              {/* Breadcrumb / Badge */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#e5eeff] text-[#474e64]">
                  <MaterialIcon icon="folder_managed" size={14} />
                  Project Workspace
                </span>
                <span className="text-[#7b7487] text-[12px]">•</span>
                <span className="text-[#7b7487] text-[12px]">Created 3 days ago</span>
              </div>

              {/* Title & Status Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-[32px] font-bold text-[#0b1c30] tracking-tight leading-tight">
                  {currentWorkspace.name}
                </h1>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] bg-[#eaddff] text-[#630ed4] font-medium border border-[#d2bbff]/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#630ed4] animate-pulse"></span>
                  {currentWorkspace.status} • {currentWorkspace.duration}
                </span>
              </div>
              <p className="text-[14px] text-[#4a4455] max-w-2xl leading-normal">
                {currentWorkspace.tagline}
              </p>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-3 self-start md:self-center shrink-0">
              <button
                onClick={() => navigate(`/workspace/${currentWorkspace.id}/progress`)}
                className="h-[42px] px-4 rounded-lg bg-white border border-[#ccc3d8] text-[#0b1c30] hover:bg-[#f8f9ff] font-medium text-[14px] flex items-center gap-2 transition-all active:scale-[0.98]"
              >
                <MaterialIcon icon="timeline" size={18} className="text-[#474e64]" />
                <span>View Progress</span>
              </button>
              <button className="h-[42px] px-5 rounded-lg text-white font-medium text-[14px] flex items-center gap-2 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] shadow-[0_4px_14px_0_rgba(124,58,237,0.35)] hover:brightness-105 transition-all active:scale-[0.98]">
                <MaterialIcon icon="person_add" size={18} />
                <span>+ Add Member</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Navigation Tabs Bar */}
        <div className="px-6 md:px-8 border-b border-[#e5eeff] bg-[#f8f9ff] flex items-center gap-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 text-[14px] flex items-center gap-1.5 transition-colors border-b-2 ${
              activeTab === 'overview'
                ? 'font-semibold text-[#630ed4] border-[#7c3aed]'
                : 'text-[#4a4455] hover:text-[#0b1c30] border-transparent'
            }`}
          >
            <MaterialIcon icon="dashboard" size={18} />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('tasks')}
            className={`py-4 text-[14px] flex items-center gap-2 transition-colors border-b-2 ${
              activeTab === 'tasks'
                ? 'font-semibold text-[#630ed4] border-[#7c3aed]'
                : 'text-[#4a4455] hover:text-[#0b1c30] border-transparent'
            }`}
          >
            <MaterialIcon icon="check_circle" size={18} />
            <span>Tasks</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] bg-[#dce9ff] text-[#4a4455]">
              {currentWorkspace.tasksCount || 8}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('members')}
            className={`py-4 text-[14px] flex items-center gap-2 transition-colors border-b-2 relative ${
              activeTab === 'members'
                ? 'font-semibold text-[#630ed4] border-[#7c3aed]'
                : 'text-[#4a4455] hover:text-[#0b1c30] border-transparent'
            }`}
          >
            <MaterialIcon
              icon="group"
              size={18}
              fill={activeTab === 'members'}
              className={activeTab === 'members' ? 'text-[#630ed4]' : ''}
            />
            <span>Members</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] bg-[#eaddff] text-[#630ed4] font-semibold">
              {currentWorkspace.members.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('files')}
            className={`py-4 text-[14px] flex items-center gap-2 transition-colors border-b-2 ${
              activeTab === 'files'
                ? 'font-semibold text-[#630ed4] border-[#7c3aed]'
                : 'text-[#4a4455] hover:text-[#0b1c30] border-transparent'
            }`}
          >
            <MaterialIcon icon="folder" size={18} />
            <span>Files</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] bg-[#dce9ff] text-[#4a4455]">
              {currentWorkspace.filesCount || 3}
            </span>
          </button>
        </div>

        {/* 3. Tab Content */}
        <div className="p-6 md:p-8 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e5eeff]">
            <div>
              <h2 className="text-[16px] font-semibold text-[#0b1c30]">
                Team Members ({currentWorkspace.members.length})
              </h2>
              <p className="text-[12px] text-[#4a4455]">
                Collaborate and coordinate roles on {currentWorkspace.name}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#474e64]">
                Match Compatibility:{' '}
                <strong className="text-[#630ed4] font-semibold">96% High Alignment</strong>
              </span>
            </div>
          </div>

          {/* Member List Cards */}
          <div className="space-y-3">
            {currentWorkspace.members.map((member: WorkspaceMember) => {
              const initials =
                member.initials ||
                member.name
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')
                  .slice(0, 2);
              const isLead = member.role.includes('Lead');

              return (
                <div
                  key={member.userId}
                  className="p-4 rounded-xl border border-[#ccc3d8]/40 bg-white hover:bg-[#f8f9ff]/80 hover:border-[#ccc3d8] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-start md:items-center gap-4">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-[14px] shrink-0 shadow-sm border ${
                        isLead
                          ? 'bg-[#eaddff] border-[#d2bbff] text-[#630ed4]'
                          : 'bg-[#d8e2ff] border-[#adc6ff] text-[#0058be]'
                      }`}
                    >
                      {initials}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-[16px] font-semibold text-[#0b1c30]">
                          {member.name}
                        </span>
                        {isLead ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-[#630ed4] text-white font-semibold">
                            Project Lead (You)
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-[#e5eeff] text-[#474e64] font-medium">
                            Collaborator
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Active
                        </span>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        {member.skills.map((s: string) => (
                          <span
                            key={s}
                            className="px-2.5 py-0.5 rounded-full text-[11px] bg-[#d8e2ff] text-[#004395] border border-[#adc6ff]/60 font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end md:self-center">
                    {isLead ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#630ed4] font-semibold px-3 py-1.5 bg-[#eaddff]/40 rounded-lg">
                        <MaterialIcon icon="stars" size={16} />
                        Lead Owner
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => navigate('/messages')}
                          className="h-9 px-3.5 rounded-lg border border-[#ccc3d8] bg-white hover:bg-[#f8f9ff] text-[#0b1c30] text-[12px] font-medium flex items-center gap-1.5 transition-colors"
                        >
                          <MaterialIcon icon="chat" size={16} className="text-[#474e64]" />
                          <span>Message</span>
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/workspace/${currentWorkspace.id}/rate/${member.userId}`)
                          }
                          className="h-9 px-3.5 rounded-lg border border-[#ccc3d8] bg-white hover:bg-[#f8f9ff] text-[#630ed4] text-[12px] font-medium flex items-center gap-1.5 transition-colors"
                        >
                          <MaterialIcon icon="star" size={16} className="text-amber-500" />
                          <span>Rate</span>
                        </button>
                      </>
                    )}
                    <button className="w-9 h-9 rounded-lg border border-[#ccc3d8] flex items-center justify-center text-[#474e64] hover:text-[#0b1c30] hover:bg-[#e5eeff] transition-colors">
                      <MaterialIcon icon="more_vert" size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4. Bottom Milestone Callout */}
          <div className="mt-4 pt-4 border-t border-[#e5eeff] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:flex-1 p-3.5 rounded-lg bg-[#eff4ff] border border-[#d3e4fe] flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#eaddff] text-[#630ed4] flex items-center justify-center shrink-0">
                <MaterialIcon icon="flag" size={18} />
              </span>
              <div className="text-[12px] text-[#0b1c30]">
                <span className="font-semibold text-[#0b1c30]">Next Milestone:</span> API
                Integration & Prototype Review —{' '}
                <span className="text-[#630ed4] font-medium">Due in 5 days</span>
              </div>
            </div>
            <button className="w-full md:w-auto h-[42px] px-5 rounded-lg border border-[#ccc3d8] bg-white text-[#0b1c30] hover:bg-[#f8f9ff] font-medium text-[14px] flex items-center justify-center gap-2 shrink-0 transition-all active:scale-[0.98]">
              <MaterialIcon icon="link" size={18} className="text-[#630ed4]" />
              <span>Invite Partner via Link</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
