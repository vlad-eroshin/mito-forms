import { FormInputFieldProps, getFieldId, InputField, useChangeHandler } from '@mito-forms/core';
import React from 'react';

import 'bulma/bulma.scss';
import { BulmaField } from '../decorators/BulmaField';

export const PasswordField: React.FunctionComponent<FormInputFieldProps> = props => {
  const { config, onChange, value, fieldIndex, isValid = true, validationErrors } = props;
  const fieldConfig = config as InputField;
  const handleChange = useChangeHandler(fieldConfig, onChange);
  const inputId = getFieldId(config, fieldIndex);
  return (
    <BulmaField
      {...props}
      id={inputId}
      config={fieldConfig}
      control={
        <input
          id={inputId}
          className={`input mt-input-text-field ${!isValid ? 'is-danger' : ''}`}
          type="password"
          data-testid={inputId}
          aria-label={fieldConfig.label}
          value={(value as string) ?? ''}
          placeholder={fieldConfig.placeHolderText ?? 'Place holder'}
          required={fieldConfig.required}
          onChange={handleChange}
          disabled={config.disabled}
        />
      }
      validationErrors={validationErrors}
      isValid={isValid}
    />
  );
};
