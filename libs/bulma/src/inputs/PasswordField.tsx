import { FormInputFieldProps, getFieldId, InputField, useChangeHandler } from '@mito-forms/core';
import React from 'react';

import 'bulma/bulma.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';

export const PasswordField: React.FunctionComponent<FormInputFieldProps> = props => {
  const { config, onChange, value, fieldIndex, isValid = true } = props;
  const fieldConfig = config as InputField;
  const handleChange = useChangeHandler(fieldConfig, onChange);
  const inputId = getFieldId(config, fieldIndex);
  const leftIcon = config.customProps?.leftIcon as string;
  const rightIcon = config.customProps?.rightIcon as string;

  return (
    <>
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
      {leftIcon && <span className="icon is-left">{<FontAwesomeIcon icon={fa[leftIcon]} />}</span>}
      {rightIcon && (
        <span className="icon is-right">{<FontAwesomeIcon icon={fa[rightIcon]} />}</span>
      )}
    </>
  );
};
