import React, { FunctionComponent } from 'react';
import { FormInputFieldProps } from '../../FormInputField';
import { InputField, InputOption } from '../../../types';
import { useOptionsChangeHandler } from '../../hooks';
import { convertInputOptions, generateReactKey, getFieldId } from '../../utils';
import './RadioList.scss';

export const RadioList: FunctionComponent<FormInputFieldProps> = ({
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
    <div className={'control radios is-flex-direction-column'} id={inputId}>
      {convertedOptions.map((opt) => {
        const optId = generateReactKey(config.name, opt.label);
        return <label key={`${opt.value}`} className={'radio mf-radio'} htmlFor={optId}>
          <input type={'radio'} value={`${opt.value}`} checked={opt.value === value} id={optId} name={config.name}
                 onChange={handleChange} />
          &nbsp;{opt.label}
        </label>;
      })}
    </div>
  </div>;
};