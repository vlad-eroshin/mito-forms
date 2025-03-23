import React from 'react';
import type { FormInputFieldProps } from '../FormInputField';
import { TextField } from '@mui/material';
import { InputField } from '../../types';

export const StaticText: React.FunctionComponent<FormInputFieldProps> = ({ config, value }) => {
  const fieldConfig = config as InputField;
  return <TextField
    label={fieldConfig.label}
    placeholder={fieldConfig.placeHolderText}
    multiline={true}
    variant="filled"
    value={value}
  />;
  //return <Text label={fieldConfig.label}>{value as string}</Text>;
};

StaticText.displayName = 'StaticText';
