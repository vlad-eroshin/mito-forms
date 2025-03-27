import type { FormInputFieldProps } from '../FormInputField';
import { useChangeHandler } from './useChangeHandler';
import { InputField } from '../../types';
import React from 'react';
import { TextField } from '@mui/material';
import { getFieldId } from '../utils';

export const TextInput: React.FunctionComponent<FormInputFieldProps> = ({
                                                                          config,
                                                                          onChange,
                                                                          value,
                                                                          fieldIndex
                                                                        }) => {
  const fieldConfig = config as InputField;
  const handleChange = useChangeHandler(fieldConfig, onChange);
  const inputId = getFieldId(config, fieldIndex);
  return (
    <TextField
      id={inputId}
      data-testid={inputId}
      area-label={fieldConfig.label}
      value={(value as string) ?? ''}
      placeholder={fieldConfig.placeHolderText ?? 'Place holder'}
      required={fieldConfig.required}
      onChange={handleChange}
      size={'small'}
      label={config.label}
      slotProps={{ inputLabel: { shrink: true } }}
    />
  );
};

TextInput.displayName = 'TextInput';
