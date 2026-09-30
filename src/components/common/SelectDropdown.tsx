import React from 'react';
import { cn } from '../../utils/cn';

interface SelectDropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  error,
  options,
  className,
  id,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={selectId} className="text-label-sm font-label-sm text-on-surface font-medium">
          {label}
        </label>
      )}
      <div className="relative flex items-center w-full">
        <select
          id={selectId}
          className={cn(
            'w-full h-11 px-3.5 pr-9 bg-surface-container-lowest border border-border-standard rounded-lg text-body-md font-body-md text-on-surface',
            'focus:border-primary-container focus:ring-2 focus:ring-primary-container/15 focus:outline-none transition-all duration-150 appearance-none cursor-pointer',
            error && 'border-error',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="material-symbols-outlined absolute right-3 text-[20px] text-outline pointer-events-none">
          expand_more
        </span>
      </div>
      {error && <span className="text-label-xs text-error font-medium">{error}</span>}
    </div>
  );
};
