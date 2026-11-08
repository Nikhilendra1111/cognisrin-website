import React from 'react';
import { MapPin } from 'lucide-react';

interface Props {
  lecturesCount: number;
  milestoneText?: string;
  className?: string;
  variant?: 'banner' | 'card' | 'badge';
}

export const LectureMilestoneBadge: React.FC<Props> = ({
  lecturesCount,
  milestoneText = '600+ Lectures Delivered Across India',
  className = '',
  variant = 'card'
}) => {
  if (variant === 'banner') {
    return (
      <div className={`w-full bg-[#f5f5f7] border-y border-[#d2d2d7] py-4 px-6 ${className}`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#0071e3] animate-ping" />
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#0066cc] font-semibold">
                NATIONWIDE SCIENTIFIC OUTREACH
              </span>
              <h4 className="text-base sm:text-lg font-semibold text-[#1d1d1f] tracking-tight">
                {milestoneText}
              </h4>
            </div>
          </div>
          <p className="text-xs text-[#86868b] max-w-md">
            Pioneered by Nikhilendra Srinivas to inspire emerging scientific thinkers and technological entrepreneurs across India.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`apple-card p-8 sm:p-12 ${className}`}>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffffff] border border-[#d2d2d7] text-xs font-mono text-[#0066cc]">
            <MapPin className="w-3.5 h-3.5" />
            <span>NATIONWIDE OUTREACH ACROSS INDIA</span>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tighter">
            {milestoneText}
          </h3>
          <p className="text-sm text-[#86868b] leading-relaxed max-w-2xl">
            Delivered across premier universities, research symposiums, and innovation forums throughout India by Founder & Pioneer Nikhilendra Srinivas to cultivate scientific curiosity and deep-tech innovation.
          </p>
        </div>

        <div className="flex-shrink-0 flex flex-col items-center justify-center p-6 sm:p-8 rounded-[24px] bg-[#ffffff] border border-[#d2d2d7] shadow-sm min-w-[200px]">
          <span className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-[#1d1d1f] font-mono">
            {lecturesCount}+
          </span>
          <span className="text-xs uppercase tracking-widest text-[#86868b] font-medium mt-1">
            Lectures Delivered
          </span>
        </div>
      </div>
    </div>
  );
};
