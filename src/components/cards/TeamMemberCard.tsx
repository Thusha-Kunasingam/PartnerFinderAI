import React from 'react';
import { WorkspaceMember } from '../../types';
import { SkillPill } from '../common/SkillPill';
import { cn } from '../../utils/cn';

interface TeamMemberCardProps {
  member: WorkspaceMember;
  onMessage?: (userId: string) => void;
  className?: string;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  onMessage,
  className,
}) => {
  return (
    <div
      className={cn(
        'p-4 rounded-xl border border-surface-container-high bg-surface-container-lowest',
        'hover:bg-surface-container-low transition-all duration-150 flex items-center justify-between gap-4',
        className
      )}
    >
      <div className="flex items-center gap-3.5">
        {member.avatarUrl ? (
          <img
            src={member.avatarUrl}
            alt={member.name}
            className="w-11 h-11 rounded-full object-cover border border-surface-container-high flex-shrink-0"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-surface-container border border-surface-container-high flex items-center justify-center font-bold text-secondary text-label-md flex-shrink-0">
            {member.initials}
          </div>
        )}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-headline-sm font-headline-sm text-on-surface font-semibold">
              {member.name}
            </span>
            <span className="text-label-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              {member.role}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1.5">
            {member.skills.map((skill) => (
              <SkillPill key={skill} label={skill} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {onMessage && (
          <button
            type="button"
            onClick={() => onMessage(member.userId)}
            className="h-9 px-3 rounded-lg bg-surface-container-low text-secondary border border-secondary/20 hover:bg-surface-container text-label-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>Message</span>
          </button>
        )}
        <button
          type="button"
          className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container cursor-pointer flex items-center"
          aria-label="Member options"
        >
          <span className="material-symbols-outlined text-[20px]">more_vert</span>
        </button>
      </div>
    </div>
  );
};
