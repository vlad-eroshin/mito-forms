import React from 'react';
import type { FormInputFieldProps } from '../FormInputField';
import { TextField } from '@mui/material';
import { InputField } from '../../types';

export const StaticText: React.FunctionComponent<FormInputFieldProps> = ({ config, value }) => {
  const fieldConfig = config as InputField;
  return <TextField
    label={fieldConfig.label}
    placeholder={fieldConfig.placeHolderText}
    multiline={false}
    value={value}
    variant={'outlined'}
    size={'small'}
    sx={{ minWidth: 194, display: 'block' }}
    slotProps={{
      inputLabel: { shrink: true },
      input: {
        readOnly: true
      }
    }}
  />;
};

StaticText.displayName = 'StaticText';
