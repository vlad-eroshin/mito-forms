import React, { useMemo } from 'react';
import type { FormInputFieldProps } from '../FormInputField';
import { buildCheckedValues, convertInputOptions, generateReactKey, getFieldId } from '../utils/fieldUtils';
import { useChecklistHandler } from './useChecklistHandler';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import { InputField } from '../../types';

export const ChecklistInput: React.FunctionComponent<FormInputFieldProps> = ({
                                                                               config,
                                                                               onChange,
                                                                               value,
                                                                               options
                                                                             }) => {
  const fieldConfig = config as InputField;
  const checkedValues = useMemo(() => buildCheckedValues(value), [value]);
  const convertedOptions = options ? convertInputOptions(options, checkedValues) : [];
  const handleChange = useChecklistHandler(fieldConfig, convertedOptions, onChange);
  const inputId = getFieldId(config);
  return (<FormControl required={!!fieldConfig.required} variant={'outlined'}>
      <FormLabel htmlFor={inputId} focused={false}>{config.label}</FormLabel> <FormGroup title={config.label}>
      {convertedOptions.map((opt) => {
        return <FormControlLabel key={generateReactKey(config.name, `${opt.value}`, opt.label)} control={
          <Checkbox value={opt.value} checked={opt.checked} onChange={handleChange} />
        } label={opt.label || opt.value as string} />;
      })}
    </FormGroup>
    </FormControl>
  );
};

ChecklistInput.displayName = 'ChecklistInput';
