
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
          className="text-2xl md:text-3xl font-light tracking-[0.2em] mb-1"
          style={{ color: '#1B3B5C', fontFamily: 'serif' }}
        >
          ATLAS
        </div>
        <div 
          className="w-16 h-px mb-1"
          style={{ backgroundColor: '#1B3B5C', opacity: 0.6 }}
        ></div>
        <div 
          className="text-sm md:text-base font-light tracking-[0.15em]"
          style={{ color: '#1B3B5C', fontFamily: 'serif' }}
        >
          PARTNERS
        </div>
      </div>
    </div>
  );
};

export default Logo;
