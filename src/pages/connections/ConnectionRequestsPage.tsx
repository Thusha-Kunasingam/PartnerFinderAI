import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useConnectionStore } from '../../stores/useConnectionStore';
import { MaterialIcon } from '../../components/common/MaterialIcon';

export const ConnectionRequestsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    receivedRequests,
    sentRequests,
    activeTab,
    setActiveTab,
    acceptRequest,
    rejectRequest,
    cancelSentRequest,
  } = useConnectionStore();

  const handleAccept = (requestId: string) => {
    const req = receivedRequests.find((r) => r.id === requestId);
    acceptRequest(requestId);
    if (req) {
      navigate(`/connections/success/${req.senderId}`);
    }
  };

  const currentList = activeTab === 'received' ? receivedRequests : sentRequests;

  return (
    <div className="flex-1 flex flex-col justify-start items-center px-4 py-10 w-full max-w-[1440px] mx-auto min-h-[calc(100vh-64px)]">
      {/* Centered Container */}
      <div className="w-full max-w-[920px] bg-white border border-[#ccc3d8]/50 rounded-xl shadow-[0_1px_3px_0_rgba(15,23,42,0.05),0_1px_2px_-1px_rgba(15,23,42,0.03)] overflow-hidden">
        {/* Card Header */}
        <div className="px-8 pt-8 pb-4">
          <h1 className="text-[24px] leading-8 font-semibold text-[#0b1c30]">
            Connection Requests
          </h1>
          <p className="text-[14px] text-[#4a4455] mt-1">
            Manage invitations to collaborate on projects.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="px-8 border-b border-[#ccc3d8]/40 flex items-center gap-8">
          <button
            type="button"
            onClick={() => setActiveTab('received')}
            className={`pb-3 text-[14px] font-medium flex items-center gap-2 transition-colors duration-150 cursor-pointer ${
              activeTab === 'received'
                ? 'border-b-2 border-[#7c3aed] text-[#7c3aed] font-semibold'
                : 'border-b-2 border-transparent text-[#474e64] hover:text-[#0b1c30]'
            }`}
          >
            <span>Received ({receivedRequests.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sent')}
            className={`pb-3 text-[14px] font-medium flex items-center gap-2 transition-colors duration-150 cursor-pointer ${
              activeTab === 'sent'
                ? 'border-b-2 border-[#7c3aed] text-[#7c3aed] font-semibold'
                : 'border-b-2 border-transparent text-[#474e64] hover:text-[#0b1c30]'
            }`}
          >
            <span>Sent ({sentRequests.length})</span>
          </button>
        </div>

        {/* Requests List */}
        {currentList.length === 0 ? (
          <div className="p-12 text-center text-[#474e64]">
            <MaterialIcon icon="group_add" size={48} className="text-[#7b7487] mb-2 mx-auto" />
            <h3 className="text-[16px] font-semibold text-[#0b1c30] mb-1">
              No pending {activeTab} requests
            </h3>
            <p className="text-[14px] text-[#474e64] max-w-md mx-auto">
              {activeTab === 'received'
                ? 'When peers invite you to collaborate on projects, their invitations will appear here.'
                : "You haven't sent any invitations yet. Search for partners to collaborate!"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#ccc3d8]/30">
            {activeTab === 'received'
              ? receivedRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-6 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#f8f9ff]/50 transition-colors duration-150"
                  >
                    <div className="flex items-start md:items-center gap-4">
                      {/* Avatar / Initials */}
                      <div className="w-11 h-11 rounded-lg bg-[#e5eeff] flex items-center justify-center text-[#630ed4] font-semibold text-[18px] flex-shrink-0 border border-[#d3e4fe]">
                        {req.senderInitials || req.senderName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => navigate(`/candidates/${req.senderId}`)}
                            className="text-[16px] font-semibold text-[#0b1c30] hover:text-[#7c3aed] transition-colors cursor-pointer text-left"
                          >
                            {req.senderName}
                          </button>
                          <span className="text-[11px] text-[#474e64] bg-[#e5eeff] px-2 py-0.5 rounded font-medium">
                            {req.projectDuration || '6 Weeks'}
                          </span>
                        </div>
                        <div className="text-[14px] text-[#4a4455] mt-0.5">
                          Project: <span className="font-medium text-[#0b1c30]">{req.projectName}</span>
                        </div>
                        {req.message && (
                          <p className="text-[12px] text-[#474e64] mt-1 line-clamp-1 italic">
                            "{req.message}"
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[12px] text-[#474e64]">Skills Needed:</span>
                          {(req.skillsNeeded || ['Python', 'AI']).map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex items-center h-6 px-2.5 rounded-full text-[12px] font-medium bg-[#E0F2FE] border border-[#BAE6FD] text-[#0284C7]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2.5 self-end md:self-center">
                      <button
                        type="button"
                        onClick={() => handleAccept(req.id)}
                        className="h-[40px] px-4 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white text-[14px] font-medium inline-flex items-center gap-1.5 shadow-sm transition-all duration-150 active:scale-[0.98] cursor-pointer"
                      >
                        <MaterialIcon icon="check" size={18} />
                        <span>Accept</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => rejectRequest(req.id)}
                        className="h-[40px] px-4 rounded-lg bg-white border border-[#FCA5A5] text-[#EF4444] hover:bg-[#FEF2F2] text-[14px] font-medium inline-flex items-center gap-1.5 transition-all duration-150 active:scale-[0.98] cursor-pointer"
                      >
                        <MaterialIcon icon="close" size={18} />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))
              : sentRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-6 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#f8f9ff]/50 transition-colors duration-150"
                  >
                    <div className="flex items-start md:items-center gap-4">
                      {/* Avatar / Initials */}
                      <div className="w-11 h-11 rounded-lg bg-[#e5eeff] flex items-center justify-center text-[#630ed4] font-semibold text-[18px] flex-shrink-0 border border-[#d3e4fe]">
                        {req.recipientId.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => navigate(`/candidates/${req.recipientId}`)}
                            className="text-[16px] font-semibold text-[#0b1c30] hover:text-[#7c3aed] transition-colors cursor-pointer text-left"
                          >
                            To: {req.recipientId}
                          </button>
                          <span className="text-[11px] text-[#474e64] bg-[#e5eeff] px-2 py-0.5 rounded font-medium">
                            {req.projectDuration || '6 Weeks'}
                          </span>
                        </div>
                        <div className="text-[14px] text-[#4a4455] mt-0.5">
                          Project: <span className="font-medium text-[#0b1c30]">{req.projectName}</span>
                        </div>
                        {req.message && (
                          <p className="text-[12px] text-[#474e64] mt-1 line-clamp-1 italic">
                            "{req.message}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-semibold bg-amber-50 border border-amber-200 text-amber-800">
                        <MaterialIcon icon="schedule" size={14} />
                        <span>Pending</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => cancelSentRequest(req.id)}
                        className="text-[12px] text-[#EF4444] hover:underline cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};
