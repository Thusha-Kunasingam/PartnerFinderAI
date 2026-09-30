import React from 'react';
import { ConnectionRequest } from '../../types';
import { SkillPill } from '../common/SkillPill';
import { cn } from '../../utils/cn';

interface ConnectionRequestItemProps {
  request: ConnectionRequest;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  className?: string;
}

export const ConnectionRequestItem: React.FC<ConnectionRequestItemProps> = ({
  request,
  onAccept,
  onReject,
  className,
}) => {
  return (
    <div
      className={cn(
        'p-5 rounded-xl border border-border-standard bg-surface-container-lowest shadow-elevation-1',
        'hover:border-border-input transition-all duration-150 flex flex-col md:flex-row md:items-center justify-between gap-4',
        className
      )}
    >
      <div className="flex items-start gap-4">
        {request.senderAvatarUrl ? (
          <img
            src={request.senderAvatarUrl}
            alt={request.senderName}
            className="w-12 h-12 rounded-full object-cover border border-surface-container-high flex-shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-surface-container-low border border-surface-container-high flex items-center justify-center font-bold text-secondary text-headline-sm flex-shrink-0">
            {request.senderInitials}
          </div>
        )}

        <div className="flex flex-col">
          <div className="flex items-center gap-2.5">
            <h3 className="text-headline-sm font-headline-sm text-on-surface font-semibold">
              {request.senderName}
            </h3>
            <span className="text-label-xs font-semibold px-2 py-0.5 rounded bg-surface-container text-on-surface-variant border border-surface-container-high">
              {request.projectDuration}
            </span>
          </div>

          <p className="text-body-sm text-on-surface-variant mt-0.5">
            Project: <strong className="text-on-surface font-medium">{request.projectName}</strong>
          </p>

          <p className="text-body-sm text-on-surface mt-2 bg-surface-container-low p-2.5 rounded-lg border border-surface-container">
            "{request.message}"
          </p>

          <div className="flex items-center gap-2 mt-3">
            <span className="text-label-xs text-on-surface-variant font-medium">Skills Needed:</span>
            <div className="flex flex-wrap items-center gap-1.5">
              {request.skillsNeeded.map((skill) => (
                <SkillPill key={skill} label={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 justify-end self-end md:self-center">
        <button
          type="button"
          onClick={() => onAccept(request.id)}
          className="h-10 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-label-md text-label-md font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">check</span>
          <span>Accept</span>
        </button>

        <button
          type="button"
          onClick={() => onReject(request.id)}
          className="h-10 px-4 rounded-lg bg-white border border-[#FCA5A5] text-[#EF4444] hover:bg-[#FEF2F2] font-label-md text-label-md font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
          <span>Reject</span>
        </button>
      </div>
    </div>
  );
};
