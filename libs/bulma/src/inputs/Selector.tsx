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

import { BulmaField } from '../decorators/BulmaField';

export const Selector: FunctionComponent<FormInputFieldProps> = props => {
  const { config, value, fieldIndex, options, onChange } = props;
  const fieldConfig = config as InputField;
  const handleChange = useOptionsChangeHandler(fieldConfig, options as InputOption[], onChange);
  const convertedOptions = options ? convertInputOptions(options, [value as string | number]) : [];
  const inputId = getFieldId(config);

  return (
    <BulmaField
      {...props}
      id={inputId}
      config={fieldConfig}
      fieldIndex={fieldIndex}
      control={
        <div className={'select'}>
          <select
            className={'mf-select'}
            id={inputId}
            onChange={handleChange}
            disabled={config.disabled}
            value={value as string}
          >
            {convertedOptions.map(opt => {
              const optId = generateReactKey(config.name, opt.label);
              return (
                <option key={optId} value={`${opt.value}`}>
                  {opt.label}
                </option>
              );
            })}
          </select>
        </div>
      }
    />
  );
};
