import React from 'react';
import { cn } from '../../utils/cn';

interface ProgressBarProps {
  progress: number; // 0 to 100
  className?: string;
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className,
  showLabel = false,
}) => {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center text-body-sm font-body-sm">
          <span className="text-on-surface-variant">Progress</span>
          <span className="font-medium text-on-surface">{clamped}%</span>
        </div>
      )}
      <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-primary-container to-secondary-container transition-all duration-300"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
