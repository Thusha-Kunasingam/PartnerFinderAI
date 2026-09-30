import React, { useState } from 'react';
import { cn } from '../../utils/cn';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  error,
  leftIcon = 'lock',
  className,
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
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
          type={showPassword ? 'text' : 'password'}
          className={cn(
            'w-full h-11 bg-surface-container-lowest border border-border-standard rounded-lg text-body-md font-body-md text-on-surface',
            'placeholder:text-outline/70 focus:border-primary-container focus:ring-2 focus:ring-primary-container/15 focus:outline-none transition-all duration-150',
            leftIcon ? 'pl-10' : 'px-3.5',
            'pr-10',
            error && 'border-error focus:border-error focus:ring-error/20',
            className
          )}
          {...props}
        />
        <button
          type="button"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 text-outline hover:text-on-surface focus:outline-none cursor-pointer flex items-center"
        >
          <span className="material-symbols-outlined text-[20px]">
            {showPassword ? 'visibility_off' : 'visibility'}
          </span>
        </button>
      </div>
      {error && <span className="text-label-xs text-error font-medium">{error}</span>}
    </div>
  );
};
