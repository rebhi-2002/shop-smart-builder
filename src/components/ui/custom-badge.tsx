
import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  children: React.ReactNode;
}

const Badge = ({ children, className, ...props }: BadgeProps) => {
  return (
    <span 
      className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", className)} 
      {...props}
    >
      {children}
    </span>
  );
};

export { Badge };
