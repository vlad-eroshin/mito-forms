import { convertInputOptions, FormInputFieldProps, InputField } from '@mito-forms/core';
import React, { FunctionComponent, useCallback } from 'react';

import { ButtonSelector } from './ButtonSelector/ButtonSelector';

export const ButtonSelectorField: FunctionComponent<FormInputFieldProps> = props => {
  const { config, onChange, value, options } = props;
  const fieldConfig = config as InputField;
  const handleChange = useCallback(
    (value: string | number) => {
      if (onChange) {
        onChange({ [fieldConfig.name]: value });
      }
    },
    [onChange]
  );
  const convertedOptions = options ? convertInputOptions(options, [value as string | number]) : [];
  return (
    <ButtonSelector
      value={value as string | number}
      options={convertedOptions}
      onChange={handleChange}
    />
  );
};
