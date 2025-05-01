import { DataStatus, FormInputFieldProps, generateReactKey, getFieldId } from '@mito-forms/core';
import React, { FunctionComponent, ReactElement } from 'react';

import './BulmaField.scss';
import { BulmaFieldLayout } from './BulmaFieldLayout';
import { LoadingIndicator } from '../components/LoadingIndicator';

type BulmaFieldProps = FormInputFieldProps & {
  id: string;
  control: ReactElement;
};

export const BulmaField: FunctionComponent<BulmaFieldProps> = ({
  config,
  label,
  control,
  fieldIndex,
  isValid,
  validationErrors,
  fieldLayout,
  id,
  renderAsFormElement = true,
  status = DataStatus.Loaded,
}) => {
  const inputId = id || getFieldId(config, fieldIndex);

  if (!renderAsFormElement) {
    return (
      <div className={'field'}>
        {label && (
          <label className="label mt-input-label" htmlFor={inputId}>
            {label}
          </label>
        )}
        <div className={`field${config.required ? ' mf-required-field' : ''}`}>{control}</div>
      </div>
    );
  }
  return (
    <BulmaFieldLayout
      fieldLayout={fieldLayout}
      label={label}
      id={id}
      controlElement={status == DataStatus.Loaded ? control : <LoadingIndicator size={'small'} />}
      required={config.required}
      infoElement={
        <>
          {config.helpText && <p className={'help'}>{config.helpText}</p>}
          {validationErrors && validationErrors.length > 0 && (
            <p className={'help is-danger'}>
              {validationErrors.map(m => {
                const key = generateReactKey(config.name, m);
                return <span key={key}>{m}</span>;
              })}
            </p>
          )}
        </>
      }
      isValid={isValid}
    />
  );
};
