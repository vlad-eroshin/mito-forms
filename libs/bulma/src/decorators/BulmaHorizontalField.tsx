import { InputFieldLayoutProps } from '@mito-forms/core';
import React from 'react';

export const BulmaHorizontalField: React.FunctionComponent<InputFieldLayoutProps> = ({
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
    <div
      className={`field is-horizontal mf-field-horizontal${required ? ' mf-required-field' : ''}`}
    >
      <div className={'field-label is-normal'}>
        {label && (
          <label className="label mt-input-label" htmlFor={id}>
            {label}
          </label>
        )}
      </div>
      <div className={'field-body'}>
        <div
          className={`control mf-center ${!isValid ? ' mf-invalid-field' : ''} ${leftIcon ? ' has-icons-left' : ''} ${rightIcon ? ' has-icons-right' : ''}`}
        >
          {controlElement}
          {helpText && <p className={'help'}>{helpText}</p>}
          {validationErrors &&
            validationErrors.map(error => (
              <p key={error} className={'help is-danger'}>
                {error}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};
