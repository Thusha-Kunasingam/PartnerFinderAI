import React from 'react';
import { cn } from '../../utils/cn';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className,
  id,
  rows = 4,
  ...props
}) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={textareaId} className="text-label-sm font-label-sm text-on-surface font-medium">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={cn(
          'w-full p-3.5 bg-surface-container-lowest border border-border-standard rounded-lg text-body-md font-body-md text-on-surface',
          'placeholder:text-outline/70 focus:border-primary-container focus:ring-2 focus:ring-primary-container/15 focus:outline-none transition-all duration-150 resize-y',
          error && 'border-error focus:border-error focus:ring-error/20',
          className
        )}
        {...props}
      />
      {helperText && !error && (
        <span className="text-body-sm text-on-surface-variant">{helperText}</span>
      )}
      {error && <span className="text-label-xs text-error font-medium">{error}</span>}
    </div>
  );
};
