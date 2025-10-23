import React from 'react';
import { cn } from '@/lib/utils';

interface TimelineItemProps {
  time: string;
  title: string;
  description: string;
  isLast?: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  time,
  title,
  description,
  isLast = false,
}) => {
  return (
    <div className="relative pb-8 group">
      {/* Timeline dot and line */}
      <div className="absolute left-0 top-0 flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-[#0a0a0a] z-10 group-hover:scale-125 transition-transform" />
        {!isLast && (
          <div className="w-0.5 h-full bg-[#2a2a2a] mt-1" />
        )}
      </div>
      
      {/* Content */}
      <div className="ml-8 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 hover:border-[#3a3a3a] transition-colors">
        <div className="font-bold text-lg text-blue-400 mb-1">{time}</div>
        <div className="font-semibold text-base mb-2">{title}</div>
        <div className="text-gray-400 text-sm">{description}</div>
      </div>
    </div>
  );
};

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ children, className }) => {
  return (
    <div className={cn('relative', className)}>
      {children}
    </div>
  );
};
