import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MaterialIcon } from '../../components/common/MaterialIcon';

export const TeammateRatingModal: React.FC = () => {
  const navigate = useNavigate();
  const { projectId, userId } = useParams<{ projectId: string; userId: string }>();

  const [ratings, setRatings] = useState({
    communication: 5,
    technical: 4,
    teamwork: 5,
    reliability: 4,
  });

  const [review, setReview] = useState(
    'Very helpful teammate. Great technical skills and good communication.'
  );

  const handleStarClick = (category: keyof typeof ratings, score: number) => {
    setRatings((prev) => ({ ...prev, [category]: score }));
  };

  const renderStars = (category: keyof typeof ratings, currentVal: number) => {
    return (
      <div className="flex items-center gap-1 text-[#f59e0b] cursor-pointer">
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
              className={star <= currentVal ? 'text-[#f59e0b]' : 'text-[#CBD5E1]'}
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
      {/* Teammate Review Card (Around 560px - 600px width, 12px rounded corners, subtle shadow, 1px border) */}
      <div className="w-full max-w-[580px] bg-white rounded-xl border border-[#E2E8F0] shadow-[0_1px_3px_0_rgba(15,23,42,0.05),0_1px_2px_-1px_rgba(15,23,42,0.03)] p-8">
        {/* Card Heading */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-[20px] font-semibold text-[#0b1c30]">Rate Teammate</h1>
          <button
            onClick={() =>
              navigate(projectId ? `/workspace/${projectId}` : '/workspace/proj-001')
            }
            className="text-[12px] text-[#7b7487] hover:text-[#0b1c30]"
          >
            ✕
          </button>
        </div>

        {/* Teammate Profile Header */}
        <div className="flex items-center gap-4 pb-6 mb-6 border-b border-[#F1F5F9]">
          <div className="w-12 h-12 rounded-full bg-[#dce9ff] border border-[#ccc3d8]/40 flex items-center justify-center text-[#630ed4] text-[16px] font-semibold shrink-0">
            KT
          </div>
          <div className="flex flex-col">
            <span className="text-[16px] font-semibold text-[#0b1c30] leading-tight">
              K.Thulaanchan
            </span>
            <span className="text-[#474e64] text-[14px] mt-0.5">
              Software Engineering Student
            </span>
          </div>
        </div>

        {/* Rating Criteria Rows */}
        <div className="space-y-4 mb-6">
          {/* Communication: 5 stars */}
          <div className="flex items-center justify-between py-1">
            <span className="text-[14px] font-medium text-[#0b1c30]">Communication</span>
            {renderStars('communication', ratings.communication)}
          </div>

          {/* Technical Skills: 4 stars */}
          <div className="flex items-center justify-between py-1">
            <span className="text-[14px] font-medium text-[#0b1c30]">Technical Skills</span>
            {renderStars('technical', ratings.technical)}
          </div>

          {/* Teamwork: 5 stars */}
          <div className="flex items-center justify-between py-1">
            <span className="text-[14px] font-medium text-[#0b1c30]">Teamwork</span>
            {renderStars('teamwork', ratings.teamwork)}
          </div>

          {/* Reliability: 4 stars */}
          <div className="flex items-center justify-between py-1">
            <span className="text-[14px] font-medium text-[#0b1c30]">Reliability</span>
            {renderStars('reliability', ratings.reliability)}
          </div>
        </div>

        {/* Review Section */}
        <div className="mb-6">
          <label
            className="block text-[16px] font-semibold text-[#0b1c30] mb-2"
            htmlFor="review-comments"
          >
            Your Review
          </label>
          <textarea
            id="review-comments"
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full bg-white border border-[#E2E8F0] rounded-lg p-3 text-[14px] text-[#0b1c30] focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/15 focus:outline-none transition-all placeholder:text-[#94A3B8] resize-none"
          />
        </div>

        {/* Submit Review Action */}
        <div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full h-[42px] rounded-lg text-white text-[14px] font-medium bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:brightness-105 hover:shadow-[0_4px_14px_0_rgba(124,58,237,0.35)] transition-all active:scale-[0.99] flex items-center justify-center"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};
