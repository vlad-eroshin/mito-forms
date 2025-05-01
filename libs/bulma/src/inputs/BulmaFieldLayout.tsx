import React, { FunctionComponent } from 'react';

import './BulmaField.scss';
import { InputFieldLayoutProps } from '@mito-forms/core';

export const BulmaFieldLayout: FunctionComponent<InputFieldLayoutProps> = ({
  label,
  controlElement,
  infoElement,
  id,
  fieldLayout,
  required,
  isValid,
}) => {
  return fieldLayout === 'compact' ? (
    <div className={`field${required ? ' mf-required-field' : ''}`}>
      {label && (
        <label className="label mt-input-label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className={`control${!isValid ? ' mf-invalid-field' : ''}`}>{controlElement}</div>
      {infoElement ? infoElement : <></>}
    </div>
  ) : (
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
        <div className={`control mf-center ${!isValid ? ' mf-invalid-field' : ''}`}>
          {controlElement}
          {infoElement ? infoElement : <></>}
        </div>
      </div>
    </div>
  );
};
