import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ConnectionRequestItem } from '../../components/cards/ConnectionRequestItem';
import { useConnectionStore } from '../../stores/useConnectionStore';
import { cn } from '../../utils/cn';

export const ConnectionRequestsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    receivedRequests,
    sentRequests,
    activeTab,
    setActiveTab,
    acceptRequest,
    rejectRequest,
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
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface">
          Connection Requests
        </h1>
        <p className="text-body-sm text-on-surface-variant mt-1">
          Manage incoming invitations to collaborate and track sent requests.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('received')}
          className={cn(
            'h-10 px-5 rounded-lg text-label-md font-medium transition-all cursor-pointer border select-none',
            activeTab === 'received'
              ? 'bg-primary-container text-white border-primary-container shadow-sm'
              : 'bg-surface-container-lowest text-on-surface border-border-standard hover:bg-surface-container-low'
          )}
        >
          Received ({receivedRequests.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sent')}
          className={cn(
            'h-10 px-5 rounded-lg text-label-md font-medium transition-all cursor-pointer border select-none',
            activeTab === 'sent'
              ? 'bg-primary-container text-white border-primary-container shadow-sm'
              : 'bg-surface-container-lowest text-on-surface border-border-standard hover:bg-surface-container-low'
          )}
        >
          Sent ({sentRequests.length})
        </button>
      </div>

      {/* Requests List */}
      {currentList.length === 0 ? (
        <div className="p-12 rounded-xl bg-surface-container-lowest border border-dashed border-border-input text-center">
          <span className="material-symbols-outlined text-[48px] text-outline mb-2">
            group_add
          </span>
          <h3 className="text-headline-sm font-semibold text-on-surface mb-1">
            No pending {activeTab} requests
          </h3>
          <p className="text-body-sm text-on-surface-variant max-w-md mx-auto">
            {activeTab === 'received'
              ? 'When peers invite you to collaborate on projects, their invitations will appear here.'
              : "You haven't sent any invitations yet. Search for partners to collaborate!"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {currentList.map((req) => (
            <ConnectionRequestItem
              key={req.id}
              request={req}
              onAccept={handleAccept}
              onReject={rejectRequest}
            />
          ))}
        </div>
      )}
    </div>
  );
};
