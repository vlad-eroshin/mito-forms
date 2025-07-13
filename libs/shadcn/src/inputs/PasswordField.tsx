import React from 'react';
import { Input } from '../components/ui/input';
import type { FormInputFieldProps } from '@mito-forms/core';

export const PasswordField: React.FunctionComponent<FormInputFieldProps> = ({
  config,
  value,
  onChange,
  isValid = true,
}) => {
  return (
    <Input
      type="password"
      id={config.name}
      value={(value as string) || ''}
      onChange={(e) => onChange({ [config.name]: e.target.value })}
      placeholder={config.placeHolderText}
      disabled={config.disabled}
      className={!isValid ? 'border-destructive' : ''}
    />
  );
};

PasswordField.displayName = 'PasswordField';
