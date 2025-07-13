import React from 'react';
import { cn } from '../lib/utils';
import type { FormInputFieldProps } from '@mito-forms/core';

export const StaticText: React.FunctionComponent<FormInputFieldProps> = ({
  value,
  config,
}) => {
  return (
    <div className="text-sm text-foreground">
      {value as string}
    </div>
  );
};

StaticText.displayName = 'StaticText';
