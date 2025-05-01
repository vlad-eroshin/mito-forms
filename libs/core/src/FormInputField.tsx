import React from 'react';
import type { FormInputFieldProps, InputFieldType } from './types';
import { useInputFieldComponent } from './hooks/context/useInputFieldComponent';

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
  fieldLayout,
}: FormInputFieldProps) {
  const InputCMP = useInputFieldComponent(config.type as InputFieldType);

  return renderAsFormElement ? (
    <InputCMP
      config={config}
      value={value}
      label={label}
      onChange={onChange}
      options={options}
      isValid={isValid}
      validationErrors={validationErrors}
      fieldLayout={fieldLayout}
      fieldIndex={fieldIndex}
      status={status}
    />
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
