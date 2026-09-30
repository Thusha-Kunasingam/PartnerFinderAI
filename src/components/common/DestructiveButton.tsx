import React from 'react';
import { cn } from '../../utils/cn';

interface DestructiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  fullWidth?: boolean;
}

export const DestructiveButton: React.FC<DestructiveButtonProps> = ({
  children,
  icon,
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={cn(
        'h-10 px-4 rounded-lg bg-surface-container-lowest border border-[#FCA5A5] text-[#EF4444] font-label-md text-label-md font-medium',
        'hover:bg-[#FEF2F2] hover:border-[#F87171] active:bg-[#FEE2E2] transition-all duration-150',
        'flex items-center justify-center gap-1.5 cursor-pointer shadow-sm',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {icon && <span className="material-symbols-outlined text-[18px] leading-none">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
