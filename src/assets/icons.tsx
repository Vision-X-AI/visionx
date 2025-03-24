import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const AnalyzeIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 12h5M2 12v5M2 12V7M7 12h5M7 12v5M7 12V7M12 12h5M12 12v5M12 12V7M17 12h5M17 12v5M17 12V7" />
    </svg>
  );
};

export const NFTIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <path d="M9 8l-2 8" />
      <path d="M15 8l2 8" />
      <path d="M10 8h4" />
      <path d="M7 12h10" />
      <path d="M10 16h4" />
    </svg>
  );
};

export const WalletIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 6H4a2 2 0 100 4h16a2 2 0 100-4z" />
      <path d="M4 6V4a2 2 0 012-2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2v-2" />
      <path d="M18 12v4" />
      <circle cx="16" cy="14" r="1" />
    </svg>
  );
};

export const MetaverseIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <path d="M12 22.5v-10" />
      <path d="M3.3 7L12 12l8.7-5" />
    </svg>
  );
};

export const VisionIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="2" />
      <path d="M12 19c-4 0-7.5-3.5-9.5-7C4.5 8.5 8 5 12 5s7.5 3.5 9.5 7c-2 3.5-5.5 7-9.5 7z" />
    </svg>
  );
}; 