import { InputFieldLayoutProps } from '@mito-forms/core';
import React from 'react';

export const BulmaListInputField: React.FunctionComponent<InputFieldLayoutProps> = ({
  required,
  label,
  id,
  controlElement,
  helpText,
  validationErrors,
  // isValid,
  // infoElement,
}) => {
  return (
    <div className={'field'}>
      {label && (
        <label className="label mt-input-label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className={`field${required ? ' mf-required-field' : ''}`}>{controlElement}</div>
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
