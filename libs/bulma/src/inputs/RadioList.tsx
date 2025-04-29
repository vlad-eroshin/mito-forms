import {
  convertInputOptions,
  FormInputFieldProps,
  generateReactKey,
  getFieldId,
  InputField,
  InputOption,
  useOptionsChangeHandler,
} from '@mito-forms/core';
import React, { FunctionComponent } from 'react';

import { BulmaField } from './BulmaField';
import './Selector.scss';

export const RadioList: FunctionComponent<FormInputFieldProps> = props => {
  const { config, onChange, value, options } = props;
  const fieldConfig = config as InputField;
  const handleChange = useOptionsChangeHandler(fieldConfig, options as InputOption[], onChange);
  const convertedOptions = options ? convertInputOptions(options, [value as string | number]) : [];
  const inputId = getFieldId(config);
  return (
    <BulmaField
      {...props}
      id={inputId}
      config={fieldConfig}
      control={
        <div className={'radios is-flex-direction-column'}>
          {convertedOptions.map(opt => {
            const optId = generateReactKey(config.name, opt.label);
            return (
              <label key={`${opt.value}`} className={'radio mf-radio'} htmlFor={optId}>
                <input
                  type={'radio'}
                  value={`${opt.value}`}
                  checked={opt.value === value}
                  id={optId}
                  name={config.name}
                  onChange={handleChange}
                  disabled={config.disabled || opt.disabled}
                />
                &nbsp;{opt.label}
              </label>
            );
          })}
        </div>
      }
    />
  );
};
