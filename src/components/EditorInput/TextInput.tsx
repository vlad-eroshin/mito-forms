import type { FormInputFieldProps } from '../FormInputField';
import { useChangeHandler } from './useChangeHandler';
import { InputField } from '../../types';
import React from 'react';
import { TextField } from '@mui/material';

export const TextInput: React.FunctionComponent<FormInputFieldProps> = ({
                                                                          config,
                                                                          onChange,
                                                                          value,
                                                                          fieldIndex
                                                                        }) => {
  const fieldConfig = config as InputField;
  const handleChange = useChangeHandler(fieldConfig, onChange);
  return (
    <TextField
      id={`${fieldConfig.type}-${fieldConfig.name}-${fieldIndex || 0}`}
      data-testid={`${fieldConfig.type}-${fieldConfig.name}-${fieldIndex || 0}`}
      area-label={fieldConfig.label}
      value={(value as string) || null}
      type={fieldConfig.valueType || 'text'}
      placeholder={fieldConfig.placeHolderText}
      required={fieldConfig.required}
      onChange={handleChange}
      label={config.label}
    />
  );
};

TextInput.displayName = 'TextInput';
