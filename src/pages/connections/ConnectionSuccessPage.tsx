import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMatchingStore } from '../../stores/useMatchingStore';
import { MaterialIcon } from '../../components/common/MaterialIcon';

export const ConnectionSuccessPage: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const navigate = useNavigate();
  const { matches, requirementsDraft } = useMatchingStore();

  const candidate =
    matches.find((m) => m.candidateId === candidateId) || matches[0];

  const projectName = requirementsDraft.projectHeadline || 'AI Event Assistant';
  const duration = requirementsDraft.projectDuration
    ? requirementsDraft.projectDuration.split('(')[0].trim()
    : '6 Weeks';

  return (
    <div className="flex-grow flex items-center justify-center p-6 md:p-12 relative overflow-hidden min-h-[calc(100vh-64px)]">
      {/* Ambient Subtle Geometric Orbs */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-[#d2bbff]/20 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Centered Card Container (680px wide) */}
      <div className="relative w-full max-w-[680px] bg-white rounded-xl border border-[#E2E8F0] shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06),0_1px_3px_0_rgba(15,23,42,0.04)] p-8 md:p-12 text-center z-10 mx-auto">
        {/* Celebration Icon with Accent Confetti Elements */}
        <div className="relative inline-flex items-center justify-center mb-6">
          {/* Confetti & Micro Particle Accents */}
          <span className="absolute -top-3 -left-4 w-3 h-3 rounded-full bg-[#2170e4] opacity-80 animate-pulse" />
          <span className="absolute -top-4 right-1 w-2.5 h-2.5 rounded-full bg-[#7c3aed] opacity-70" />
          <span className="absolute bottom-1 -left-6 w-2 h-4 rotate-45 rounded-sm bg-[#d8e2ff] opacity-75" />
          <span className="absolute top-1/2 -right-7 w-3.5 h-1.5 rotate-12 rounded-sm bg-[#d2bbff]" />
          <span className="absolute -bottom-2 right-0 w-2.5 h-2.5 rounded-full bg-[#0058be] opacity-60" />

          {/* Subtle Glow Layer */}
          <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-xl scale-125" />

          {/* Main Checkmark Badge (80px) */}
          <div className="relative w-20 h-20 rounded-full bg-[#10B981] flex items-center justify-center text-white shadow-[0_8px_20px_-4px_rgba(16,185,129,0.38)]">
            <MaterialIcon icon="check" size={42} />
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-[32px] leading-10 font-bold text-[#0b1c30] mb-3 tracking-tight">
          You Are Connected!
        </h1>

        {/* Subtitle */}
        <p className="text-[16px] leading-6 text-[#474e64] max-w-[480px] mx-auto mb-8">
          You and {candidate?.candidateName || 'your partner'} are now connected to collaborate on {projectName}.
        </p>

        {/* Partner Summary Micro-Card */}
        <div className="bg-[#eff4ff]/70 border border-[#E2E8F0] rounded-xl p-5 mb-8 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors hover:border-[#CBD5E1]">
          <div className="flex items-center gap-4">
            {/* Monogram Avatar */}
            <div className="w-12 h-12 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center text-[#7c3aed] text-[18px] font-semibold shrink-0">
              {candidate?.initials || 'KT'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-semibold text-[#0b1c30]">
                  {candidate?.candidateName || 'K.Thulaanchan'}
                </span>
                <MaterialIcon icon="verified" size={18} className="text-[#0058be]" />
              </div>
              <p className="text-[12px] text-[#474e64] mt-0.5">
                {candidate?.title || 'Full Stack AI Developer'} • {candidate?.university || 'University of Jaffna'}
              </p>
            </div>
          </div>

          {/* Shared Project Tag Unit */}
          <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E2E8F0]">
            <span className="text-[11px] text-[#474e64]">Shared Project</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[14px] font-semibold text-[#0b1c30]">
                {projectName}
              </span>
              <span className="h-5 px-2 bg-[#E0F2FE] border border-[#BAE6FD] text-[#0284C7] rounded-full text-[11px] flex items-center font-medium">
                {duration}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons Stack */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Primary Button */}
          <button
            type="button"
            onClick={() => navigate('/messages')}
            className="w-full sm:w-auto h-[42px] px-6 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:brightness-105 text-white text-[14px] font-medium flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] shadow-sm cursor-pointer"
          >
            <MaterialIcon icon="chat" size={18} />
            <span>Start Chat</span>
          </button>

          {/* Secondary Button */}
          <button
            type="button"
            onClick={() => navigate('/workspace/ai-event-assistant')}
            className="w-full sm:w-auto h-[42px] px-5 rounded-lg bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#f8f9ff] text-[#0b1c30] text-[14px] font-medium flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer"
          >
            <MaterialIcon icon="workspaces" size={18} className="text-[#474e64]" />
            <span>View Collaboration</span>
          </button>
        </div>

        {/* Navigation Link Below */}
        <div className="mt-8 pt-6 border-t border-[#F1F5F9] flex flex-wrap items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-1.5 text-[#474e64] hover:text-[#7c3aed] text-[14px] transition-colors duration-150 cursor-pointer group"
          >
            <MaterialIcon icon="arrow_back" size={18} className="transition-transform duration-150 group-hover:-translate-x-1" />
            <span>Back to Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/connections/requests')}
            className="inline-flex items-center gap-1.5 text-[#474e64] hover:text-[#7c3aed] text-[14px] transition-colors duration-150 cursor-pointer"
          >
            <span>View All Requests</span>
            <MaterialIcon icon="arrow_forward" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
