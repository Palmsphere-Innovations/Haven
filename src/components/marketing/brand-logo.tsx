import React from 'react';
import { string } from 'zod/v4';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  className?: string;
}

const SIZE_MAP = {
  sm: { mark: 20, text: 'text-lg' },
  md: { mark: 28, text: 'text-xl' },
  lg: { mark: 44, text: 'text-2xl' },
};

export const BrandLogo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  showWordmark = true,
  className = '',
}) => {
  const isDark = variant === 'dark';
  const dimensions = SIZE_MAP[size];

  return (
    <div className="flex items-center gap-3 select-none">
      <svg
        viewBox="0 0 64 64"
        width={dimensions.mark}
        height={dimensions.mark}
        role="img"
        aria-label="Haven mark"
        className="shrink-0"
      >
        <path
          d="M12 52V34L32 14L52 34V52H39V30A7 7 0 0 0 25 30V52H12Z"
          fill={isDark ? '#132A20' : '#EDEBE6'}
        />
      </svg>
      {showWordmark && (
        <span
          className={`font-semibold tracking-tight ${dimensions.text}`}
          style={{ color: isDark ? '#132A20' : '#EDEBE6' }}
        >
          Haven
        </span>
      )}
    </div>
  );
};