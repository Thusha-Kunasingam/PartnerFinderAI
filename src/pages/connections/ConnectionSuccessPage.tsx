import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { SecondaryButton } from '../../components/common/SecondaryButton';
import { useMatchingStore } from '../../stores/useMatchingStore';

export const ConnectionSuccessPage: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const navigate = useNavigate();
  const { matches } = useMatchingStore();

  const candidate = matches.find((m) => m.candidateId === candidateId) || matches[0];

  return (
    <div className="flex-1 flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-[600px] bg-surface-container-lowest border border-border-standard rounded-2xl p-8 md:p-10 shadow-elevation-1 text-center">
        {/* Verified Success Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-300 text-emerald-600 mb-6 shadow-sm">
          <span className="material-symbols-outlined text-[44px]">check_circle</span>
        </div>

        <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface mb-2">
          You Are Connected!
        </h1>
        <p className="text-body-md text-on-surface-variant max-w-md mx-auto mb-8">
          You and <strong className="text-on-surface">{candidate.candidateName}</strong> are now connected to collaborate on{' '}
          <strong className="text-on-surface">AI Event Assistant</strong>.
        </p>

        {/* Connected Partner Card */}
        <div className="bg-surface-container-low border border-surface-container-high rounded-xl p-5 mb-8 text-left flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-surface-container border border-surface-container-high flex items-center justify-center font-bold text-secondary text-headline-sm flex-shrink-0">
              {candidate.initials}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-headline-sm text-on-surface">
                  {candidate.candidateName}
                </h3>
                <span className="material-symbols-outlined text-[16px] text-emerald-600">verified</span>
              </div>
              <p className="text-body-sm text-on-surface-variant">
                {candidate.title} • {candidate.university}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-label-xs text-outline font-medium block">Shared Project</span>
            <span className="text-label-sm font-semibold text-primary">AI Event Assistant (6W)</span>
          </div>
        </div>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <PrimaryButton
            icon="chat"
            iconPosition="left"
            onClick={() => navigate('/messages')}
            className="w-full sm:w-auto px-7"
          >
            Start Chat
          </PrimaryButton>

          <SecondaryButton
            icon="workspaces"
            iconPosition="left"
            onClick={() => navigate('/workspace/ai-event-assistant')}
            className="w-full sm:w-auto px-6"
          >
            View Collaboration
          </SecondaryButton>
        </div>

        <div>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-1.5 text-body-sm text-outline hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};
