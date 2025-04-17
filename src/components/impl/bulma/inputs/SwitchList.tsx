import React, { ChangeEvent, FunctionComponent, useCallback, useMemo } from 'react';
import { FormInputFieldProps } from '../../../FormInputField';
import { InputField, InputOption } from '../../../../types';
import { useChecklistHandler } from '../../../hooks';
import {
  buildCheckedValues,
  convertInputOptions,
  generateReactKey,
  getFieldId,
} from '../../../utils';
import './SwitchInput.scss';
import { SwitchInput } from './SwitchInput';
import { BulmaField } from './BulmaField';

export const SwitchList: FunctionComponent<FormInputFieldProps> = props => {
  const { config, onChange, value, options } = props;
  const fieldConfig = config as InputField;
  const hasOptions = options && options.length > 0;
  const checkedValues = useMemo(
    () => (hasOptions ? buildCheckedValues(value) : value ? [config.name] : []),
    [value, hasOptions]
  );
  const convertedOptions = hasOptions
    ? convertInputOptions(options, checkedValues)
    : [
        {
          label: config.label,
          value: config.name,
          checked: `${value}`,
        },
      ];
  const handleChange = hasOptions
    ? useChecklistHandler(fieldConfig, convertedOptions as InputOption[], onChange)
    : useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
          if (onChange) {
            onChange({ [config.name]: event.target.checked });
          }
        },
        [onChange, config]
      );
  const inputId = getFieldId(config);

  return (
    <BulmaField
      {...props}
      id={inputId}
      config={fieldConfig}
      control={
        <div className={'is-flex is-flex-direction-column'} id={inputId}>
          {convertedOptions.map(opt => {
            const optId = generateReactKey(config.name, opt.label);
            const strValue = `${opt.value}`;
            return (
              <label key={`${config.name}-${strValue}`} className={'mf-switch'} htmlFor={optId}>
                <SwitchInput
                  name={strValue}
                  value={strValue}
                  onChange={handleChange}
                  checked={checkedValues.includes(strValue)}
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
