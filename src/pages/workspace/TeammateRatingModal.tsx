import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWorkspaceStore } from '../../stores/useWorkspaceStore';
import { useMatchingStore } from '../../stores/useMatchingStore';
import { initialCandidates } from '../../data/mockData';

export const TeammateRatingModal: React.FC = () => {
  const navigate = useNavigate();
  const { projectId, userId } = useParams<{ projectId: string; userId: string }>();
  const { workspaces, submitReview } = useWorkspaceStore();
  const { matches } = useMatchingStore();

  const [ratings, setRatings] = useState({
    communication: 5,
    technical: 4,
    teamwork: 5,
    reliability: 4,
  });

  const [hoverRatings, setHoverRatings] = useState<{ [key: string]: number }>({});
  const [review, setReview] = useState(
    'Very helpful teammate. Great technical skills and good communication.'
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dynamic project lookup
  const currentWorkspace =
    workspaces.find(
      (w) =>
        w.id === projectId ||
        (projectId === 'proj-001' && w.id === 'ai-event-assistant') ||
        (projectId === 'proj-002' && w.id === 'student-management')
    ) ||
    workspaces[0] || {
      id: 'ai-event-assistant',
      name: 'AI Event Assistant',
    };

  // Dynamic user lookup
  const targetCandidate =
    matches.find((m) => m.candidateId === userId) ||
    initialCandidates.find((c) => c.candidateId === userId) ||
    (currentWorkspace.members && currentWorkspace.members.find((m) => m.userId === userId)) || {
      name: 'K.Thulaanchan',
      initials: 'KT',
      role: 'Software Engineering Student',
    };

  const partnerName =
    'name' in targetCandidate
      ? targetCandidate.name
      : 'candidateName' in targetCandidate
      ? (targetCandidate as any).candidateName
      : 'K.Thulaanchan';

  const partnerInitials =
    'initials' in targetCandidate && targetCandidate.initials
      ? targetCandidate.initials
      : partnerName.slice(0, 2).toUpperCase();

  const partnerRole =
    'role' in targetCandidate && targetCandidate.role
      ? targetCandidate.role
      : 'title' in targetCandidate && (targetCandidate as any).title
      ? (targetCandidate as any).title
      : 'Software Engineering Student';

  const handleStarClick = (category: keyof typeof ratings, score: number) => {
    setRatings((prev) => ({ ...prev, [category]: score }));
  };

  const renderStars = (category: keyof typeof ratings, currentVal: number) => {
    const activeHover = hoverRatings[category];
    const displayVal = activeHover !== undefined ? activeHover : currentVal;

    return (
      <div
        className="flex items-center gap-1 text-[#f59e0b] cursor-pointer"
        onMouseLeave={() => setHoverRatings((prev) => ({ ...prev, [category]: undefined as any }))}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleStarClick(category, star)}
            onMouseEnter={() => setHoverRatings((prev) => ({ ...prev, [category]: star }))}
            className="hover:scale-110 transition-transform"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{
                fontVariationSettings: star <= displayVal ? "'FILL' 1" : "'FILL' 0",
                color: star <= displayVal ? '#f59e0b' : '#CBD5E1',
              }}
            >
              star
            </span>
          </span>
        ))}
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReview({
      projectId: currentWorkspace.id,
      reviewerId: 'user-thusha',
      revieweeId: userId || 'k-thulaanchan',
      communicationRating: ratings.communication,
      technicalSkillsRating: ratings.technical,
      teamworkRating: ratings.teamwork,
      reliabilityRating: ratings.reliability,
      feedbackText: review,
      isAnonymous: false,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      navigate(`/workspace/${currentWorkspace.id}`);
    }, 1500);
  };

  return (
    <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 bg-background">
      {/* Toast Notification */}
      {isSubmitted && (
        <div className="fixed top-20 right-6 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-top-3">
          <span className="material-symbols-outlined text-emerald-400 text-[22px]">
            check_circle
          </span>
          <div>
            <p className="text-label-md font-semibold">Review Recorded!</p>
            <p className="text-body-sm text-slate-300">
              Your feedback for {partnerName} has been saved.
            </p>
          </div>
        </div>
      )}

      {/* Teammate Review Card (Around 560px - 600px width, 12px rounded corners, subtle shadow, 1px border) */}
      <div className="w-full max-w-[580px] bg-surface-container-lowest rounded-xl border border-[#E2E8F0] shadow-[0_1px_3px_0_rgba(15,23,42,0.05),0_1px_2px_-1px_rgba(15,23,42,0.03)] p-8">
        {/* Card Heading */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-headline-md font-headline-md text-on-surface">Rate Teammate</h1>
          <button
            type="button"
            onClick={() => navigate(`/workspace/${currentWorkspace.id}`)}
            className="text-tertiary hover:text-on-surface p-1 rounded-lg transition-colors cursor-pointer"
            title="Close"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Teammate Profile Header */}
        <div className="flex items-center gap-4 pb-6 mb-6 border-b border-[#F1F5F9]">
          {/* Circular avatar with initials */}
          <div className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-primary font-headline-sm font-semibold shrink-0">
            {partnerInitials}
          </div>
          <div className="flex flex-col">
            <span className="text-headline-sm font-headline-sm text-on-surface leading-tight">
              {partnerName}
            </span>
            <span className="text-tertiary text-label-md font-label-md mt-0.5">{partnerRole}</span>
          </div>
        </div>

        {/* Rating Criteria Rows */}
        <div className="space-y-4 mb-6">
          {/* Communication: 5 stars */}
          <div className="flex items-center justify-between py-1">
            <span className="text-label-md font-label-md text-on-surface">Communication</span>
            {renderStars('communication', ratings.communication)}
          </div>

          {/* Technical Skills: 4 stars */}
          <div className="flex items-center justify-between py-1">
            <span className="text-label-md font-label-md text-on-surface">Technical Skills</span>
            {renderStars('technical', ratings.technical)}
          </div>

          {/* Teamwork: 5 stars */}
          <div className="flex items-center justify-between py-1">
            <span className="text-label-md font-label-md text-on-surface">Teamwork</span>
            {renderStars('teamwork', ratings.teamwork)}
          </div>

          {/* Reliability: 4 stars */}
          <div className="flex items-center justify-between py-1">
            <span className="text-label-md font-label-md text-on-surface">Reliability</span>
            {renderStars('reliability', ratings.reliability)}
          </div>
        </div>

        {/* Review Section */}
        <div className="mb-6">
          <label className="block text-headline-sm font-headline-sm text-on-surface mb-2" htmlFor="review-comments">
            Your Review
          </label>
          <textarea
            className="w-full bg-surface-container-lowest border border-[#E2E8F0] rounded-lg p-3 text-body-md font-body-md text-on-surface focus:border-primary-container focus:ring-2 focus:ring-primary-container/15 focus:outline-none transition-all placeholder:text-[#94A3B8] resize-none"
            id="review-comments"
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>

        {/* Submit Review Action */}
        <div>
          <button
            className="w-full h-[42px] rounded-lg text-white font-label-md text-label-md bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:brightness-105 hover:shadow-[0_4px_14px_0_rgba(124,58,237,0.35)] transition-all active:scale-[0.99] flex items-center justify-center cursor-pointer"
            type="button"
            onClick={handleSubmit}
          >
            Submit Review
          </button>
        </div>
      </div>
    </main>
  );
};
