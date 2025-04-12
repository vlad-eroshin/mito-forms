import React, { FunctionComponent, useMemo } from 'react';
import { FormInputFieldProps } from '../../FormInputField';
import { InputField } from '../../../types';
import { useChecklistHandler } from '../../hooks';
import { buildCheckedValues, convertInputOptions, generateReactKey, getFieldId } from '../../utils';

export const CheckList: FunctionComponent<FormInputFieldProps> = ({
                                                                    config,
                                                                    onChange,
                                                                    value,
                                                                    options
                                                                  }) => {
  const fieldConfig = config as InputField;
  const checkedValues = useMemo(() => buildCheckedValues(value), [value]);
  const convertedOptions = options ? convertInputOptions(options, checkedValues) : [];
  const handleChange = useChecklistHandler(fieldConfig, convertedOptions, onChange);
  const inputId = getFieldId(config);
  return <div className={'field'}>
    <label className={'label'} htmlFor={inputId}>{config.label}</label>
    <div className="control" id={inputId}>
      {convertedOptions.map((opt) => {
        const optId = generateReactKey(config.name, opt.label);
        const optValue = `${opt.value}`;
        return <div key={optId} className={'mf-option-item'}>
          <input type={'checkbox'} value={optValue} id={optId} name={config.name}
                 checked={checkedValues.includes(optValue)} onChange={handleChange} />
          &nbsp;<label htmlFor={optId}>{opt.label}</label>
        </div>;
      })}
    </div>
  </div>;
};