import React, { useState } from 'react';
import { cn } from '../../utils/cn';

interface StarRatingProps {
  value: number; // 0 to 5
  onChange?: (val: number) => void;
  readonly?: boolean;
  size?: number;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  readonly = false,
  size = 22,
  className,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const displayVal = hoverValue !== null ? hoverValue : value;

  return (
    <div className={cn('inline-flex items-center gap-1', className)}>
      {[1, 2, 3, 4, 5].map((starIndex) => {
        const isFilled = starIndex <= displayVal;

        return (
          <button
            key={starIndex}
            type="button"
            disabled={readonly}
            onClick={() => !readonly && onChange?.(starIndex)}
            onMouseEnter={() => !readonly && setHoverValue(starIndex)}
            onMouseLeave={() => !readonly && setHoverValue(null)}
            className={cn(
              'leading-none p-0 focus:outline-none transition-colors',
              readonly ? 'cursor-default' : 'cursor-pointer'
            )}
            aria-label={`${starIndex} star`}
          >
            <span
              className={cn(
                'material-symbols-outlined select-none transition-colors duration-100',
                isFilled ? 'text-amber-500' : 'text-slate-300'
              )}
              style={{
                fontSize: `${size}px`,
                fontVariationSettings: isFilled ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              star
            </span>
          </button>
        );
      })}
    </div>
  );
};
