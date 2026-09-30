import React from 'react';
import { cn } from '../../utils/cn';

interface StatWidgetCardProps {
  label: string;
  value: string;
  icon: string;
  className?: string;
}

export const StatWidgetCard: React.FC<StatWidgetCardProps> = ({
  label,
  value,
  icon,
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high shadow-elevation-1 hover:border-border-input transition-all duration-150',
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
          {label}
        </span>
        <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
          <span className="material-symbols-outlined text-[18px]">{icon}</span>
        </div>
      </div>
      <div className="text-display-lg font-display-lg text-on-surface tracking-tight font-bold">
        {value}
      </div>
    </div>
  );
};
