import React from 'react';
import type {
  DataStatus,
  FieldsLayout,
  InputField,
  InputFieldType,
  InputOption,
  ParamsMap,
  ParamValue
} from '../types';
import './FormInputField.scss';
import { useInputFieldComponent } from './hooks/context/useInputFieldComponent';

/**
 * Wrapper around most of the form input types supported.
 */
export type FormInputFieldProps = {
  config: InputField;
  value: ParamValue;
  onChange: (paramsMap: ParamsMap) => void;
  label?: string;
  options?: string[] | InputOption[] | undefined;
  status?: DataStatus | undefined;
  renderAsFormElement?: boolean;
  fieldIndex?: number;
  isValid?: boolean;
  validationErrors?: string[];
  fieldLayout?: FieldsLayout;
};

export function FormInputField<T>({
                                    config,
                                    value,
                                    onChange,
                                    options,
                                    label,
                                    status,
                                    renderAsFormElement = true,
                                    fieldIndex = 0,
                                    isValid = true,
                                    validationErrors,
                                    fieldLayout
                                  }: FormInputFieldProps) {
  const InputCMP = useInputFieldComponent(config.type as InputFieldType);

  return renderAsFormElement ? (
    <InputCMP config={config} value={value} label={label} onChange={onChange} options={options} isValid={isValid}
              validationErrors={validationErrors} fieldLayout={fieldLayout} fieldIndex={fieldIndex} />
  ) : (
    <InputCMP
      renderAsFormElement={false}
      fieldIndex={fieldIndex}
      config={config}
      value={value}
      label={label}
      onChange={onChange}
      options={options}
      status={status}
      isValid={isValid}
      validationErrors={validationErrors}
    />
  );
}


