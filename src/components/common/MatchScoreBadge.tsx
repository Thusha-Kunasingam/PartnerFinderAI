import React from 'react';
import { cn } from '../../utils/cn';

interface MatchScoreBadgeProps {
  score: number;
  className?: string;
  onClick?: () => void;
}

export const MatchScoreBadge: React.FC<MatchScoreBadgeProps> = ({
  score,
  className,
  onClick,
}) => {
  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-label-sm font-label-sm font-semibold',
        'bg-primary-fixed text-primary border border-primary-fixed-dim select-none',
        onClick && 'cursor-pointer hover:brightness-95 transition-all',
        className
      )}
    >
      {score}% Match
    </span>
  );
};
