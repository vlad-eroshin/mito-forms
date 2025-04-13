import React, { FunctionComponent } from 'react';
import { FormInputFieldProps } from '../../FormInputField';
import { InputField, InputOption } from '../../../types';
import { useOptionsChangeHandler } from '../../hooks';
import { convertInputOptions, generateReactKey, getFieldId } from '../../utils';
import { BulmaField } from './BulmaField';

export const Selector: FunctionComponent<FormInputFieldProps> = (props) => {
  const {
    config,
    value,
    fieldIndex,
    options,
    onChange
  } = props;
  const fieldConfig = config as InputField;
  const handleChange = useOptionsChangeHandler(fieldConfig, options as InputOption[], onChange);
  const convertedOptions = options ? convertInputOptions(options, [value as (string | number)]) : [];
  const inputId = getFieldId(config);

  return (<BulmaField
    {...props}
    id={inputId}
    config={fieldConfig}
    fieldIndex={fieldIndex}
    control={
      <div className={'select'}>
        <select className={'mf-select'} id={inputId} onChange={handleChange}>
          {convertedOptions.map((opt) => {
            const optId = generateReactKey(config.name, opt.label);
            return (<option key={optId} value={`${opt.value}`}>
              {opt.label}
            </option>);
          })
          }
        </select>
      </div>
    }
  />);
};