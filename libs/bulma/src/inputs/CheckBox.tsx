import { FormInputFieldProps, getFieldId, InputField } from '@mito-forms/core';
import React, { FunctionComponent, useCallback } from 'react';

import { BulmaField } from './BulmaField';

export const CheckBox: FunctionComponent<FormInputFieldProps> = props => {
  const { config, value, fieldIndex, onChange } = props;
  const fieldConfig = config as InputField;
  const inputId = getFieldId(config, fieldIndex);
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange({ [config.name]: event.target.checked });
      }
    },
    [onChange, config]
  );
  return (
    <BulmaField
      {...props}
      id={inputId}
      config={fieldConfig}
      control={
        <input
          type={'checkbox'}
          value={config.name}
          id={inputId}
          name={fieldConfig.name}
          checked={value as boolean}
          onChange={handleChange}
          disabled={config.disabled}
        />
      }
    />
  );
};
