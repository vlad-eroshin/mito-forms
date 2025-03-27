import React, { useMemo } from 'react';
import type { FormInputFieldProps } from '../FormInputField';
import { buildCheckedValues, convertInputOptions, generateReactKey, getFieldId } from '../utils';
import { useCheckedHandler } from './useCheckedHandler';
import { InputField } from '../../types';
import { FormControl, FormControlLabel, FormGroup, FormLabel, Switch } from '@mui/material';

export const SwitchInput: React.FunctionComponent<FormInputFieldProps> = ({
                                                                            config,
                                                                            onChange,
                                                                            value,
                                                                            options
                                                                          }) => {
  const fieldConfig = config as InputField;
  const checkedValues = useMemo(() => buildCheckedValues(value), [value]);
  const optionsList = options
    ? convertInputOptions(options, checkedValues)
    : [{ label: fieldConfig.label as string, value: `${value}`, checked: !!value }];
  // TODO: refresh why this one needed here const
  // handleOptionsChange = useChecklistHandler(fieldConfig, optionsList, onChange);
  const handleChange = useCheckedHandler(fieldConfig, onChange);
  const inputId = getFieldId(config);
  return <FormControl required={!!fieldConfig.required} variant={'outlined'} sx={{ minWidth: 194 }}>
    <FormLabel htmlFor={inputId} focused={false}>{config.label}</FormLabel>
    <FormGroup id={inputId} title={config.label}>
      {optionsList.map((opt, i) => {
        return <FormControlLabel key={generateReactKey(config.name, `${opt.value}`, opt.label)}
                                 required={!!fieldConfig.required} control={
          <Switch value={opt.value} checked={opt.checked} onChange={handleChange} />
        } label={opt.label || opt.value as string} />;
      })}
    </FormGroup></FormControl>;
};

SwitchInput.displayName = 'SwitchInput';
