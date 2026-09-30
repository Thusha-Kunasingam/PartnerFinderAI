import React from 'react';
import { cn } from '../../utils/cn';

export interface MaterialIconProps {
  name?: string;
  icon?: string;
  className?: string;
  fill?: boolean;
  size?: number | string;
}

export const MaterialIcon: React.FC<MaterialIconProps> = ({
  name,
  icon,
  className,
  fill = false,
  size,
}) => {
  const iconName = icon || name || '';
  return (
    <span
      className={cn('material-symbols-outlined select-none', className)}
      style={{
        fontVariationSettings: fill ? "'FILL' 1" : "'FILL' 0",
        fontSize: size ? (typeof size === 'number' ? `${size}px` : size) : undefined,
      }}
    >
      {iconName}
    </span>
  );
};
