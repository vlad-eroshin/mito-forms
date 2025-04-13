import React, { FunctionComponent, ReactElement } from 'react';
import { generateReactKey, getFieldId } from '../../utils';
import { FormInputFieldProps } from '../../FormInputField';
import './BulmaField.scss';

type BulmaFieldProps = FormInputFieldProps & {
  id: string;
  control: ReactElement;
}

export const BulmaField: FunctionComponent<BulmaFieldProps> = ({
                                                                 config,
                                                                 control,
                                                                 fieldIndex,
                                                                 isValid,
                                                                 validationErrors,
                                                                 fieldLayout,
                                                                 id
                                                               }) => {
  const inputId = id || getFieldId(config, fieldIndex);

  return fieldLayout === 'compact' ? (
    <div className={`field${config.required ? ' mf-required-field' : ''}`}>
      {config.label && <label className="label mt-input-label" htmlFor={inputId}>{config.label}</label>}
      <div className={`control${!isValid ? ' mf-invalid-field' : ''}`}>
        {control}
      </div>
      {validationErrors && validationErrors.length > 0 && <p className={'help is-danger'}>{validationErrors.map(m => {
        const key = generateReactKey(config.name, m);
        return <span key={key}>{m}</span>;
      })}</p>}
    </div>
  ) : (
    <div className={`field is-horizontal mf-field-horizontal${config.required ? ' mf-required-field' : ''}`}>
      <div className={'field-label is-normal'}>{config.label &&
        <label className="label mt-input-label" htmlFor={inputId}>{config.label}</label>}
      </div>
      <div className={'field-body'}>
        <div className={`control mf-center ${!isValid ? ' mf-invalid-field' : ''}`}>
          {control}
        </div>
        {validationErrors && validationErrors.length > 0 && <p className={'help is-danger'}>{validationErrors.map(m => {
          const key = generateReactKey(config.name, m);
          return <span key={key}>{m}</span>;
        })}</p>}
      </div>
    </div>);
};