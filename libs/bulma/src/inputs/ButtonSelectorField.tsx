import { convertInputOptions, FormInputFieldProps, getFieldId, InputField } from '@mito-forms/core';
import React, { FunctionComponent, useCallback } from 'react';

import { BulmaField } from '../decorators/BulmaField';
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
  const inputId = getFieldId(config);
  return (
    <BulmaField
      {...props}
      id={inputId}
      config={fieldConfig}
      control={
        <ButtonSelector
          value={value as string | number}
          options={convertedOptions}
          onChange={handleChange}
        />
      }
    />
  );
};
