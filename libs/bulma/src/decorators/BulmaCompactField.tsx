import { InputFieldLayoutProps } from '@mito-forms/core';
import React from 'react';

export const BulmaCompactField: React.FunctionComponent<InputFieldLayoutProps> = ({
  required,
  label,
  id,
  controlElement,
  isValid,
  helpText,
  validationErrors,
  customProps = {},
}) => {
  const { leftIcon, rightIcon } = customProps;

  return (
    <div className={`field${required ? ' mf-required-field' : ''}`}>
      {label && (
        <label className="label mt-input-label" htmlFor={id}>
          {label}
        </label>
      )}
      <div
        className={`control${leftIcon ? ' has-icons-left' : ''}${rightIcon ? ' has-icons-right' : ''}${!isValid ? ' mf-invalid-field' : ''}`}
      >
        {controlElement}
      </div>
      {helpText && <p className={'help'}>{helpText}</p>}
      {validationErrors &&
        validationErrors.map(error => (
          <p key={error} className={'help is-danger'}>
            {error}
          </p>
        ))}
    </div>
  );
};
