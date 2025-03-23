import React, { useMemo } from 'react';
import type { FormInputFieldProps } from '../FormInputField';
import { buildCheckedValues, convertInputOptions } from '../utils/fieldUtils';
import { useChecklistHandler } from './useChecklistHandler';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
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

  return (
    <FormGroup title={config.label}>
      {convertedOptions.map((opt) => {
        return <FormControlLabel required={!!fieldConfig.required} control={
          <Checkbox value={opt.value} checked={opt.checked} onChange={handleChange} />
        } label={opt.label || opt.value as string} />;
      })}
    </FormGroup>
  );
};

ChecklistInput.displayName = 'ChecklistInput';
