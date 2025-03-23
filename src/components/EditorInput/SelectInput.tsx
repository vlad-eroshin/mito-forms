import React from 'react';
import type { FormInputFieldProps } from '../FormInputField';
import { convertInputOptions } from '../utils/fieldUtils';
import { useOptionsChangeHandler } from './useOptionsChangeHandler';
import { MenuItem, Select } from '@mui/material';
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
  return <Select
    labelId="demo-multiple-name-label"
    id="demo-multiple-name"
    multiple={false}
    value={value}
    onChange={handleChange}
    //    input={<OutlinedInput label="Name" />}
  >
    {convertedOptions.map((opt, i) => (
      <MenuItem
        key={`opt-${fieldConfig.name}-${i}`}
        value={opt.value as (string | number)}
      >{opt.label}
      </MenuItem>
    ))}
  </Select>;
};

SelectInput.displayName = 'SelectInput';
