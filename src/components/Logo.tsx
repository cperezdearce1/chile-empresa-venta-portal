
import React from 'react';

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ className = '', onClick }) => {
  return (
    <div 
      className={`cursor-pointer select-none ${className}`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        <div 
          className="text-2xl md:text-3xl font-light tracking-[0.2em] mb-1 text-white"
          style={{ fontFamily: 'serif' }}
        >
          ATLAS
        </div>
        <div 
          className="w-16 h-px mb-1 bg-white opacity-60"
        ></div>
        <div 
          className="text-sm md:text-base font-light tracking-[0.15em] text-white"
          style={{ fontFamily: 'serif' }}
        >
          PARTNERS
        </div>
      </div>
    </div>
  );
};

export default Logo;
