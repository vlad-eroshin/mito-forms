import {
  buildCheckedValues,
  convertInputOptions,
  FormInputFieldProps,
  generateReactKey,
  getFieldId,
  InputField,
  useChecklistHandler,
} from '@mito-forms/core';
import React, { FunctionComponent, useMemo } from 'react';

import { BulmaField } from './BulmaField';

export const CheckList: FunctionComponent<FormInputFieldProps> = props => {
  const { config, onChange, value, options } = props;
  const fieldConfig = config as InputField;
  const checkedValues = useMemo(() => buildCheckedValues(value), [value]);
  const convertedOptions = options ? convertInputOptions(options, checkedValues) : [];
  const handleChange = useChecklistHandler(fieldConfig, convertedOptions, onChange);
  const inputId = getFieldId(config);
  return (
    <BulmaField
      {...props}
      id={inputId}
      config={fieldConfig}
      control={
        <>
          {convertedOptions.map(opt => {
            const optId = generateReactKey(config.name, opt.label);
            const optValue = `${opt.value}`;
            return (
              <div key={optId} className={'mf-option-item'}>
                <input
                  type={'checkbox'}
                  value={optValue}
                  id={optId}
                  name={config.name}
                  checked={checkedValues.includes(optValue)}
                  onChange={handleChange}
                />
                &nbsp;<label htmlFor={optId}>{opt.label}</label>
              </div>
            );
          })}
        </>
      }
    />
  );
};
