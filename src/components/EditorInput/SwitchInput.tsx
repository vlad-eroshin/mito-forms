import React, { useMemo } from 'react';
import type { FormInputFieldProps } from '../FormInputField';
import { buildCheckedValues, convertInputOptions } from '../utils';
import { useCheckedHandler } from './useCheckedHandler';
import { InputField } from '../../types';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';

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

  return <FormGroup title={config.label}>
    {optionsList.map((opt) => {
      return <FormControlLabel required={!!fieldConfig.required} control={
        <Switch value={opt.value} checked={opt.checked} onChange={handleChange} />
      } label={opt.label || opt.value as string} />;
    })}
  </FormGroup>;
};

SwitchInput.displayName = 'SwitchInput';
