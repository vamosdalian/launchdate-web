import React from 'react';
import { cn } from '@/lib/utils';

interface TimelineItemProps {
  time: string;
  title: string;
  description: string;
  isLast?: boolean;
  index?: number;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  time,
  title,
  description,
  isLast = false,
  index = 0,
}) => {
  const isLeft = index % 2 === 0;
  
  return (
    <div className="relative pb-12 group">
      {/* Timeline central line and dot */}
      <div className="absolute left-1/2 top-0 flex flex-col items-center -translate-x-1/2">
        <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-[#0a0a0a] z-10 group-hover:scale-125 transition-transform shadow-lg" />
        {!isLast && (
          <div className="w-0.5 h-full bg-gradient-to-b from-[#3a3a3a] to-[#2a2a2a] mt-1" />
        )}
      </div>
      
      {/* Content - alternating sides */}
      <div className={cn(
        "w-[calc(50%-2rem)] transition-all duration-300",
        isLeft ? "ml-0 mr-auto pr-8" : "ml-auto mr-0 pl-8"
      )}>
        <div className={cn(
          "bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-5 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300",
          "relative",
          isLeft ? "text-right" : "text-left"
        )}>
          {/* Connection line to center */}
          <div className={cn(
            "absolute top-5 w-8 h-0.5 bg-gradient-to-r from-[#2a2a2a] to-blue-500/30",
            isLeft ? "-right-8" : "-left-8 rotate-180"
          )} />
          
          <div className="font-bold text-lg text-blue-400 mb-2">{time}</div>
          <div className="font-semibold text-base mb-2">{title}</div>
          <div className="text-gray-400 text-sm leading-relaxed">{description}</div>
        </div>
      </div>
    </div>
  );
};

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ children, className }) => {
  // Add index to each child
  const childrenWithIndex = React.Children.map(children, (child, index) => {
    if (React.isValidElement<TimelineItemProps>(child)) {
      return React.cloneElement(child, { index });
    }
    return child;
  });

  return (
    <div className={cn('relative py-8', className)}>
      {childrenWithIndex}
    </div>
  );
};
