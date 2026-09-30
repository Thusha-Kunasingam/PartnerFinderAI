import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MaterialIcon } from '../../components/common/MaterialIcon';

export const ProjectProgressPage: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const tasks = [
    { title: 'Requirements', completed: true },
    { title: 'UI Design', completed: true },
    { title: 'Database', completed: true },
    { title: 'Backend API', completed: true },
    { title: 'AI Integration', completed: false },
    { title: 'Testing', completed: false },
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-8 w-full max-w-[1440px] mx-auto bg-[#f8f9ff]">
      {/* Exactly One Centered Card */}
      <div className="w-full max-w-[480px] bg-white rounded-xl border border-[#ccc3d8]/40 shadow-sm p-6 flex flex-col gap-6">
        {/* Card Title */}
        <div className="border-b border-[#ccc3d8]/30 pb-4 flex items-center justify-between">
          <h1 className="text-[20px] font-semibold text-[#0b1c30]">Project Progress</h1>
          <button
            onClick={() => navigate(projectId ? `/workspace/${projectId}` : '/workspace/proj-001')}
            className="text-[12px] text-[#630ed4] hover:underline flex items-center gap-1"
          >
            <MaterialIcon icon="arrow_back" size={16} />
            Back to Workspace
          </button>
        </div>

        {/* Top Section: Circular Progress Indicator */}
        <div className="flex items-center gap-5 p-4 rounded-lg bg-[#f8f9ff] border border-[#ccc3d8]/20">
          <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 72 72">
              <circle
                cx="36"
                cy="36"
                fill="transparent"
                r="30"
                stroke="#E2E8F0"
                strokeWidth="6"
              />
              <circle
                cx="36"
                cy="36"
                fill="transparent"
                r="30"
                stroke="#7C3AED"
                strokeDasharray="188.5"
                strokeDashoffset="56.55"
                strokeLinecap="round"
                strokeWidth="6"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[14px] font-bold text-[#7c3aed]">70%</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-[16px] font-semibold text-[#0b1c30]">Overall Progress</span>
            <span className="text-[12px] text-[#474e64]">7 of 10 tasks completed</span>
          </div>
        </div>

        {/* Checklist Section */}
        <div className="flex flex-col gap-2">
          {tasks.map((task, i) => (
            <div
              key={i}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                task.completed
                  ? 'bg-[#eff4ff] border-[#ccc3d8]/20'
                  : 'bg-[#f8f9ff] border-[#ccc3d8]/30'
              }`}
            >
              <span
                className={`text-[14px] ${
                  task.completed ? 'text-[#0b1c30] font-medium' : 'text-[#474e64]'
                }`}
              >
                {task.title}
              </span>

              {task.completed ? (
                <div className="flex items-center gap-1.5 text-emerald-600">
                  <MaterialIcon icon="check_circle" size={20} fill />
                  <span className="text-[12px]">completed</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[#474e64]">
                  <div className="w-4 h-4 rounded border border-[#7b7487] bg-white"></div>
                  <span className="text-[12px]">incomplete</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
