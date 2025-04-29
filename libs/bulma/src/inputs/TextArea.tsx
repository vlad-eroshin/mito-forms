import { FormInputFieldProps, getFieldId, InputField, useChangeHandler } from '@mito-forms/core';
import React from 'react';

import 'bulma/bulma.scss';
import { BulmaField } from './BulmaField';

export const TextArea: React.FunctionComponent<FormInputFieldProps> = props => {
  const { config, onChange, value, fieldIndex, isValid, validationErrors } = props;
  const fieldConfig = config as InputField;
  const handleChange = useChangeHandler(fieldConfig, onChange);
  const inputId = getFieldId(config, fieldIndex);
  return (
    <BulmaField
      {...props}
      id={inputId}
      config={fieldConfig}
      control={
        <textarea
          id={inputId}
          className="input mt-input-text-field"
          data-testid={inputId}
          aria-label={fieldConfig.label}
          value={(value as string) ?? ''}
          placeholder={fieldConfig.placeHolderText}
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
