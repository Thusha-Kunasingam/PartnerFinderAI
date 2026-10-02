import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMatchingStore } from '../../stores/useMatchingStore';
import { useConnectionStore } from '../../stores/useConnectionStore';
import { MaterialIcon } from '../../components/common/MaterialIcon';

export const SendConnectionRequestModal: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const navigate = useNavigate();
  const { matches, requirementsDraft } = useMatchingStore();
  const { sendRequest, hasSentRequest } = useConnectionStore();

  const candidate =
    matches.find((m) => m.candidateId === candidateId) || matches[0];

  const projectName = requirementsDraft.projectHeadline || 'AI Event Assistant';
  const isAlreadySent = candidate ? hasSentRequest(candidate.candidateId) : false;

  const [message, setMessage] = useState(
    `Hi ${candidate?.candidateName || 'there'},\nI’m working on an ${projectName} and looking for someone with Python and AI experience.\nWould you like to join?`
  );
  const [error, setError] = useState('');

  const handleClose = () => {
    if (candidate) {
      navigate(`/candidates/${candidate.candidateId}`);
    } else {
      navigate('/matches');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setError('Please provide a message for your connection request.');
      return;
    }

    if (candidate) {
      sendRequest(
        candidate.candidateId,
        candidate.candidateName,
        projectName,
        message.trim()
      );
      navigate(`/connections/success/${candidate.candidateId}`);
    }
  };

  if (!candidate) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <p className="text-[14px] text-[#474e64]">Candidate not found.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 relative flex flex-col justify-center items-center px-4 py-10 min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Dimmed / Blurred Candidate Context Canvas (Background underlay simulation) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 max-w-[1440px] mx-auto px-8 py-6 pointer-events-none filter blur-[3px] opacity-40 select-none grid grid-cols-12 gap-6"
      >
        <div className="col-span-8 space-y-6">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-[#e5eeff] flex items-center justify-center text-[#630ed4] font-bold text-[20px]">
                {candidate.initials}
              </div>
              <div className="space-y-1">
                <h2 className="text-[20px] font-semibold text-[#0b1c30]">
                  {candidate.candidateName}
                </h2>
                <p className="text-[14px] text-[#474e64]">
                  {candidate.title} • {candidate.university}
                </p>
                <div className="flex gap-2 pt-2">
                  {candidate.matchingTechStack.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] bg-[#e5eeff] text-[#0058be] border border-[#d3e4fe]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F1F5F9] text-[14px] text-[#474e64]">
              {candidate.bio}
            </div>
          </div>
        </div>
        <div className="col-span-4 space-y-6">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm h-64 flex flex-col items-center justify-center">
            <h3 className="text-[16px] font-semibold text-[#0b1c30] mb-3">
              Match Compatibility
            </h3>
            <div className="w-24 h-24 rounded-full border-4 border-[#7c3aed] flex items-center justify-center font-bold text-[20px] text-[#7c3aed]">
              {candidate.matchScore}%
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop Dimmer Overlay */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-[#0B1C30]/45 backdrop-blur-[2px] transition-opacity z-10"
      />

      {/* Active Modal (Centered, ~520px wide, 12px rounded corners, crisp 1px borders) */}
      <div className="relative z-20 w-full max-w-[520px] bg-white border border-[#E2E8F0] rounded-xl shadow-[0_20px_25px_-5px_rgba(15,23,42,0.1),0_8px_10px_-6px_rgba(15,23,42,0.04)] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#F1F5F9]">
          <h1 className="text-[16px] font-semibold text-[#0b1c30] tracking-tight">
            Send Connection Request
          </h1>
          <button
            type="button"
            aria-label="Close modal"
            onClick={handleClose}
            className="text-[#474e64] hover:text-[#0b1c30] p-1 rounded-lg hover:bg-[#f8f9ff] transition-colors duration-150 inline-flex items-center justify-center cursor-pointer"
          >
            <MaterialIcon icon="close" size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5">
            {/* Recipient Row */}
            <div className="flex items-center gap-3.5 p-3 rounded-lg bg-[#f8f9ff] border border-[#E2E8F0]/70">
              {/* Circular Avatar */}
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#dce9ff] to-[#d3e4fe] flex items-center justify-center text-[#630ed4] text-[16px] font-semibold border border-[#d3e4fe] shrink-0">
                {candidate.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-semibold text-[#0b1c30] truncate">
                  To: {candidate.candidateName}
                </div>
                <div className="text-[12px] text-[#474e64] truncate">
                  {candidate.title} • {candidate.university}
                </div>
              </div>
            </div>

            {/* Already Sent Warning Banner */}
            {isAlreadySent && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-[12px] flex items-center gap-2">
                <MaterialIcon icon="info" size={16} className="text-amber-600" />
                <span>
                  You already sent an invitation to this candidate. Submitting again will update your message.
                </span>
              </div>
            )}

            {/* Form Field: Message */}
            <div className="space-y-2">
              <label
                className="block text-[14px] font-medium text-[#0b1c30]"
                htmlFor="connection-message"
              >
                Message
              </label>
              <div className="relative">
                <textarea
                  id="connection-message"
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full bg-white border border-[#E2E8F0] rounded-lg p-3.5 text-[14px] text-[#0b1c30] placeholder:text-[#ccc3d8] focus:outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/15 resize-none transition-all duration-150"
                />
              </div>
              {error && (
                <p className="text-[12px] text-[#ba1a1a]">{error}</p>
              )}
              <p className="text-[12px] text-[#474e64]">
                Introduce yourself and explain why you want to collaborate.
              </p>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#F8FAFC] border-t border-[#F1F5F9]">
            <button
              type="button"
              onClick={handleClose}
              className="h-[42px] px-4 rounded-lg bg-white border border-[#E2E8F0] text-[#0b1c30] text-[14px] font-medium hover:bg-[#eff4ff] hover:border-[#ccc3d8] transition-all duration-150 active:scale-[0.98] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-[42px] px-[18px] rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#2170e4] hover:brightness-105 text-white text-[14px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_14px_0_rgba(124,58,237,0.35)] transition-all duration-150 active:scale-[0.98] flex items-center gap-1.5 cursor-pointer"
            >
              <span>Send Request</span>
              <MaterialIcon icon="send" size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
