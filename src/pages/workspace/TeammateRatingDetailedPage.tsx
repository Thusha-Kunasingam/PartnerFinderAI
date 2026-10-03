import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWorkspaceStore } from '../../stores/useWorkspaceStore';
import { useMatchingStore } from '../../stores/useMatchingStore';
import { initialCandidates } from '../../data/mockData';

export const TeammateRatingDetailedPage: React.FC = () => {
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
  const [reviewText, setReviewText] = useState(
    'K.Thulaanchan was exceptional at delivering the FastAPI backend and integrating our LLM embeddings ahead of schedule. Great communication throughout our 6-week sprint!'
  );
  const [isPublic, setIsPublic] = useState(true);
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
      role: 'Backend & AI Developer',
      university: 'University of Jaffna',
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
      : 'Backend & AI Developer';

  const partnerUniversity =
    'university' in targetCandidate && (targetCandidate as any).university
      ? (targetCandidate as any).university
      : 'University of Jaffna';

  const averageScore = (
    (ratings.communication + ratings.technical + ratings.teamwork + ratings.reliability) /
    4
  ).toFixed(1);

  const handleStarClick = (category: keyof typeof ratings, score: number) => {
    setRatings((prev) => ({ ...prev, [category]: score }));
  };

  const renderStars = (category: keyof typeof ratings, currentVal: number) => {
    const activeHover = hoverRatings[category];
    const displayVal = activeHover !== undefined ? activeHover : currentVal;

    return (
      <div
        className="flex items-center text-amber-500 cursor-pointer"
        onMouseLeave={() => setHoverRatings((prev) => ({ ...prev, [category]: undefined as any }))}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleStarClick(category, star)}
            onMouseEnter={() => setHoverRatings((prev) => ({ ...prev, [category]: star }))}
            className="p-0.5 transition-transform hover:scale-110"
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                star <= displayVal ? 'text-[#F59E0B]' : 'text-[#CBD5E1]'
              }`}
              style={{
                fontVariationSettings: star <= displayVal ? "'FILL' 1" : "'FILL' 0",
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
      feedbackText: reviewText,
      isAnonymous: !isPublic,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      navigate(`/workspace/${currentWorkspace.id}`);
    }, 1500);
  };

  return (
    <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 bg-surface">
      {/* Toast Confirmation */}
      {isSubmitted && (
        <div className="fixed top-20 right-6 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-top-3">
          <span className="material-symbols-outlined text-emerald-400 text-[22px]">
            check_circle
          </span>
          <div>
            <p className="text-label-md font-semibold">Review Submitted!</p>
            <p className="text-body-sm text-slate-300">
              Thank you for evaluating {partnerName}. Redirecting to workspace...
            </p>
          </div>
        </div>
      )}

      <section className="w-full max-w-[620px] bg-surface-container-lowest border border-surface-container-highest rounded-xl shadow-sm p-6 sm:p-8">
        {/* Card Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4 mb-1">
            <h1 className="text-headline-lg font-headline-lg text-on-surface">Rate Your Teammate</h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low text-primary border border-surface-variant text-label-xs font-label-xs">
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              Verified Match
            </span>
          </div>
          <p className="text-body-md font-body-md text-tertiary">
            Share feedback about your collaboration on {currentWorkspace.name} to help improve match
            quality.
          </p>
        </div>

        {/* Partner Info Badge / Micro-Card */}
        <div className="bg-surface-container-low border border-surface-container-high rounded-lg p-4 mb-6 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-primary-container text-surface-container-lowest flex items-center justify-center font-bold text-headline-sm font-headline-sm shadow-sm ring-2 ring-primary-fixed">
              {partnerInitials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-headline-sm font-headline-sm text-on-surface">{partnerName}</h2>
                <span className="inline-flex items-center text-label-xs font-label-xs px-2 py-0.5 rounded-full bg-surface-container-lowest border border-outline-variant text-on-surface-variant">
                  Partner
                </span>
              </div>
              <p className="text-body-sm font-body-sm text-tertiary mt-0.5">
                {partnerRole} • {partnerUniversity}
              </p>
            </div>
          </div>
          <div className="w-full sm:w-auto text-left sm:text-right">
            <span className="inline-block text-label-xs font-label-xs bg-surface-container-lowest border border-surface-container-high text-secondary px-2.5 py-1 rounded-full font-medium">
              Project: {currentWorkspace.name} (Completed)
            </span>
          </div>
        </div>

        {/* Rating Criteria Rows */}
        <div className="space-y-4 mb-6">
          {/* Criteria 1: Communication */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-surface-container-low gap-2">
            <div>
              <span className="text-label-md font-label-md text-on-surface block">Communication</span>
              <span className="text-body-sm font-body-sm text-tertiary">
                Promptness, responsiveness, and clear discussions
              </span>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center">
              {renderStars('communication', ratings.communication)}
              <span className="text-label-sm font-label-sm font-semibold text-on-surface w-7 text-right">
                {ratings.communication.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Criteria 2: Technical Skills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-surface-container-low gap-2">
            <div>
              <span className="text-label-md font-label-md text-on-surface block">Technical Skills</span>
              <span className="text-body-sm font-body-sm text-tertiary">
                Quality of code, problem-solving, and implementation
              </span>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center">
              {renderStars('technical', ratings.technical)}
              <span className="text-label-sm font-label-sm font-semibold text-on-surface w-7 text-right">
                {ratings.technical.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Criteria 3: Teamwork */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-surface-container-low gap-2">
            <div>
              <span className="text-label-md font-label-md text-on-surface block">Teamwork</span>
              <span className="text-body-sm font-body-sm text-tertiary">
                Collaboration, openness to feedback, and team spirit
              </span>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center">
              {renderStars('teamwork', ratings.teamwork)}
              <span className="text-label-sm font-label-sm font-semibold text-on-surface w-7 text-right">
                {ratings.teamwork.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Criteria 4: Reliability & Timeliness */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-2">
            <div>
              <span className="text-label-md font-label-md text-on-surface block">
                Reliability &amp; Timeliness
              </span>
              <span className="text-body-sm font-body-sm text-tertiary">
                Meeting milestone deadlines and fulfilling commitments
              </span>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center">
              {renderStars('reliability', ratings.reliability)}
              <span className="text-label-sm font-label-sm font-semibold text-on-surface w-7 text-right">
                {ratings.reliability.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Overall Rating Summary Callout */}
        <div className="flex items-center justify-between bg-surface-container-high/60 border border-surface-container-highest px-4 py-2.5 rounded-lg mb-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">insights</span>
            <span className="text-label-md font-label-md text-on-surface font-semibold">
              Calculated Score
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-surface-container-lowest text-label-sm font-label-sm font-medium shadow-sm">
            <span>Overall Rating: {averageScore} / 5.0</span>
          </div>
        </div>

        {/* Feedback & Review Input */}
        <div className="mb-5">
          <label className="block text-label-md font-label-md text-on-surface mb-1.5" htmlFor="review-textarea">
            Your Review (Optional)
          </label>
          <div className="relative">
            <textarea
              className="w-full text-body-md font-body-md text-on-surface bg-surface-container-lowest border border-surface-container-highest rounded-lg p-3 placeholder:text-outline focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all resize-none outline-none"
              id="review-textarea"
              placeholder="Share specific details about what went well, communication style, or advice for future collaborators..."
              rows={4}
              maxLength={500}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <div className="flex justify-end mt-1.5">
              <span className="text-code-sm font-code-sm text-tertiary" id="char-counter">
                {reviewText.length} / 500 characters
              </span>
            </div>
          </div>
        </div>

        {/* Checkbox Option */}
        <div className="mb-6 pt-1">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="mt-0.5 h-[18px] w-[18px] rounded border-outline text-primary-container focus:ring-primary-container cursor-pointer transition-colors"
              type="checkbox"
            />
            <span className="text-body-sm font-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
              Allow this review to be displayed publicly on {partnerName}'s partner profile
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2 border-t border-surface-container-low">
          <button
            className="w-full sm:w-auto h-[42px] px-5 rounded-lg border border-surface-container-highest text-on-surface bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-150 text-label-md font-label-md font-medium active:scale-[0.98] text-center cursor-pointer"
            type="button"
            onClick={() => navigate(`/workspace/${currentWorkspace.id}`)}
          >
            Skip for Now
          </button>
          <button
            className="w-full sm:w-auto h-[42px] px-6 rounded-lg bg-primary-container hover:bg-primary text-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-150 text-label-md font-label-md font-medium active:scale-[0.98] text-center flex items-center justify-center gap-2 cursor-pointer"
            type="button"
            onClick={handleSubmit}
          >
            <span>Submit Review</span>
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </div>
      </section>
    </main>
  );
};
