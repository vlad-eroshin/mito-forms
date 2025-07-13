import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import type { LoadingComponentProps } from '@mito-forms/core';

export const LoadingIndicator: React.FunctionComponent<LoadingComponentProps> = ({
  className,
  loadingText = 'Loading...',
  size = 'medium',
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-8 w-8',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Loader2 className={cn('animate-spin', sizeClasses[size])} />
      {loadingText && (
        <span className="text-sm text-muted-foreground">{loadingText}</span>
      )}
    </div>
  );
};

LoadingIndicator.displayName = 'LoadingIndicator';
