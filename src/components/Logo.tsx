import React from 'react';

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  /** icon size in px */
  size?: number;
}

/**
 * StyleMart logo — a shopping bag whose handle forms an "S",
 * built from the brand gradient (primary → accent).
 */
const Logo: React.FC<LogoProps> = ({ className = '', showWordmark = true, size = 32 }) => {
  const gradientId = React.useId();

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="StyleMart logo"
        className="shrink-0"
      >
        <defs>
          <linearGradient id={gradientId} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="hsl(245 65% 60%)" />
            <stop offset="1" stopColor="hsl(262 83% 74%)" />
          </linearGradient>
        </defs>
        {/* bag body */}
        <path
          d="M9 16h30l-2.6 24.2A5 5 0 0 1 31.4 45H16.6a5 5 0 0 1-4.97-4.8L9 16Z"
          fill={`url(#${gradientId})`}
        />
        {/* bag handle */}
        <path
          d="M17 18v-5a7 7 0 0 1 14 0v5"
          stroke={`url(#${gradientId})`}
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* S monogram cut into the bag */}
        <path
          d="M29 25.5c-1.4-1.5-3.2-2.2-5.2-2.2-2.6 0-4.4 1.3-4.4 3.2 0 1.8 1.5 2.6 4.5 3.3 3.4.8 5.5 2 5.5 5 0 3.3-2.9 5.4-6.7 5.4-2.8 0-5.2-1-6.7-2.8"
          stroke="hsl(0 0% 100%)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {showWordmark && (
        <span className="font-bold text-2xl tracking-tight">
          Style<span className="text-primary">Mart</span>
        </span>
      )}
    </span>
  );
};

export default Logo;
