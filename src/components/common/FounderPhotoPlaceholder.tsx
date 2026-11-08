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
    sm: 'w-24',
    md: 'w-64',
    lg: 'w-full max-w-[340px] sm:max-w-[370px]',
    hero: 'w-full max-w-[360px] sm:max-w-[400px]'
  };

  const effectivePhotoUrl = photoUrl && photoUrl.trim() !== '' ? photoUrl : '/images/founder-portrait.jpg';

  if (effectivePhotoUrl && !imgError) {
    return (
      <div className={`flex flex-col items-center ${sizeClasses[size]} ${className}`}>
        {/* Exact Original Photo: zero blur, zero filter, natural presentation */}
        <div className="w-full rounded-[28px] overflow-hidden border-2 border-[#d2d2d7] shadow-2xl bg-white transition-all duration-300 hover:shadow-3xl hover:scale-[1.01]">
          <img
            src={effectivePhotoUrl}
            alt={`Official portrait of ${fullName}, ${designation}`}
            onError={() => setImgError(true)}
            className="w-full h-auto object-cover block"
            loading="eager"
          />
        </div>

        {/* Clean Founder Title Badge underneath - zero blur on photo */}
        <div className="mt-4 text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5f5f7] border border-[#d2d2d7] text-[10px] font-mono uppercase tracking-widest text-[#0066cc] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3]" />
            <span>FOUNDER & PIONEER</span>
          </div>
          <h4 className="text-xl font-bold text-[#1d1d1f] tracking-tight">{fullName}</h4>
          <p className="text-xs text-[#86868b] font-medium">{designation}</p>
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
