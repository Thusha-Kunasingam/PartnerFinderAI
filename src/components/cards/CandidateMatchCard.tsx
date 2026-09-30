import React from 'react';
import { CandidateMatch } from '../../types';
import { MatchScoreBadge } from '../common/MatchScoreBadge';
import { SkillPill } from '../common/SkillPill';
import { PrimaryButton } from '../common/PrimaryButton';
import { SecondaryButton } from '../common/SecondaryButton';
import { cn } from '../../utils/cn';

interface CandidateMatchCardProps {
  candidate: CandidateMatch;
  onViewProfile: (id: string) => void;
  onSendRequest: (candidate: CandidateMatch) => void;
  onToggleBookmark: (id: string) => void;
  onViewExplanation?: (id: string) => void;
  className?: string;
}

export const CandidateMatchCard: React.FC<CandidateMatchCardProps> = ({
  candidate,
  onViewProfile,
  onSendRequest,
  onToggleBookmark,
  onViewExplanation,
  className,
}) => {
  return (
    <div
      className={cn(
        'p-6 rounded-xl border border-border-standard bg-surface-container-lowest shadow-elevation-1',
        'hover:border-border-input hover:shadow-elevation-2 transition-all duration-200 flex flex-col justify-between gap-4',
        className
      )}
    >
      <div>
        {/* Header: Avatar, Name, Title, Score */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            {candidate.avatarUrl ? (
              <img
                src={candidate.avatarUrl}
                alt={candidate.candidateName}
                className="w-12 h-12 rounded-full object-cover border border-surface-container-high flex-shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-surface-container-low border border-surface-container-high flex items-center justify-center font-bold text-secondary text-headline-sm flex-shrink-0">
                {candidate.initials}
              </div>
            )}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="text-headline-sm font-headline-sm text-on-surface font-semibold">
                  {candidate.candidateName}
                </h3>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {candidate.availabilityText}
                </span>
              </div>
              <p className="text-body-sm text-on-surface-variant mt-0.5">
                {candidate.title} • {candidate.location}
              </p>
            </div>
          </div>

          <MatchScoreBadge
            score={candidate.matchScore}
            onClick={() => onViewExplanation?.(candidate.candidateId)}
          />
        </div>

        {/* Bio */}
        <p className="text-body-md text-on-surface-variant line-clamp-2 mt-3.5">
          {candidate.bio}
        </p>

        {/* Dimensional Breakdown Chips */}
        <div className="flex items-center gap-3 mt-3 text-body-sm text-on-surface-variant">
          <span>
            Skills: <strong className="text-on-surface">{candidate.dimensionalScores.skillsMatch}%</strong>
          </span>
          <span>•</span>
          <span>
            Availability: <strong className="text-on-surface">{candidate.dimensionalScores.availability}%</strong>
          </span>
          <span>•</span>
          <span>
            Rating: <strong className="text-on-surface">★ {candidate.rating}</strong>
          </span>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3.5">
          {candidate.matchingTechStack.map((tech) => (
            <SkillPill key={tech} label={tech} />
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-surface-container-high mt-2">
        <button
          type="button"
          onClick={() => onToggleBookmark(candidate.candidateId)}
          className={cn(
            'p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-center',
            candidate.isBookmarked
              ? 'bg-primary-fixed border-primary-fixed-dim text-primary'
              : 'border-border-standard text-outline hover:text-on-surface hover:bg-surface-container-low'
          )}
          aria-label="Bookmark candidate"
        >
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: candidate.isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
          >
            bookmark
          </span>
        </button>

        <div className="flex items-center gap-2.5 flex-1 justify-end">
          <SecondaryButton onClick={() => onViewProfile(candidate.candidateId)}>
            View Full Profile
          </SecondaryButton>
          <PrimaryButton
            icon="person_add"
            iconPosition="left"
            onClick={() => onSendRequest(candidate)}
          >
            Send Connection Request
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
