import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWorkspaceStore } from '../../stores/useWorkspaceStore';
import { ProjectWorkspace, WorkspaceMember } from '../../types';
import { MaterialIcon } from '../../components/common/MaterialIcon';

export const CollaborationWorkspacePage: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const { workspaces } = useWorkspaceStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'members' | 'files'>('members');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  // Dynamic project lookup
  const currentWorkspace: ProjectWorkspace =
    workspaces.find(
      (w) =>
        w.id === projectId ||
        (projectId === 'proj-001' && w.id === 'ai-event-assistant') ||
        (projectId === 'proj-002' && w.id === 'student-management')
    ) ||
    workspaces[0] || {
      id: 'ai-event-assistant',
      name: 'AI Event Assistant',
      tagline:
        'Real-time intelligent attendee matchmaking and interactive scheduling copilot powered by hybrid LLM vectors.',
      duration: '6 Weeks Duration',
      status: 'In Progress',
      progressPercentage: 70,
      filesCount: 3,
      tasksCount: 8,
      createdAt: '2025-02-01T08:00:00Z',
      milestones: [],
      members: [
        {
          userId: 'user-thusha',
          name: 'K.Thusha',
          initials: 'KT',
          role: 'Project Lead (You)',
          isActive: true,
          skills: ['Frontend', 'Angular', 'TypeScript'],
        },
        {
          userId: 'k-thulaanchan',
          name: 'K.Thulaanchan',
          initials: 'KT',
          role: 'Collaborator',
          isActive: true,
          skills: ['Backend', 'Python', 'AI / Fast-API'],
        },
        {
          userId: 'v-vishanan',
          name: 'V.Vishanan',
          initials: 'VV',
          role: 'Collaborator',
          isActive: true,
          skills: ['Product Design', 'UI/UX', 'Figma'],
        },
        {
          userId: 's-priyanka',
          name: 'S.Priyanka',
          initials: 'SP',
          role: 'Collaborator',
          isActive: true,
          skills: ['Data Science', 'Machine Learning'],
        },
      ],
    };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const copyInviteLink = () => {
    const inviteUrl = `${window.location.origin}/workspace/${currentWorkspace.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(inviteUrl);
    }
    showToast('Project invite link copied to clipboard!');
  };

  return (
    <main className="flex-1 py-10 px-6 sm:px-8 max-w-[1440px] w-full mx-auto flex flex-col items-center justify-start bg-background">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2.5 z-50 animate-in fade-in slide-in-from-bottom-3">
          <span className="material-symbols-outlined text-[18px] text-emerald-400">check_circle</span>
          <span className="text-body-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Settings Modal */}
      {settingsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px]">
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high shadow-2xl p-6 w-full max-w-[500px] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <h2 className="text-headline-sm font-semibold text-on-surface">Project Settings</h2>
              <button
                type="button"
                onClick={() => setSettingsModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <MaterialIcon icon="close" size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-label-sm font-semibold text-on-surface block mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  defaultValue={currentWorkspace.name}
                  className="w-full h-11 px-3.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md text-on-surface"
                />
              </div>
              <div>
                <label className="text-label-sm font-semibold text-on-surface block mb-1">
                  Duration & Status
                </label>
                <input
                  type="text"
                  defaultValue={`${currentWorkspace.status} • ${currentWorkspace.duration}`}
                  className="w-full h-11 px-3.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md text-on-surface"
                />
              </div>
              <div>
                <label className="text-label-sm font-semibold text-on-surface block mb-1">
                  Tagline / Description
                </label>
                <textarea
                  defaultValue={currentWorkspace.tagline}
                  rows={3}
                  className="w-full p-3.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md text-on-surface"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-surface-container-high">
              <button
                type="button"
                onClick={() => setSettingsModalOpen(false)}
                className="h-10 px-4 rounded-lg border border-outline-variant text-on-surface text-label-md"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setSettingsModalOpen(false);
                  showToast('Project settings saved successfully.');
                }}
                className="h-10 px-5 rounded-lg bg-gradient-to-r from-primary-container to-secondary-container text-white text-label-md font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Centered Workspace Card Container (~1000px max width) */}
      <div className="w-full max-w-[1000px] bg-surface-container-lowest rounded-xl border border-outline-variant/50 shadow-sm overflow-hidden flex flex-col transition-all">
        {/* 1. Workspace Header */}
        <div className="p-6 md:p-8 border-b border-surface-container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              {/* Breadcrumb / Badge */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-label-xs font-label-xs bg-surface-container text-tertiary">
                  <span className="material-symbols-outlined text-[14px]">folder_managed</span>
                  Project Workspace
                </span>
                <span className="text-outline text-body-sm font-body-sm">•</span>
                <span className="text-outline text-body-sm font-body-sm">Created 3 days ago</span>
              </div>

              {/* Title & Status Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-display-lg font-display-lg text-on-surface tracking-tight">
                  {currentWorkspace.name}
                </h1>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-label-sm font-label-sm bg-primary-fixed text-primary font-medium border border-primary-fixed-dim/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {currentWorkspace.status} • {currentWorkspace.duration}
                </span>
              </div>
              <p className="text-body-md font-body-md text-on-surface-variant max-w-2xl">
                {currentWorkspace.tagline}
              </p>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-3 self-start md:self-center shrink-0">
              {/* Outlined Project Settings Button */}
              <button
                type="button"
                onClick={() => setSettingsModalOpen(true)}
                className="h-[42px] px-4 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-bright hover:border-outline font-label-md text-label-md flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-tertiary">settings</span>
                <span>Project Settings</span>
              </button>

              {/* Primary Purple Action Button */}
              <button
                type="button"
                onClick={() => navigate('/matches')}
                className="custom-gradient-btn h-[42px] px-5 rounded-lg text-surface-container-lowest font-label-md text-label-md flex items-center gap-2 active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">person_add</span>
                <span>+ Add Member</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Navigation Tabs Bar */}
        <div className="px-6 md:px-8 border-b border-surface-container bg-surface-bright flex items-center gap-8 overflow-x-auto">
          {/* Overview */}
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`py-4 text-label-md font-label-md border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'text-primary font-semibold border-primary-container'
                : 'text-on-surface-variant hover:text-on-surface border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">dashboard</span>
            <span>Overview</span>
          </button>

          {/* Tasks */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('tasks');
              navigate(`/workspace/${currentWorkspace.id}/progress`);
            }}
            className={`py-4 text-label-md font-label-md border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'tasks'
                ? 'text-primary font-semibold border-primary-container'
                : 'text-on-surface-variant hover:text-on-surface border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Tasks</span>
            <span className="px-2 py-0.5 rounded-full text-label-xs font-label-xs bg-surface-container-high text-on-surface-variant">
              {currentWorkspace.tasksCount || 8}
            </span>
          </button>

          {/* Members (ACTIVE Tab with Purple Indicator) */}
          <button
            type="button"
            onClick={() => setActiveTab('members')}
            className={`py-4 text-label-md font-label-md border-b-2 transition-colors flex items-center gap-2 relative whitespace-nowrap cursor-pointer ${
              activeTab === 'members'
                ? 'text-primary font-semibold border-primary-container'
                : 'text-on-surface-variant hover:text-on-surface border-transparent'
            }`}
          >
            <span
              className="material-symbols-outlined text-[18px] text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              group
            </span>
            <span>Members</span>
            <span className="px-2 py-0.5 rounded-full text-label-xs font-label-xs bg-primary-fixed text-primary font-semibold">
              {currentWorkspace.members.length}
            </span>
          </button>

          {/* Files */}
          <button
            type="button"
            onClick={() => setActiveTab('files')}
            className={`py-4 text-label-md font-label-md border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'files'
                ? 'text-primary font-semibold border-primary-container'
                : 'text-on-surface-variant hover:text-on-surface border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">folder</span>
            <span>Files</span>
            <span className="px-2 py-0.5 rounded-full text-label-xs font-label-xs bg-surface-container-high text-on-surface-variant">
              {currentWorkspace.filesCount || 3}
            </span>
          </button>
        </div>

        {/* 3. Tab Content Area */}
        <div className="p-6 md:p-8 flex flex-col gap-6">
          {/* Section Header Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-surface-container">
            <div>
              <h2 className="text-headline-sm font-headline-sm text-on-surface">
                Team Members ({currentWorkspace.members.length})
              </h2>
              <p className="text-body-sm font-body-sm text-on-surface-variant">
                Collaborate and coordinate roles on {currentWorkspace.name}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-label-xs font-label-xs text-tertiary">
                Match Compatibility:{' '}
                <strong className="text-primary font-semibold">96% High Alignment</strong>
              </span>
            </div>
          </div>

          {/* Member List Container (Structured Cards Grid) */}
          <div className="space-y-3">
            {currentWorkspace.members.map((member: WorkspaceMember) => {
              const isLead = member.role.includes('Lead');
              const initials =
                member.initials ||
                member.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2);

              return (
                <div
                  key={member.userId}
                  className="p-4 rounded-xl border border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-bright/80 hover:border-outline-variant transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-start md:items-center gap-4">
                    {/* Avatar Circle */}
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-label-md shrink-0 shadow-sm border ${
                        isLead
                          ? 'bg-primary-fixed border-primary-fixed-dim text-primary'
                          : 'bg-secondary-fixed text-secondary border-secondary-fixed-dim'
                      }`}
                    >
                      {initials}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-headline-sm font-headline-sm text-on-surface">
                          {member.name}
                        </span>
                        {isLead ? (
                          <span className="px-2.5 py-0.5 rounded-full text-label-xs font-label-xs bg-primary text-on-primary font-semibold">
                            Project Lead (You)
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-label-xs font-label-xs bg-surface-container text-tertiary font-medium">
                            Collaborator
                          </span>
                        )}
                        {/* Active Status Pill */}
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-label-xs font-label-xs bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      </div>

                      {/* Skills / Responsibilities Pills */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        {member.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-0.5 rounded-full text-label-xs font-label-xs bg-secondary-fixed text-on-secondary-fixed-variant border border-secondary-fixed-dim/60 font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions / Status */}
                  <div className="flex items-center gap-2 self-end md:self-center">
                    {isLead ? (
                      <span className="inline-flex items-center gap-1 text-label-xs font-label-xs text-primary font-semibold px-3 py-1.5 bg-primary-fixed/40 rounded-lg">
                        <span className="material-symbols-outlined text-[16px]">stars</span>
                        Lead Owner
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => navigate(`/messages?user=${member.userId}`)}
                        className="h-9 px-3.5 rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-bright text-on-surface text-label-sm font-label-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px] text-tertiary">
                          chat
                        </span>
                        <span>Message</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/candidates/${member.userId === 'user-thusha' ? 'k-thulaanchan' : member.userId}`)
                      }
                      className="w-9 h-9 rounded-lg border border-outline-variant flex items-center justify-center text-tertiary hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                      title="More options"
                    >
                      <span className="material-symbols-outlined text-[18px]">more_vert</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4. Bottom Action / Collaboration Quick Summary */}
          <div className="mt-4 pt-4 border-t border-surface-container flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Inset Milestone Alert Box */}
            <div
              onClick={() => navigate(`/workspace/${currentWorkspace.id}/progress`)}
              className="w-full md:flex-1 p-3.5 rounded-lg bg-surface-container-low border border-surface-container-highest flex items-center gap-3 cursor-pointer hover:border-primary-container transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">flag</span>
              </span>
              <div className="text-body-sm font-body-sm text-on-surface">
                <span className="font-semibold text-on-surface">Next Milestone:</span> API Integration & Prototype Review —{' '}
                <span className="text-primary font-medium">Due in 5 days</span>
              </div>
            </div>

            {/* Secondary Link Invite Trigger */}
            <button
              type="button"
              onClick={copyInviteLink}
              className="w-full md:w-auto h-[42px] px-5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-bright hover:border-outline font-label-md text-label-md flex items-center justify-center gap-2 shrink-0 transition-all active:scale-[0.98] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">link</span>
              <span>Invite Partner via Link</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
