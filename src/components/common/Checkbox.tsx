import React from 'react';
import { cn } from '../../utils/cn';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className,
  checked,
  onChange,
  id,
  ...props
}) => {
  const checkboxId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <label htmlFor={checkboxId} className="inline-flex items-center gap-2.5 cursor-pointer select-none">
      <input
        id={checkboxId}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={cn(
          'w-[18px] h-[18px] rounded border border-border-input text-primary-container',
          'focus:ring-2 focus:ring-primary-container/20 focus:ring-offset-0 cursor-pointer accent-primary-container',
          className
        )}
        {...props}
      />
      {label && <span className="text-body-sm font-body-sm text-on-surface">{label}</span>}
    </label>
  );
};
