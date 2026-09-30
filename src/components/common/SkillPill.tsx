import React from 'react';
import { cn } from '../../utils/cn';

interface SkillPillProps {
  label: string;
  onRemove?: () => void;
  className?: string;
  level?: string;
}

export const SkillPill: React.FC<SkillPillProps> = ({
  label,
  onRemove,
  className,
  level,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full',
        'bg-[#E0F2FE] border border-[#BAE6FD] text-[#0284C7]',
        'text-label-sm font-label-sm font-medium leading-none select-none',
        className
      )}
    >
      <span>{label}</span>
      {level && <span className="opacity-75 text-[10px]">({level})</span>}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="hover:opacity-75 cursor-pointer flex items-center leading-none text-[#0284C7] ml-0.5"
          aria-label={`Remove ${label}`}
        >
          <span className="material-symbols-outlined text-[13px]">close</span>
        </button>
      )}
    </span>
  );
};
