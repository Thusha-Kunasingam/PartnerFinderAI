import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MaterialIcon } from '../../components/common/MaterialIcon';

export const TeammateRatingDetailedPage: React.FC = () => {
  const navigate = useNavigate();
  const { projectId, userId } = useParams<{ projectId: string; userId: string }>();

  const [ratings, setRatings] = useState({
    communication: 5,
    technical: 4,
    teamwork: 5,
    reliability: 4,
  });

  const [reviewText, setReviewText] = useState(
    'K.Thulaanchan was exceptional at delivering the FastAPI backend and integrating our LLM embeddings ahead of schedule. Great communication throughout our 6-week sprint!'
  );
  const [isPublic, setIsPublic] = useState(true);

  const averageScore = (
    (ratings.communication + ratings.technical + ratings.teamwork + ratings.reliability) /
    4
  ).toFixed(1);

  const handleStarClick = (category: keyof typeof ratings, score: number) => {
    setRatings((prev) => ({ ...prev, [category]: score }));
  };

  const renderStars = (category: keyof typeof ratings, currentVal: number) => {
    return (
      <div className="flex items-center text-amber-500 cursor-pointer">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleStarClick(category, star)}
            className="hover:scale-110 transition-transform"
          >
            <MaterialIcon
              icon="star"
              size={20}
              fill={star <= currentVal}
              className={star <= currentVal ? 'text-amber-500' : 'text-[#CBD5E1]'}
            />
          </span>
        ))}
      </div>
    );
  };

  const handleSubmit = () => {
    navigate(projectId ? `/workspace/${projectId}` : '/workspace/proj-001');
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 bg-[#f8f9ff]">
      <section className="w-full max-w-[620px] bg-white border border-[#d3e4fe] rounded-xl shadow-sm p-6 sm:p-8">
        {/* Card Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4 mb-1">
            <h1 className="text-[24px] font-semibold text-[#0b1c30]">Rate Your Teammate</h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#eff4ff] text-[#630ed4] border border-[#d3e4fe] text-[11px] font-semibold">
              <MaterialIcon icon="verified" size={14} fill />
              Verified Match
            </span>
          </div>
          <p className="text-[14px] text-[#474e64]">
            Share feedback about your collaboration on AI Event Assistant to help improve match
            quality.
          </p>
        </div>

        {/* Partner Info Badge / Micro-Card */}
        <div className="bg-[#eff4ff] border border-[#dce9ff] rounded-lg p-4 mb-6 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#7c3aed] text-white flex items-center justify-center font-bold text-[20px] shadow-sm ring-2 ring-[#eaddff]">
              KT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[16px] font-semibold text-[#0b1c30]">K.Thulaanchan</h2>
                <span className="inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white border border-[#ccc3d8] text-[#4a4455]">
                  Partner
                </span>
              </div>
              <p className="text-[12px] text-[#474e64] mt-0.5">
                Backend & AI Developer • University of Jaffna
              </p>
            </div>
          </div>
          <div className="w-full sm:w-auto text-left sm:text-right">
            <span className="inline-block text-[11px] bg-white border border-[#dce9ff] text-[#0058be] px-2.5 py-1 rounded-full font-medium">
              Project: AI Event Assistant (Completed)
            </span>
          </div>
        </div>

        {/* Rating Criteria Rows */}
        <div className="space-y-4 mb-6">
          {/* Communication */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-[#eff4ff] gap-2">
            <div>
              <span className="text-[14px] font-medium text-[#0b1c30] block">Communication</span>
              <span className="text-[12px] text-[#474e64]">
                Promptness, responsiveness, and clear discussions
              </span>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center">
              {renderStars('communication', ratings.communication)}
              <span className="text-[12px] font-semibold text-[#0b1c30] w-7 text-right">
                {ratings.communication.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-[#eff4ff] gap-2">
            <div>
              <span className="text-[14px] font-medium text-[#0b1c30] block">
                Technical Skills
              </span>
              <span className="text-[12px] text-[#474e64]">
                Quality of code, problem-solving, and implementation
              </span>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center">
              {renderStars('technical', ratings.technical)}
              <span className="text-[12px] font-semibold text-[#0b1c30] w-7 text-right">
                {ratings.technical.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Teamwork */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-[#eff4ff] gap-2">
            <div>
              <span className="text-[14px] font-medium text-[#0b1c30] block">Teamwork</span>
              <span className="text-[12px] text-[#474e64]">
                Collaboration, openness to feedback, and team spirit
              </span>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center">
              {renderStars('teamwork', ratings.teamwork)}
              <span className="text-[12px] font-semibold text-[#0b1c30] w-7 text-right">
                {ratings.teamwork.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Reliability & Timeliness */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-2">
            <div>
              <span className="text-[14px] font-medium text-[#0b1c30] block">
                Reliability & Timeliness
              </span>
              <span className="text-[12px] text-[#474e64]">
                Meeting milestone deadlines and fulfilling commitments
              </span>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center">
              {renderStars('reliability', ratings.reliability)}
              <span className="text-[12px] font-semibold text-[#0b1c30] w-7 text-right">
                {ratings.reliability.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Overall Rating Summary Callout */}
        <div className="flex items-center justify-between bg-[#dce9ff]/60 border border-[#d3e4fe] px-4 py-2.5 rounded-lg mb-6">
          <div className="flex items-center gap-2">
            <MaterialIcon icon="insights" size={20} className="text-[#630ed4]" />
            <span className="text-[14px] font-semibold text-[#0b1c30]">Calculated Score</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7c3aed] text-white text-[12px] font-medium shadow-sm">
            <span>Overall Rating: {averageScore} / 5.0</span>
          </div>
        </div>

        {/* Feedback & Review Input */}
        <div className="mb-5">
          <label
            className="block text-[14px] font-medium text-[#0b1c30] mb-1.5"
            htmlFor="review-textarea"
          >
            Your Review (Optional)
          </label>
          <div className="relative">
            <textarea
              id="review-textarea"
              rows={4}
              maxLength={500}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share specific details about what went well, communication style, or advice for future collaborators..."
              className="w-full text-[14px] text-[#0b1c30] bg-white border border-[#d3e4fe] rounded-lg p-3 placeholder:text-[#7b7487] focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 transition-all resize-none"
            />
            <div className="flex justify-end mt-1.5">
              <span className="text-[12px] font-mono text-[#474e64]">
                {reviewText.length} / 500 characters
              </span>
            </div>
          </div>
        </div>

        {/* Checkbox Option */}
        <div className="mb-6 pt-1">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="mt-0.5 h-[18px] w-[18px] rounded border-[#7b7487] text-[#7c3aed] focus:ring-[#7c3aed] cursor-pointer transition-colors"
            />
            <span className="text-[12px] text-[#4a4455] group-hover:text-[#0b1c30] transition-colors">
              Allow this review to be displayed publicly on K.Thulaanchan's partner profile
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2 border-t border-[#eff4ff]">
          <button
            type="button"
            onClick={() =>
              navigate(projectId ? `/workspace/${projectId}` : '/workspace/proj-001')
            }
            className="w-full sm:w-auto h-[42px] px-5 rounded-lg border border-[#d3e4fe] text-[#0b1c30] bg-white hover:bg-[#eff4ff] transition-all duration-150 text-[14px] font-medium active:scale-[0.98] text-center"
          >
            Skip for Now
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto h-[42px] px-6 rounded-lg bg-[#7c3aed] hover:bg-[#630ed4] text-white shadow-sm hover:shadow-md transition-all duration-150 text-[14px] font-medium active:scale-[0.98] text-center flex items-center justify-center gap-2"
          >
            <span>Submit Review</span>
            <MaterialIcon icon="send" size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};
