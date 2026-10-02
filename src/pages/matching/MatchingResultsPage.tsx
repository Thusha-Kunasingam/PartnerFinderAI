import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatchingStore } from '../../stores/useMatchingStore';
import { MaterialIcon } from '../../components/common/MaterialIcon';
import { calculateMatchScore } from '../../utils/matchCalculator';

export const MatchingResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    requirementsDraft,
    matches,
    activeFilter,
    setActiveFilter,
    sortBy,
    setSortBy,
    toggleBookmark,
  } = useMatchingStore();

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(
    matches.filter((m) => m.isBookmarked).map((m) => m.candidateId)
  );

  const handleToggleBookmark = (candidateId: string) => {
    toggleBookmark(candidateId);
    setBookmarkedIds((prev) =>
      prev.includes(candidateId)
        ? prev.filter((id) => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  // Re-calculate scores using the official formula:
  // Score = (0.40 * Skills) + (0.25 * Availability) + (0.20 * Interests) + (0.15 * Location)
  const computedMatches = matches.map((c) => {
    const calculated = calculateMatchScore(
      c.dimensionalScores.skillsMatch,
      c.dimensionalScores.availability,
      c.dimensionalScores.interests,
      c.dimensionalScores.location
    );
    return { ...c, matchScore: calculated };
  });

  // Filter
  const filtered = computedMatches.filter((c) => {
    if (activeFilter === '90+') {
      return c.matchScore >= 90;
    }
    if (activeFilter === 'weekends') {
      const text = c.availabilityText.toLowerCase();
      return text.includes('sat') || text.includes('sun') || text.includes('weekend');
    }
    return true;
  });

  // Sort
  const sortedMatches = [...filtered].sort((a, b) => {
    if (sortBy === 'score') {
      return b.matchScore - a.matchScore;
    }
    if (sortBy === 'availability') {
      return b.dimensionalScores.availability - a.dimensionalScores.availability;
    }
    if (sortBy === 'experience') {
      return b.rating - a.rating;
    }
    return 0;
  });

  const allCount = computedMatches.length;
  const highMatchCount = computedMatches.filter((c) => c.matchScore >= 90).length;
  const weekendCount = computedMatches.filter((c) => {
    const text = c.availabilityText.toLowerCase();
    return text.includes('sat') || text.includes('sun') || text.includes('weekend');
  }).length;

  const projectName = requirementsDraft.projectHeadline || 'AI Event Assistant';

  return (
    <div className="flex-1 w-full max-w-[1100px] mx-auto py-10 px-6">
      {/* Breadcrumb / Context Tag */}
      <div className="flex items-center gap-2 mb-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eff4ff] border border-[#d3e4fe] text-[#0058be] text-[11px] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0058be]"></span>
          <span>Project: {projectName} • Matched {allCount} candidates</span>
        </div>
      </div>

      {/* Page Title & Header Description */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[32px] leading-10 font-bold text-[#0b1c30] tracking-tight">
            Potential Partners
          </h1>
          <p className="text-[#474e64] text-[16px] leading-6 mt-1">
            We found {allCount} matches for your project based on skills, schedule, and experience.
          </p>
        </div>

        {/* Live Sync status badge */}
        <div className="flex items-center gap-2 text-[12px] text-[#474e64] bg-white px-3 py-1.5 rounded-lg border border-[#ccc3d8]/30 shadow-sm self-start md:self-auto">
          <MaterialIcon icon="auto_awesome" size={18} className="text-[#7c3aed]" />
          <span>AI Match Engine v4.2 Active</span>
        </div>
      </div>

      {/* Controls Row (Filter Badges & Sort Controls) */}
      <div className="bg-white border border-[#ccc3d8]/40 rounded-xl p-3 mb-8 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Filter Tabs / Quick Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 active:scale-[0.98] cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#0b1c30] text-white shadow-sm'
                : 'bg-[#e5eeff] hover:bg-[#dce9ff] text-[#4a4455] border border-[#ccc3d8]/30'
            }`}
          >
            All ({allCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('90+')}
            className={`px-3.5 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 active:scale-[0.98] cursor-pointer ${
              activeFilter === '90+'
                ? 'bg-[#0b1c30] text-white shadow-sm'
                : 'bg-[#e5eeff] hover:bg-[#dce9ff] text-[#4a4455] border border-[#ccc3d8]/30'
            }`}
          >
            90%+ Match ({highMatchCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('weekends')}
            className={`px-3.5 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 active:scale-[0.98] cursor-pointer ${
              activeFilter === 'weekends'
                ? 'bg-[#0b1c30] text-white shadow-sm'
                : 'bg-[#e5eeff] hover:bg-[#dce9ff] text-[#4a4455] border border-[#ccc3d8]/30'
            }`}
          >
            Available Weekends ({weekendCount})
          </button>
        </div>

        {/* Action & Sort Group */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[12px] text-[#474e64]">
            <span>Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white border border-[#ccc3d8]/60 rounded-lg pl-3 pr-8 py-1.5 text-[#0b1c30] text-[12px] font-medium focus:outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 cursor-pointer"
              >
                <option value="score">Best Match (Highest Score)</option>
                <option value="availability">Availability (Most Open)</option>
                <option value="experience">Experience (Seniority)</option>
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#474e64] flex items-center">
                <MaterialIcon icon="expand_more" size={18} />
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/requirements/new')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-[#ccc3d8]/60 text-[#0b1c30] hover:bg-[#e5eeff] text-[12px] font-medium transition-colors duration-150 active:scale-[0.98] cursor-pointer"
          >
            <MaterialIcon icon="tune" size={16} className="text-[#474e64]" />
            <span>Refine Requirements</span>
          </button>
        </div>
      </div>

      {/* Candidate Cards List */}
      {sortedMatches.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-[#ccc3d8]/40 shadow-sm">
          <MaterialIcon icon="person_search" size={48} className="text-[#7b7487] mb-3" />
          <h3 className="text-[18px] font-semibold text-[#0b1c30]">No candidates match this filter</h3>
          <p className="text-[14px] text-[#474e64] mt-1 mb-4">
            Try resetting your filters or adjusting your requirements.
          </p>
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className="px-4 py-2 rounded-lg bg-[#0b1c30] text-white text-[14px] font-medium cursor-pointer"
          >
            Show All Candidates
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedMatches.map((candidate) => {
            const isBookmarked = bookmarkedIds.includes(candidate.candidateId);
            const score = candidate.matchScore;

            return (
              <article
                key={candidate.candidateId}
                className="bg-white border border-[#ccc3d8]/40 rounded-xl p-6 shadow-sm hover:border-[#ccc3d8] hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-5 border-b border-[#e5eeff]">
                  {/* Profile Info Left */}
                  <div className="flex items-start gap-4">
                    {/* Initials Badge */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#eaddff] to-[#7c3aed] text-white text-[20px] font-bold flex items-center justify-center shadow-inner flex-shrink-0 border border-[#d2bbff]">
                      {candidate.initials}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <button
                          type="button"
                          onClick={() => navigate(`/candidates/${candidate.candidateId}`)}
                          className="text-[20px] font-semibold text-[#0b1c30] hover:text-[#7c3aed] transition-colors text-left cursor-pointer"
                        >
                          {candidate.candidateName}
                        </button>
                        {/* Active Status Badge */}
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>{candidate.availabilityText.split('(')[0].trim() || 'Available Sat & Sun'}</span>
                        </span>
                      </div>
                      <p className="text-[#474e64] text-[14px]">
                        {candidate.title} • {candidate.location}
                      </p>
                    </div>
                  </div>

                  {/* Compatibility Score Badge Right */}
                  <div className="flex flex-col items-start md:items-end gap-1.5 bg-[#eff4ff] md:bg-transparent p-3 md:p-0 rounded-lg">
                    <div className="flex items-center gap-3">
                      {/* Radial Meter Badge */}
                      <div
                        className="relative w-12 h-12 rounded-full flex items-center justify-center p-[3px] cursor-pointer"
                        onClick={() => navigate(`/matches/${candidate.candidateId}/explanation`)}
                        style={{
                          background: `conic-gradient(#7c3aed 0% ${score}%, #e5eeff ${score}% 100%)`,
                        }}
                        title="Click to view AI match explanation"
                      >
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                          <span className="text-[11px] font-bold text-[#7c3aed]">
                            {score}%
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => navigate(`/matches/${candidate.candidateId}/explanation`)}
                        className="px-3 py-1 rounded-full bg-[#7c3aed] text-white text-[12px] font-bold tracking-wide shadow-sm hover:brightness-105 cursor-pointer"
                      >
                        {score}% Match
                      </button>
                    </div>

                    <p className="text-[12px] text-[#474e64] mt-1 font-mono">
                      Skills: <span className="font-semibold text-[#0b1c30]">{candidate.dimensionalScores.skillsMatch}%</span> • Availability: <span className="font-semibold text-[#0b1c30]">{candidate.dimensionalScores.availability}%</span> • Interests: <span className="font-semibold text-[#0b1c30]">{candidate.dimensionalScores.interests}%</span>
                    </p>
                  </div>
                </div>

                {/* Bio snippet */}
                <p className="text-[14px] leading-relaxed text-[#4a4455] my-4">
                  {candidate.bio}
                </p>

                {/* Matching Skills Pills */}
                <div className="mb-5">
                  <div className="text-[11px] text-[#474e64] uppercase tracking-wider mb-2 font-semibold">
                    Matching Tech Stack
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Exact Matches */}
                    {candidate.matchingTechStack.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d8e2ff] text-[#001a42] text-[11px] font-medium border border-[#adc6ff] shadow-xs"
                      >
                        <MaterialIcon icon="check_circle" size={13} className="text-[#0058be]" />
                        <span>{skill}</span>
                        <span className="text-[10px] text-[#0058be] font-semibold ml-0.5">Exact</span>
                      </span>
                    ))}

                    {/* Related / Supporting Skills */}
                    {candidate.matchingTechStack.slice(2).map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-full bg-[#e5eeff] text-[#5e667d] text-[11px] font-medium border border-[#ccc3d8]/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Details Grid & Action Footer */}
                <div className="pt-4 border-t border-[#e5eeff] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Key Metrics Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-[14px]">
                    <div className="flex items-center gap-2">
                      <MaterialIcon icon="workspace_premium" size={18} className="text-[#474e64]" />
                      <div>
                        <span className="text-[#474e64] block text-[11px]">Experience</span>
                        <span className="font-medium text-[#0b1c30]">Intermediate (3 yrs)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MaterialIcon icon="schedule" size={18} className="text-[#474e64]" />
                      <div>
                        <span className="text-[#474e64] block text-[11px]">Availability</span>
                        <span className="font-medium text-[#0b1c30]">Weekends (6:00 PM - 9:00 PM)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MaterialIcon icon="star" size={18} className="text-amber-500" />
                      <div>
                        <span className="text-[#474e64] block text-[11px]">Rating & Verified Work</span>
                        <span className="font-medium text-[#0b1c30]">
                          {candidate.rating} <span className="text-[#474e64] font-normal">({candidate.reviewsCount} projects)</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons Group */}
                  <div className="flex items-center gap-2.5 pt-2 lg:pt-0">
                    <button
                      type="button"
                      aria-label="Bookmark Candidate"
                      onClick={() => handleToggleBookmark(candidate.candidateId)}
                      className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors duration-150 active:scale-[0.98] cursor-pointer ${
                        isBookmarked
                          ? 'border-[#7c3aed] text-[#7c3aed] bg-[#f3efff]'
                          : 'border-[#ccc3d8]/60 text-[#474e64] hover:text-[#0b1c30] hover:bg-[#e5eeff]'
                      }`}
                    >
                      <MaterialIcon icon={isBookmarked ? 'bookmark' : 'bookmark_border'} size={20} />
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate(`/candidates/${candidate.candidateId}`)}
                      className="px-4 py-2 rounded-lg border border-[#ccc3d8]/60 text-[#0b1c30] text-[14px] font-medium hover:bg-[#e5eeff] transition-colors duration-150 active:scale-[0.98] cursor-pointer"
                    >
                      View Full Profile
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate(`/connections/request/${candidate.candidateId}`)}
                      className="px-5 py-2 rounded-lg text-white text-[14px] font-medium flex items-center gap-1.5 active:scale-[0.98] bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:brightness-105 shadow-sm hover:shadow-[0_4px_14px_0_rgba(124,58,237,0.35)] transition-all cursor-pointer"
                    >
                      <MaterialIcon icon="person_add" size={18} />
                      <span>Send Connection Request</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
