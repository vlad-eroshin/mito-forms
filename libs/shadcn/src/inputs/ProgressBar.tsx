import React from 'react';
import { Progress } from '../components/ui/progress';
import type { FormInputFieldProps } from '@mito-forms/core';

export const ProgressBar: React.FunctionComponent<FormInputFieldProps> = ({
  value,
  config,
}) => {
  const progressValue = typeof value === 'number' ? value : 0;
  const maxValue = 100; // Default max value
  const percentage = (progressValue / maxValue) * 100;

  return (
    <div className="space-y-2">
      <Progress value={percentage} className="w-full" />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{progressValue}</span>
        <span>{maxValue}</span>
      </div>
    </div>
  );
};

ProgressBar.displayName = 'ProgressBar';
