import React from 'react';
import { FormInputFieldProps } from '../../../core/src/FormInputField';
import { InputField } from '../../../core/src/types';
import { useChangeHandler } from '../../../core/src/hooks';
import { getFieldId } from '../../../core/src/utils';
import 'bulma/bulma.scss';
import { BulmaField } from './BulmaField';

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
          area-label={fieldConfig.label}
          value={(value as string) ?? ''}
          placeholder={fieldConfig.placeHolderText ?? 'Place holder'}
          required={fieldConfig.required}
          onChange={handleChange}
        />
      }
      validationErrors={validationErrors}
      isValid={isValid}
    />
  );
};
