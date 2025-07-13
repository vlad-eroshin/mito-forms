import React from 'react';
import { Input } from '../components/ui/input';
import type { FormInputFieldProps } from '@mito-forms/core';

export const FileUpload: React.FunctionComponent<FormInputFieldProps> = ({
  config,
  onChange,
  isValid = true,
}) => {
  return (
    <Input
      type="file"
      id={config.name}
      onChange={(e) => onChange({ [config.name]: e.target.files?.[0] })}
      disabled={config.disabled}
      className={!isValid ? 'border-destructive' : ''}
    />
  );
};

FileUpload.displayName = 'FileUpload';
