import React from 'react';
import { User, Shield, Sparkles } from 'lucide-react';

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
  if (photoUrl && photoUrl.trim() !== '') {
    return (
      <div className={`relative overflow-hidden rounded-[24px] border border-[#d2d2d7] shadow-lg ${className}`}>
        <img
          src={photoUrl}
          alt={`Official portrait of ${fullName}, ${designation}`}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-white via-white/80 to-transparent p-5">
          <p className="text-[10px] uppercase tracking-widest text-[#0066cc] font-semibold">
            Founder & Pioneer
          </p>
          <h4 className="text-lg font-bold text-[#1d1d1f] tracking-tight">{fullName}</h4>
        </div>
      </div>
    );
  }

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-48 h-60',
    lg: 'w-80 h-[440px] sm:w-[350px] sm:h-[460px]',
    hero: 'w-80 h-[460px] sm:w-[370px] sm:h-[490px]'
  };

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

        <div className="mt-5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ffffff] border border-[#d2d2d7] text-[11px] text-[#1d1d1f] shadow-xs">
          <Sparkles className="w-3 h-3 text-[#0071e3]" />
          <span>Official Portrait Placeholder</span>
        </div>
      </div>

      <div className="relative z-10 w-full pt-4 border-t border-[#d2d2d7]">
        <h4 className="text-xl font-semibold text-[#1d1d1f] tracking-tight">
          {fullName}
        </h4>
        <p className="text-xs font-normal text-[#0066cc] mt-0.5">
          {designation}
        </p>
        <p className="text-[10px] text-[#86868b] mt-1">
          (Configurable via secure Admin Portal)
        </p>
      </div>
    </div>
  );
};
