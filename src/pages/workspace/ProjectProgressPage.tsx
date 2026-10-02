import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWorkspaceStore } from '../../stores/useWorkspaceStore';
import { ProjectWorkspace } from '../../types';
import { MaterialIcon } from '../../components/common/MaterialIcon';

export const ProjectProgressPage: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const { workspaces, toggleMilestone } = useWorkspaceStore();

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
      tagline: 'Real-time intelligent attendee matchmaking copilot.',
      duration: '6 Weeks Duration',
      status: 'In Progress',
      progressPercentage: 70,
      filesCount: 3,
      tasksCount: 8,
      createdAt: '2025-02-01T08:00:00Z',
      milestones: [
        { id: 'm1', title: 'Requirements', category: 'Requirements', isCompleted: true },
        { id: 'm2', title: 'UI Design', category: 'UI Design', isCompleted: true },
        { id: 'm3', title: 'Database', category: 'Database', isCompleted: true },
        { id: 'm4', title: 'Backend API', category: 'Backend API', isCompleted: true },
        { id: 'm5', title: 'AI Integration', category: 'AI Integration', isCompleted: false },
        { id: 'm6', title: 'Testing', category: 'Testing', isCompleted: false },
      ],
      members: [],
    };

  const milestones =
    currentWorkspace.milestones && currentWorkspace.milestones.length > 0
      ? currentWorkspace.milestones
      : [
          { id: 'm1', title: 'Requirements', category: 'Requirements', isCompleted: true },
          { id: 'm2', title: 'UI Design', category: 'UI Design', isCompleted: true },
          { id: 'm3', title: 'Database', category: 'Database', isCompleted: true },
          { id: 'm4', title: 'Backend API', category: 'Backend API', isCompleted: true },
          { id: 'm5', title: 'AI Integration', category: 'AI Integration', isCompleted: false },
          { id: 'm6', title: 'Testing', category: 'Testing', isCompleted: false },
        ];

  const completedCount = milestones.filter((m) => m.isCompleted).length;
  const totalCount = milestones.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  // Circumference of 2 * pi * 30 = ~188.5
  const circumference = 188.5;
  const strokeDashoffset = circumference * (1 - percentage / 100);

  const handleToggle = (milestoneId: string) => {
    toggleMilestone(currentWorkspace.id, milestoneId);
  };

  return (
    <main className="flex-1 flex items-center justify-center p-6 lg:p-8 w-full max-w-[1440px] mx-auto bg-background">
      {/* Exactly One Centered Card */}
      <div className="w-full max-w-[480px] bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm p-6 flex flex-col gap-6">
        {/* Card Title & Navigation */}
        <div className="border-b border-outline-variant/30 pb-4 flex items-center justify-between">
          <h1 className="text-headline-md font-headline-md text-on-surface">Project Progress</h1>
          <button
            type="button"
            onClick={() => navigate(`/workspace/${currentWorkspace.id}`)}
            className="text-label-sm font-medium text-primary hover:underline flex items-center gap-1 transition-colors cursor-pointer"
          >
            <MaterialIcon icon="arrow_back" size={16} />
            <span>Back to Workspace</span>
          </button>
        </div>

        {/* Top Section of Card */}
        <div className="flex items-center gap-5 p-4 rounded-lg bg-surface border border-outline-variant/20">
          {/* Left: Circular Progress Indicator showing dynamic percentage in brand purple accent */}
          <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 72 72">
              {/* Background circle track */}
              <circle
                cx="36"
                cy="36"
                fill="transparent"
                r="30"
                stroke="#E2E8F0"
                strokeWidth="6"
              />
              {/* Progress circle */}
              <circle
                cx="36"
                cy="36"
                fill="transparent"
                r="30"
                stroke="#7C3AED"
                strokeDasharray="188.5"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="6"
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-label-md font-bold text-primary-container">
                {percentage}%
              </span>
            </div>
          </div>

          {/* Right: Overall Progress and Subtitle */}
          <div className="flex flex-col">
            <span className="text-headline-sm font-headline-sm text-on-surface">Overall Progress</span>
            <span className="text-body-sm font-body-sm text-tertiary">
              {completedCount} of {totalCount} tasks completed
            </span>
          </div>
        </div>

        {/* Checklist Section */}
        <div className="flex flex-col gap-2">
          {milestones.map((m) => {
            const isDone = m.isCompleted;
            return (
              <div
                key={m.id}
                onClick={() => handleToggle(m.id)}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                  isDone
                    ? 'bg-surface-container-low border border-outline-variant/20 hover:border-outline-variant'
                    : 'bg-surface border border-outline-variant/30 hover:border-outline'
                }`}
              >
                <span
                  className={`text-body-md font-body-md ${
                    isDone ? 'text-on-surface font-medium' : 'text-tertiary'
                  }`}
                >
                  {m.category || m.title}
                </span>

                {isDone ? (
                  <div className="flex items-center gap-1.5 text-emerald-600">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span className="text-label-sm font-label-sm">completed</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-tertiary">
                    <div className="w-4 h-4 rounded border border-outline bg-surface-container-lowest" />
                    <span className="text-label-sm font-label-sm">incomplete</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};
