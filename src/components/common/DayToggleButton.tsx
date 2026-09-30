import React from 'react';
import { cn } from '../../utils/cn';

interface DayToggleButtonProps {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  selected: boolean;
  onToggle: (day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun') => void;
}

export const DayToggleButton: React.FC<DayToggleButtonProps> = ({
  day,
  selected,
  onToggle,
}) => {
  return (
    <button
      type="button"
      onClick={() => onToggle(day)}
      className={cn(
        'h-9 px-3.5 rounded-lg text-label-xs font-semibold transition-all duration-150 cursor-pointer select-none border',
        selected
          ? 'bg-primary-container text-white border-primary-container shadow-sm'
          : 'bg-surface-container-low text-on-surface border-border-standard hover:bg-surface-container hover:border-border-input'
      )}
    >
      {day}
    </button>
  );
};
