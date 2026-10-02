import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMatchingStore } from '../../stores/useMatchingStore';
import { MaterialIcon } from '../../components/common/MaterialIcon';
import { calculateMatchScore } from '../../utils/matchCalculator';

export const MatchExplanationPage: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const navigate = useNavigate();
  const { matches } = useMatchingStore();

  const candidate =
    matches.find((m) => m.candidateId === candidateId) || matches[0];

  if (!candidate) {
    return (
      <div className="flex-1 w-full max-w-[860px] mx-auto p-12 text-center">
        <h2 className="text-[20px] font-semibold text-[#0b1c30]">Candidate Not Found</h2>
        <button
          onClick={() => navigate('/matches')}
          className="mt-4 px-4 py-2 bg-[#7C3AED] text-white rounded-lg text-[14px]"
        >
          Back to Matches
        </button>
      </div>
    );
  }

  // Calculate composite score using the exact weighted algorithm:
  // 40% Skills, 25% Availability, 20% Interests, 15% Location
  const score = calculateMatchScore(
    candidate.dimensionalScores.skillsMatch,
    candidate.dimensionalScores.availability,
    candidate.dimensionalScores.interests,
    candidate.dimensionalScores.location
  );

  const radius = 40;
  const circumference = 2 * Math.PI * radius; // ~251.3
  const strokeDashoffset = circumference - (circumference * score) / 100;

  // Stitch candidate reasons
  const reasons = candidate.matchingRationale && candidate.matchingRationale.length > 0
    ? candidate.matchingRationale
    : [
        'Has Python experience',
        'Interested in AI',
        'Available on weekends',
        'Looking for an AI project',
        'Similar project duration',
      ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8 bg-[#f8f9ff]">
      {/* Match Explanation Card */}
      <div className="w-full max-w-[860px] bg-white rounded-xl border border-[#E2E8F0] shadow-[0_1px_3px_0_rgba(15,23,42,0.05),0_1px_2px_-1px_rgba(15,23,42,0.03)] p-8">
        {/* Card Header */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate('/matches')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#eff4ff] text-[#0284C7] border border-[#BAE6FD] text-[11px] font-medium mb-3 hover:bg-[#e0f2fe] transition-colors cursor-pointer"
          >
            <MaterialIcon icon="arrow_back" size={14} />
            <span>Back to results</span>
          </button>
          <h1 className="text-[24px] leading-8 font-semibold text-[#0b1c30]">
            Why {candidate.candidateName} is a good match?
          </h1>
          <p className="text-[14px] text-[#474e64] mt-1">
            Here’s why we think you will work well together.
          </p>
        </div>

        {/* Five Structured Green-Check Reasons */}
        <div className="divide-y divide-[#F1F5F9] border-t border-b border-[#F1F5F9] mb-8">
          {reasons.slice(0, 5).map((reason, idx) => (
            <div
              key={idx}
              className="flex items-center py-3.5 px-2 hover:bg-[#F8FAFC] transition-colors rounded-lg"
            >
              <div className="w-6 h-6 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center mr-3.5 flex-shrink-0">
                <MaterialIcon icon="check" size={16} />
              </div>
              <span className="text-[14px] text-[#0b1c30] font-medium">
                {reason}
              </span>
            </div>
          ))}
        </div>

        {/* Compatibility Score Card */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center gap-8">
          {/* Left: Circular Score Ring */}
          <div className="flex flex-col items-center justify-center flex-shrink-0 px-4">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r={radius}
                  stroke="#E2E8F0"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r={radius}
                  stroke="url(#purpleBlueGrad)"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  strokeWidth="8"
                />
                <defs>
                  <linearGradient id="purpleBlueGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-[24px] font-bold text-[#0b1c30]">{score}%</span>
              </div>
            </div>
            <span className="text-[12px] text-[#474e64] font-semibold mt-2.5">
              Compatibility Score
            </span>
          </div>

          {/* Right: Contribution Breakdown Bars (Exact weights) */}
          <div className="flex-1 w-full space-y-3.5">
            {/* Skills Match — 40% */}
            <div>
              <div className="flex justify-between items-center text-[12px] mb-1.5">
                <span className="text-[#0b1c30] font-medium">Skills Match (Weight: 40%)</span>
                <span className="text-[#474e64] font-semibold">
                  {candidate.dimensionalScores.skillsMatch}%
                </span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${candidate.dimensionalScores.skillsMatch}%` }}
                />
              </div>
            </div>

            {/* Availability — 25% */}
            <div>
              <div className="flex justify-between items-center text-[12px] mb-1.5">
                <span className="text-[#0b1c30] font-medium">Availability (Weight: 25%)</span>
                <span className="text-[#474e64] font-semibold">
                  {candidate.dimensionalScores.availability}%
                </span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${candidate.dimensionalScores.availability}%` }}
                />
              </div>
            </div>

            {/* Interests — 20% */}
            <div>
              <div className="flex justify-between items-center text-[12px] mb-1.5">
                <span className="text-[#0b1c30] font-medium">Interests (Weight: 20%)</span>
                <span className="text-[#474e64] font-semibold">
                  {candidate.dimensionalScores.interests}%
                </span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${candidate.dimensionalScores.interests}%` }}
                />
              </div>
            </div>

            {/* Location — 15% */}
            <div>
              <div className="flex justify-between items-center text-[12px] mb-1.5">
                <span className="text-[#0b1c30] font-medium">Location (Weight: 15%)</span>
                <span className="text-[#474e64] font-semibold">
                  {candidate.dimensionalScores.location}%
                </span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${candidate.dimensionalScores.location}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Action Button */}
        <div>
          <button
            type="button"
            onClick={() => navigate(`/candidates/${candidate.candidateId}`)}
            className="w-full h-[42px] bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white text-[14px] font-medium rounded-lg shadow-sm hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>View Full Profile</span>
            <MaterialIcon icon="arrow_forward" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
