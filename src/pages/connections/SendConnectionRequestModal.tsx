import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { SecondaryButton } from '../../components/common/SecondaryButton';
import { Textarea } from '../../components/common/Textarea';
import { useMatchingStore } from '../../stores/useMatchingStore';
import { useConnectionStore } from '../../stores/useConnectionStore';

export const SendConnectionRequestModal: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const navigate = useNavigate();
  const { matches } = useMatchingStore();
  const { sendRequest } = useConnectionStore();

  const candidate = matches.find((m) => m.candidateId === candidateId) || matches[0];
  const [message, setMessage] = useState(
    `Hi ${candidate.candidateName},\nI'm working on an AI Event Assistant and looking for someone with Python and AI experience. Would you like to collaborate?`
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendRequest(
      candidate.candidateId,
      candidate.candidateName,
      'AI Event Assistant',
      message
    );
    navigate(`/connections/success/${candidate.candidateId}`);
  };

  return (
    <div className="w-full max-w-[620px] mx-auto p-6 md:p-8 bg-surface-container-lowest border border-border-standard rounded-2xl shadow-elevation-1 my-8">
      <div className="flex items-center justify-between pb-4 border-b border-border-standard mb-6">
        <h1 className="text-headline-md font-headline-md font-bold text-on-surface">
          Send Connection Request
        </h1>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-outline hover:text-on-surface cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>
      </div>

      <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high flex items-center justify-between mb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-surface-container border border-surface-container-high flex items-center justify-center font-bold text-secondary text-headline-sm">
            {candidate.initials}
          </div>
          <div>
            <h3 className="font-semibold text-headline-sm text-on-surface">
              To: {candidate.candidateName}
            </h3>
            <p className="text-body-sm text-on-surface-variant">
              {candidate.title} • {candidate.university}
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full text-label-sm font-bold bg-primary-fixed text-primary border border-primary-fixed-dim">
          {candidate.matchScore}% Match
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Textarea
          label="Message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          helperText="Introduce yourself and explain why you want to collaborate on this project."
          required
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-standard">
          <SecondaryButton type="button" onClick={() => navigate(-1)}>
            Cancel
          </SecondaryButton>
          <PrimaryButton type="submit" icon="send" iconPosition="right" className="px-6">
            Send Request
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};
