import type { FormInputFieldProps } from '../FormInputField';
import { useOptionsChangeHandler } from './useOptionsChangeHandler';
import React from 'react';
import { InputField, InputOption } from '../../types';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { convertInputOptions, generateReactKey, getFieldId } from '../utils';

export const RadiolistInput: React.FunctionComponent<FormInputFieldProps> = ({
                                                                               config,
                                                                               onChange,
                                                                               value,
                                                                               options
                                                                             }) => {
  const fieldConfig = config as InputField;
  const handleChange = useOptionsChangeHandler(fieldConfig, options as InputOption[], onChange);
  const convertedOptions = options ? convertInputOptions(options, [value as (string | number)]) : [];
  const inputId = getFieldId(config);
  return <FormControl required={!!fieldConfig.required} variant={'outlined'}>
    <FormLabel htmlFor={inputId}>{config.label}</FormLabel>
    <RadioGroup id={inputId}>
      {convertedOptions.map((opt) => {
        return <FormControlLabel key={generateReactKey(config.name, `${opt.value}`, opt.label)} control={
          <Radio value={opt.value} checked={opt.checked} onChange={handleChange} />
        } label={opt.label || opt.value as string} />;
      })}
    </RadioGroup>
  </FormControl>;
};

