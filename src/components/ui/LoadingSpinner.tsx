import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: 'primary' | 'muted' | 'white';
  text?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const colorClasses = {
  primary: 'text-primary',
  muted: 'text-muted-foreground',
  white: 'text-white',
};

export function LoadingSpinner({ 
  size = 'md', 
  className,
  color = 'primary',
  text,
  fullScreen = false 
}: LoadingSpinnerProps) {
  const spinner = (
    <motion.div
      className={cn(
        'flex items-center justify-center',
        fullScreen && 'min-h-screen',
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col items-center gap-3">
        <Loader2 
          className={cn(
            'animate-spin',
            sizeClasses[size],
            colorClasses[color]
          )}
        />
        {text && (
          <p className={cn(
            'text-sm font-medium',
            color === 'white' ? 'text-white' : 'text-muted-foreground'
          )}>
            {text}
          </p>
        )}
      </div>
    </motion.div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
}

// Page loading component
export function PageLoader({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <LoadingSpinner size="lg" text={message} />
    </div>
  );
}

// Inline loading component for content sections
export function InlineLoader({ 
  className,
  message = 'Loading...',
  size = 'md'
}: { 
  className?: string;
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <div className={cn('flex items-center justify-center py-8', className)}>
      <LoadingSpinner size={size} text={message} />
    </div>
  );
}

// Button loading state
export function ButtonLoader({ className }: { className?: string }) {
  return (
    <Loader2 className={cn('w-4 h-4 animate-spin', className)} />
  );
}

// Skeleton loader for content placeholders
export function SkeletonLoader({ 
  lines = 3,
  className 
}: { 
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: lines }, (_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-muted rounded animate-pulse"
          style={{ width: `${Math.random() * 40 + 60}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        />
      ))}
    </div>
  );
}