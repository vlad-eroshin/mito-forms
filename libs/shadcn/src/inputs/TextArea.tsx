import React from 'react';
import { Textarea } from '../components/ui/textarea';
import type { FormInputFieldProps } from '@mito-forms/core';

export const TextArea: React.FunctionComponent<FormInputFieldProps> = ({
                                                                         config,
                                                                         value,
                                                                         onChange,
                                                                         isValid = true
                                                                       }) => {
  return (
    <Textarea
      id={config.name}
      value={(value as string) || ''}
      onChange={(e) => onChange({ [config.name]: e.target.value })}
      placeholder={config.placeHolderText}
      disabled={config.disabled}
      className={!isValid ? 'border-destructive' : ''}
      rows={config.customProps?.rows as number || 10}
    />
  );
};

TextArea.displayName = 'TextArea';
