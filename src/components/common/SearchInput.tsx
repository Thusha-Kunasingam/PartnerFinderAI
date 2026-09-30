import React from 'react';
import { cn } from '../../utils/cn';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  className,
  value,
  onClear,
  ...props
}) => {
  return (
    <div className="relative flex items-center w-full">
      <span className="material-symbols-outlined absolute left-3 text-[18px] text-outline pointer-events-none">
        search
      </span>
      <input
        type="text"
        value={value}
        className={cn(
          'w-full h-10 pl-9 pr-8 rounded-lg border border-border-standard bg-surface-container-lowest text-body-md font-body-md text-on-surface',
          'placeholder:text-outline focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/15 transition-all',
          className
        )}
        {...props}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-2.5 text-outline hover:text-on-surface cursor-pointer flex items-center"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      )}
    </div>
  );
};
