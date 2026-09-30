import React from 'react';
import { cn } from '../../utils/cn';

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={cn(
        'h-11 px-4 rounded-lg bg-surface-container-lowest border border-border-standard text-on-surface font-label-md text-label-md font-medium',
        'hover:bg-surface-container-low hover:border-border-input active:bg-surface-container transition-all duration-150',
        'flex items-center justify-center gap-2 cursor-pointer shadow-sm',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="material-symbols-outlined text-[18px] leading-none">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="material-symbols-outlined text-[18px] leading-none">{icon}</span>
      )}
    </button>
  );
};
