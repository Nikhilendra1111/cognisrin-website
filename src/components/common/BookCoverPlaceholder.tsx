import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Publication } from '../../types';

interface Props {
  publication: Publication;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BookCoverPlaceholder: React.FC<Props> = ({ 
  publication, 
  className = '',
  size = 'md'
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'w-28 max-w-[120px]',
    md: 'w-full max-w-[220px]',
    lg: 'w-full max-w-[280px]'
  }[size];

  if (publication.coverImageUrl && publication.coverImageUrl.trim() !== '' && !imgError) {
    return (
      <div 
        className={`relative aspect-[1/1.55] ${sizeClasses} mx-auto rounded-2xl overflow-hidden shadow-2xl border border-[rgba(0,0,0,0.12)] bg-[#f5f5f7] group transition-all duration-300 hover:shadow-3xl hover:scale-[1.02] ${className}`}
      >
        <img
          src={publication.coverImageUrl}
          alt={`Official book cover: ${publication.title} authored by ${publication.author}`}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Subtle Apple sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20 pointer-events-none" />
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-[2/3] w-full max-w-[220px] mx-auto rounded-2xl bg-gradient-to-b from-[#ffffff] via-[#f5f5f7] to-[#e8e8ed] border border-[#d2d2d7] p-5 flex flex-col justify-between shadow-md group hover:border-[#0071e3]/50 transition-all duration-300 ${className}`}
    >
      <div className="border-b border-[#d2d2d7] pb-3">
        <span className="text-[9px] uppercase font-mono tracking-widest text-[#0066cc] block font-semibold">
          OFFICIAL PUBLICATION
        </span>
        <p className="text-xs font-medium text-[#1d1d1f] mt-1">
          {publication.author}
        </p>
      </div>

      <div className="my-auto text-center py-4">
        <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[#ffffff] border border-[#d2d2d7] shadow-xs flex items-center justify-center text-[#0071e3] group-hover:scale-110 transition-transform">
          <BookOpen className="w-5 h-5" />
        </div>
        <h3 className="text-base font-bold text-[#1d1d1f] tracking-tight leading-snug">
          {publication.title}
        </h3>
        {publication.subtitle && (
          <p className="text-[11px] text-[#86868b] mt-2 italic leading-relaxed">
            {publication.subtitle}
          </p>
        )}
      </div>

      <div className="border-t border-[#d2d2d7] pt-3 text-[10px] text-[#86868b] flex items-center justify-between font-mono">
        <span>{publication.publicationDate}</span>
        <span className="text-[#6e6e73]">Cognisrin Press</span>
      </div>
    </div>
  );
};
