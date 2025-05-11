import { FormInputFieldProps, getFieldId, InputField } from '@mito-forms/core';
import React, { ChangeEvent, FunctionComponent, useCallback } from 'react';

import './SwitchInput.scss';
import { SwitchInput } from './SwitchInput';
import { BulmaField } from '../decorators/BulmaField';

export const SwitchField: FunctionComponent<FormInputFieldProps> = props => {
  const { config, onChange, value } = props;
  const fieldConfig = config as InputField;
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange({ [config.name]: event.target.checked });
      }
    },
    [onChange, config]
  );
  const inputId = getFieldId(config);

  return (
    <BulmaField
      {...props}
      id={inputId}
      config={fieldConfig}
      control={
        <SwitchInput
          name={fieldConfig.name}
          value={value as boolean}
          onChange={handleChange}
          checked={value as boolean}
          disabled={config.disabled}
        />
      }
    />
  );
};
