import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CandidateMatchCard } from '../../components/cards/CandidateMatchCard';
import { SecondaryButton } from '../../components/common/SecondaryButton';
import { ModalContainer } from '../../components/feedback/ModalContainer';
import { Textarea } from '../../components/common/Textarea';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { useMatchingStore } from '../../stores/useMatchingStore';
import { useConnectionStore } from '../../stores/useConnectionStore';
import { CandidateMatch } from '../../types';
import { cn } from '../../utils/cn';

export const MatchingResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    activeFilter,
    setActiveFilter,
    sortBy,
    setSortBy,
    toggleBookmark,
    getFilteredMatches,
  } = useMatchingStore();

  const { sendRequest } = useConnectionStore();

  const [selectedCandidate, setSelectedCandidate] = useState<CandidateMatch | null>(null);
  const [pitchMessage, setPitchMessage] = useState('');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const filteredMatches = getFilteredMatches();

  const handleOpenRequest = (candidate: CandidateMatch) => {
    setSelectedCandidate(candidate);
    setPitchMessage(
      `Hi ${candidate.candidateName},\nI'm working on an AI Event Assistant and looking for someone with ${candidate.matchingTechStack.slice(0, 2).join(' and ')} experience. Would you like to collaborate?`
    );
    setIsRequestModalOpen(true);
  };

  const handleSendRequest = () => {
    if (selectedCandidate) {
      sendRequest(
        selectedCandidate.candidateId,
        selectedCandidate.candidateName,
        'AI Event Assistant',
        pitchMessage
      );
      setIsRequestModalOpen(false);
      navigate(`/connections/success/${selectedCandidate.candidateId}`);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Context Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-xl bg-surface-container-lowest border border-border-standard shadow-elevation-1">
        <div>
          <div className="flex items-center gap-2 text-label-xs text-primary font-semibold uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[16px]">folder_managed</span>
            <span>Project: AI Event Assistant • Matched {filteredMatches.length} candidates</span>
          </div>
          <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface">
            Potential Partners
          </h1>
          <p className="text-body-sm text-on-surface-variant mt-1">
            We found matches for your project based on skills, schedule overlap, and experience.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-fixed border border-primary-fixed-dim text-primary text-label-xs font-semibold select-none">
            <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
            <span>AI Match Engine v4.2 Active</span>
          </div>
          <SecondaryButton
            icon="tune"
            iconPosition="left"
            onClick={() => navigate('/requirements/new')}
          >
            Refine Requirements
          </SecondaryButton>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {(
            [
              { key: 'all', label: 'All (8)' },
              { key: '90+', label: '90%+ Match (3)' },
              { key: 'weekends', label: 'Available Weekends (5)' },
            ] as const
          ).map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveFilter(f.key)}
              className={cn(
                'h-9 px-4 rounded-full text-label-sm font-medium transition-all duration-150 cursor-pointer border select-none',
                activeFilter === f.key
                  ? 'bg-primary-container text-white border-primary-container shadow-sm'
                  : 'bg-surface-container-lowest text-on-surface border-border-standard hover:border-border-input hover:bg-surface-container-low'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 text-label-sm text-on-surface-variant">
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-9 px-3 bg-surface-container-lowest border border-border-standard rounded-lg text-body-sm text-on-surface focus:outline-none focus:border-primary-container cursor-pointer"
          >
            <option value="score">Best Match (Highest Score)</option>
            <option value="availability">Availability (Most Open)</option>
            <option value="experience">Project Rating (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMatches.map((candidate) => (
          <CandidateMatchCard
            key={candidate.candidateId}
            candidate={candidate}
            onViewProfile={(id) => navigate(`/candidates/${id}`)}
            onSendRequest={handleOpenRequest}
            onToggleBookmark={toggleBookmark}
            onViewExplanation={(id) => navigate(`/matches/${id}/explanation`)}
          />
        ))}
      </div>

      {/* Load More Action */}
      <div className="flex justify-center pt-4">
        <SecondaryButton
          icon="keyboard_arrow_down"
          iconPosition="right"
          className="h-11 px-8 text-label-md"
        >
          Load More Matches
        </SecondaryButton>
      </div>

      {/* Send Connection Request Modal */}
      <ModalContainer
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        title="Send Connection Request"
      >
        {selectedCandidate && (
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container border border-surface-container-high flex items-center justify-center font-bold text-secondary text-label-md">
                  {selectedCandidate.initials}
                </div>
                <div>
                  <h4 className="text-label-md font-semibold text-on-surface">
                    To: {selectedCandidate.candidateName}
                  </h4>
                  <p className="text-body-sm text-on-surface-variant">
                    {selectedCandidate.title} • {selectedCandidate.university}
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-label-xs font-bold bg-primary-fixed text-primary">
                {selectedCandidate.matchScore}% Match
              </span>
            </div>

            <Textarea
              label="Custom Invitation Message"
              rows={4}
              value={pitchMessage}
              onChange={(e) => setPitchMessage(e.target.value)}
              helperText="Introduce yourself and explain why you want to collaborate on this project."
            />

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-standard">
              <SecondaryButton onClick={() => setIsRequestModalOpen(false)}>
                Cancel
              </SecondaryButton>
              <PrimaryButton icon="send" iconPosition="right" onClick={handleSendRequest}>
                Send Request
              </PrimaryButton>
            </div>
          </div>
        )}
      </ModalContainer>
    </div>
  );
};
