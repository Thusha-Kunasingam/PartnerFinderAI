import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { useMatchingStore } from '../../stores/useMatchingStore';

export const MatchExplanationPage: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const navigate = useNavigate();
  const { matches } = useMatchingStore();

  const candidate = matches.find((m) => m.candidateId === candidateId) || matches[0];

  return (
    <div className="w-full max-w-[760px] mx-auto flex flex-col gap-6 py-6">
      {/* Back Link */}
      <button
        type="button"
        onClick={() => navigate('/matches')}
        className="self-start inline-flex items-center gap-2 text-label-md text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
      >
        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        <span>Back to results</span>
      </button>

      {/* Main Card */}
      <div className="bg-surface-container-lowest border border-border-standard rounded-2xl p-8 md:p-10 shadow-elevation-1">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-fixed border-4 border-primary-fixed-dim text-primary mb-4 shadow-sm">
            <span className="text-3xl font-bold font-mono">{candidate.matchScore}%</span>
          </div>
          <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface">
            Why {candidate.candidateName} is a good match?
          </h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Here's why our algorithmic engine thinks you will collaborate smoothly.
          </p>
        </div>

        {/* Qualitative Rationale Checklist */}
        <div className="bg-surface-container-low rounded-xl p-6 border border-surface-container mb-8">
          <h2 className="text-headline-sm font-semibold text-on-surface mb-4">
            Key Compatibility Factors
          </h2>
          <div className="flex flex-col gap-3">
            {candidate.matchingRationale.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </span>
                <span className="text-body-md text-on-surface font-medium">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dimensional Scoring Breakdown */}
        <div className="space-y-4 mb-8">
          <h2 className="text-headline-sm font-semibold text-on-surface mb-3">
            Dimensional Scoring Matrix
          </h2>

          <div>
            <div className="flex justify-between text-body-sm font-medium mb-1.5">
              <span>Skills Match (Weight: 40%)</span>
              <span className="text-primary font-bold">{candidate.dimensionalScores.skillsMatch}%</span>
            </div>
            <div className="h-2 rounded-full bg-surface-container overflow-hidden">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-primary-container to-secondary-container"
                style={{ width: `${candidate.dimensionalScores.skillsMatch}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-body-sm font-medium mb-1.5">
              <span>Availability & Schedule Overlap (Weight: 25%)</span>
              <span className="text-primary font-bold">{candidate.dimensionalScores.availability}%</span>
            </div>
            <div className="h-2 rounded-full bg-surface-container overflow-hidden">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-primary-container to-secondary-container"
                style={{ width: `${candidate.dimensionalScores.availability}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-body-sm font-medium mb-1.5">
              <span>Interests & Learning Goals (Weight: 20%)</span>
              <span className="text-primary font-bold">{candidate.dimensionalScores.interests}%</span>
            </div>
            <div className="h-2 rounded-full bg-surface-container overflow-hidden">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-primary-container to-secondary-container"
                style={{ width: `${candidate.dimensionalScores.interests}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-body-sm font-medium mb-1.5">
              <span>Location & Mode Alignment (Weight: 15%)</span>
              <span className="text-primary font-bold">{candidate.dimensionalScores.location}%</span>
            </div>
            <div className="h-2 rounded-full bg-surface-container overflow-hidden">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-primary-container to-secondary-container"
                style={{ width: `${candidate.dimensionalScores.location}%` }}
              />
            </div>
          </div>
        </div>

        {/* View Profile CTA */}
        <div className="flex justify-center pt-4 border-t border-border-standard">
          <PrimaryButton
            icon="arrow_forward"
            iconPosition="right"
            onClick={() => navigate(`/candidates/${candidate.candidateId}`)}
            className="h-11 px-8"
          >
            View Full Profile
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
