import React from 'react';
import { cn } from '../../utils/cn';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  className,
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-label-sm font-label-sm text-on-surface font-medium">
          {label}
        </label>
      )}
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-outline pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full h-11 bg-surface-container-lowest border border-border-standard rounded-lg text-body-md font-body-md text-on-surface',
            'placeholder:text-outline/70 focus:border-primary-container focus:ring-2 focus:ring-primary-container/15 focus:outline-none transition-all duration-150',
            leftIcon ? 'pl-10' : 'px-3.5',
            rightIcon ? 'pr-10' : 'px-3.5',
            error && 'border-error focus:border-error focus:ring-error/20',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <span className="material-symbols-outlined absolute right-3.5 text-[20px] text-outline pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>
      {error && <span className="text-label-xs text-error font-medium">{error}</span>}
    </div>
  );
};
