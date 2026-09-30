import React from 'react';
import { cn } from '../../utils/cn';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={cn(
        'h-11 px-5 rounded-lg text-white font-label-md text-label-md font-medium tracking-normal',
        'bg-gradient-to-r from-primary-container to-secondary-container',
        'shadow-sm transition-all duration-200',
        'hover:brightness-105 hover:shadow-[0_4px_14px_rgba(124,58,237,0.35)] active:brightness-95',
        'flex items-center justify-center gap-2 cursor-pointer',
        'disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:hover:shadow-sm',
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
