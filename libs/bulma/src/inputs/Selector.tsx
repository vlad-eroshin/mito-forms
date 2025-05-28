import * as fa from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

export const Selector: FunctionComponent<FormInputFieldProps> = props => {
  const { config, value, options, onChange } = props;
  const fieldConfig = config as InputField;
  const handleChange = useOptionsChangeHandler(fieldConfig, options as InputOption[], onChange);
  const convertedOptions = options ? convertInputOptions(options, [value as string | number]) : [];
  const inputId = getFieldId(config);
  const leftIcon = config.customProps?.leftIcon as string;
  const rightIcon = config.customProps?.rightIcon as string;

  return (
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
      {leftIcon && <span className="icon is-left">{<FontAwesomeIcon icon={fa[leftIcon]} />}</span>}
      {rightIcon && (
        <span className="icon is-right">{<FontAwesomeIcon icon={fa[rightIcon]} />}</span>
      )}
    </div>
  );
};
