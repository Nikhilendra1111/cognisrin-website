import React, { useState } from 'react';
import { User, Shield } from 'lucide-react';

interface Props {
  photoUrl?: string;
  fullName: string;
  designation: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
}

export const FounderPhotoPlaceholder: React.FC<Props> = ({
  photoUrl,
  fullName,
  designation,
  size = 'lg',
  className = ''
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-56 h-72',
    lg: 'w-80 h-[450px] sm:w-[350px] sm:h-[480px]',
    hero: 'w-80 h-[480px] sm:w-[380px] sm:h-[510px]'
  };

  const effectivePhotoUrl = photoUrl && photoUrl.trim() !== '' ? photoUrl : '/images/founder-portrait.jpg';

  if (effectivePhotoUrl && !imgError) {
    return (
      <div 
        className={`relative overflow-hidden rounded-[32px] border border-[#d2d2d7] shadow-2xl bg-gradient-to-b from-[#ffffff] via-[#f5f5f7] to-[#e8e8ed] group transition-all duration-300 hover:shadow-3xl hover:scale-[1.01] ${sizeClasses[size]} ${className}`}
      >
        <img
          src={effectivePhotoUrl}
          alt={`Official portrait of ${fullName}, ${designation}`}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="eager"
        />

        {/* Elegant Apple gradient vignette badge */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-white via-white/90 to-transparent pt-12 pb-5 px-6 backdrop-blur-[2px]">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-[#0066cc] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] animate-pulse" />
            <span>FOUNDER & PIONEER</span>
          </div>
          <h4 className="text-xl font-bold text-[#1d1d1f] tracking-tight mt-0.5">{fullName}</h4>
          <p className="text-xs text-[#86868b] font-medium leading-snug">{designation}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-[28px] bg-[#f5f5f7] border border-[#d2d2d7] p-8 flex flex-col items-center justify-between text-center overflow-hidden shadow-sm group ${sizeClasses[size]} ${className}`}
    >
      <div className="relative z-10 w-full flex items-center justify-between text-[10px] font-mono text-[#86868b] border-b border-[#d2d2d7] pb-3">
        <span className="flex items-center gap-1.5 text-[#1d1d1f] font-medium">
          <Shield className="w-3.5 h-3.5 text-[#0071e3]" />
          OFFICIAL PROFILE
        </span>
        <span className="text-[#86868b]">COGNISRIN</span>
      </div>

      <div className="relative z-10 my-auto flex flex-col items-center">
        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[#ffffff] border border-[#d2d2d7] shadow-sm flex items-center justify-center group-hover:border-[#0071e3]/40 transition-colors duration-500">
          <User className="w-20 h-20 text-[#86868b] group-hover:text-[#1d1d1f] transition-colors" />
        </div>
        <p className="text-xs text-[#86868b] mt-4 font-mono">
          Portrait Available
        </p>
      </div>

      <div className="relative z-10 w-full pt-4 border-t border-[#d2d2d7]">
        <h4 className="text-base font-semibold text-[#1d1d1f] tracking-tight">{fullName}</h4>
        <p className="text-xs text-[#0066cc] font-mono mt-0.5">{designation}</p>
      </div>
    </div>
  );
};
