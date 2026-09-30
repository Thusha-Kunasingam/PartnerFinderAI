import React from 'react';
import { cn } from '../../utils/cn';

interface ProcessingStepRowProps {
  stepNumber: number;
  label: string;
  isCompleted: boolean;
  isInProgress: boolean;
}

export const ProcessingStepRow: React.FC<ProcessingStepRowProps> = ({
  stepNumber,
  label,
  isCompleted,
  isInProgress,
}) => {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-surface-container/60 last:border-b-0">
      <div className="flex items-center gap-3">
        <span className="text-body-md font-body-md font-medium text-on-surface">
          {stepNumber}. {label}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        {isCompleted ? (
          <div className="flex items-center gap-1 text-emerald-600 text-label-xs font-semibold">
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <span>Completed</span>
          </div>
        ) : isInProgress ? (
          <div className="flex items-center gap-1 text-primary-container text-label-xs font-semibold">
            <span className="w-4 h-4 rounded-full border-2 border-primary-container border-t-transparent animate-spin" />
            <span>Analyzing...</span>
          </div>
        ) : (
          <span className="text-outline text-label-xs font-medium">Pending</span>
        )}
      </div>
    </div>
  );
};
