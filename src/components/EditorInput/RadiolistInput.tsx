import type { FormInputFieldProps } from '../FormInputField';
import { useOptionsChangeHandler } from './useOptionsChangeHandler';
import React from 'react';
import { InputField, InputOption } from '../../types';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { convertInputOptions } from '../utils';

export const RadiolistInput: React.FunctionComponent<FormInputFieldProps> = ({
                                                                               config,
                                                                               onChange,
                                                                               value,
                                                                               options
                                                                             }) => {
  const fieldConfig = config as InputField;
  const handleChange = useOptionsChangeHandler(fieldConfig, options as InputOption[], onChange);
  const convertedOptions = options ? convertInputOptions(options, [value as (string | number)]) : [];

  return <RadioGroup>
    {convertedOptions.map((opt) => {
      return <FormControlLabel required={!!fieldConfig.required} control={
        <Radio value={opt.value} checked={opt.checked} onChange={handleChange} />
      } label={opt.label || opt.value as string} />;
    })}
  </RadioGroup>;
};

