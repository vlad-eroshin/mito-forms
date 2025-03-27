import type { FormInputFieldProps } from '../FormInputField';
import { useChangeHandler } from './useChangeHandler';
import { InputField } from '../../types';
import React from 'react';
import { FormControl, FormLabel, TextareaAutosize } from '@mui/material';
import { getFieldId } from '../utils';

export const TextBoxInput: React.FunctionComponent<FormInputFieldProps> = ({
                                                                             config,
                                                                             onChange,
                                                                             value
                                                                           }) => {
  const fieldConfig = config as InputField;
  const handleChange = useChangeHandler(fieldConfig, onChange);
  const inputId = getFieldId(config);
  return (
    <FormControl required={!!fieldConfig.required} variant={'outlined'} sx={{ minWidth: 194 }}>
      <FormLabel htmlFor={inputId}>{config.label}</FormLabel>
      <TextareaAutosize
        id={inputId}
        aria-label={fieldConfig.label}
        value={value as string}
        onChange={handleChange}
        minRows={2}
        placeholder={fieldConfig.placeHolderText}
      />
    </FormControl>
  );
};
