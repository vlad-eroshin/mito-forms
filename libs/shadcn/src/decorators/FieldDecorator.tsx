import React from 'react';
import { Label } from '../components/ui/label';
import { cn } from '../lib/utils';
import type { InputFieldLayoutProps } from '@mito-forms/core';

export const FieldDecorator: React.FunctionComponent<InputFieldLayoutProps> = ({
  id,
  label,
  controlElement,
  required,
  isValid = true,
  fieldLayout,
}) => {
  const errorMessage = !isValid ? 'This field is invalid' : undefined;

  return (
    <div className="space-y-2">
      {label && (
        <Label
          htmlFor={id}
          className={cn(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            required && 'mf-required-field'
          )}
        >
          {label}
        </Label>
      )}
      <div className={cn(!isValid && 'mf-invalid-field')}>
        {controlElement}
      </div>
      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  );
};

FieldDecorator.displayName = 'FieldDecorator';
