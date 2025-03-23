import type { FormInputFieldProps } from '../FormInputField';
import { useChangeHandler } from './useChangeHandler';
import { InputField } from '../../types';
import React from 'react';
import { TextareaAutosize } from '@mui/material';

export const TextBoxInput: React.FunctionComponent<FormInputFieldProps> = ({
                                                                             config,
                                                                             onChange,
                                                                             value
                                                                           }) => {
  const fieldConfig = config as InputField;
  const handleChange = useChangeHandler(fieldConfig, onChange);
  return (
    <TextareaAutosize
      id={`${fieldConfig.type}-${fieldConfig.name}`}
      //      label={fieldConfig.label}
      aria-label={fieldConfig.label}
      value={value as string}
      //      helperText={fieldConfig.placeHolderText}
      //      validation={fieldConfig.validator ? getValidatorFunction(fieldConfig.validator) : undefined}
      onChange={handleChange}
    />
  );
};
