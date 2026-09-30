import React from 'react';
import { cn } from '../../utils/cn';

interface SkeletonCardProps {
  className?: string;
  height?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  className,
  height = 'h-44',
}) => {
  return (
    <div
      className={cn(
        'w-full rounded-xl bg-surface-container-low border border-surface-container animate-pulse p-6',
        height,
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-surface-container" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-surface-container rounded w-1/3" />
          <div className="h-3 bg-surface-container rounded w-1/4" />
        </div>
      </div>
      <div className="space-y-2 mt-4">
        <div className="h-3 bg-surface-container rounded w-full" />
        <div className="h-3 bg-surface-container rounded w-5/6" />
      </div>
    </div>
  );
};
