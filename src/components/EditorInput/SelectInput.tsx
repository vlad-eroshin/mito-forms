import React from 'react';
import type { FormInputFieldProps } from '../FormInputField';
import { convertInputOptions, getFieldId } from '../utils/fieldUtils';
import { useOptionsChangeHandler } from './useOptionsChangeHandler';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { InputField, InputOption } from '../../types';

export const SelectInput: React.FunctionComponent<FormInputFieldProps> = ({
                                                                            config,
                                                                            onChange,
                                                                            value,
                                                                            options
                                                                          }) => {
  const fieldConfig = config as InputField;
  const convertedOptions = options ? convertInputOptions(options, [`${value}`]) : [];
  const handleChange = useOptionsChangeHandler(
    fieldConfig,
    convertedOptions as InputOption[],
    onChange
  );
  const inputId = getFieldId(config);
  return <FormControl required={!!fieldConfig.required} sx={{ minWidth: 200 }}>
    <InputLabel htmlFor={inputId}>{config.label}</InputLabel>
    <Select
      id={inputId}
      multiple={false}
      value={value}
      onChange={handleChange}
      label={config.label}
      size={'small'}
    >
      {convertedOptions.map((opt, i) => (
        <MenuItem
          key={`opt-${fieldConfig.name}-${i}`}
          value={opt.value as (string | number)}
        >{opt.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
    ;
};

SelectInput.displayName = 'SelectInput';
