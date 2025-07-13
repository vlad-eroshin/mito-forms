import React from 'react';
import { cn } from '../lib/utils';
import type { FormDividerProps } from '@mito-forms/core';

export const FormDivider: React.FunctionComponent<FormDividerProps> = ({ config }) => {
  if (config.render === false) {
    return null;
  }

  const styleClasses = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
    rounded: 'border-solid rounded-full border-2',
    double: 'border-double border-4',
  };

  return (
    <hr
      className={cn(
        'border-border my-4',
        styleClasses[config.style || 'solid']
      )}
    />
  );
};

FormDivider.displayName = 'FormDivider';
