import React, { FunctionComponent } from 'react';
import { FormInputFieldProps } from '../../FormInputField';
import { InputField, InputOption } from '../../../types';
import { useOptionsChangeHandler } from '../../hooks';
import { convertInputOptions, generateReactKey, getFieldId } from '../../utils';

export const Selector: FunctionComponent<FormInputFieldProps> = ({
                                                                   config,
                                                                   onChange,
                                                                   value,
                                                                   options
                                                                 }) => {
  const fieldConfig = config as InputField;
  const handleChange = useOptionsChangeHandler(fieldConfig, options as InputOption[], onChange);
  const convertedOptions = options ? convertInputOptions(options, [value as (string | number)]) : [];
  const inputId = getFieldId(config);
  return <div className={'field'}>
    {fieldConfig.label && <label className={'label'} htmlFor={inputId}>{fieldConfig.label}</label>}
    <div className={'select'}>
      <select className={'mf-select'} id={inputId} onChange={handleChange}>
        {convertedOptions.map((opt) => {
          const optId = generateReactKey(config.name, opt.label);
          return <option key={optId} value={`${opt.value}`}>
            {opt.label}
          </option>;
        })}
      </select>
    </div>
  </div>;
};