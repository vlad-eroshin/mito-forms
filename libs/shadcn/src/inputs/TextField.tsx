import React from 'react';
import { Input } from '../components/ui/input';
import type { FormInputFieldProps } from '@mito-forms/core';

export const TextField: React.FunctionComponent<FormInputFieldProps> = ({
  config,
  value,
  onChange,
  isValid = true,
}) => {
  return (
    <Input
      type="text"
      id={config.name}
      value={(value as string) || ''}
      onChange={(e) => onChange({ [config.name]: e.target.value })}
      placeholder={config.placeHolderText}
      disabled={config.disabled}
      className={!isValid ? 'border-destructive' : ''}
    />
  );
};

TextField.displayName = 'TextField';
