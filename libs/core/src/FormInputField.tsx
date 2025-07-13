import React from 'react';
import {
  DataStatus,
  FieldsLayout,
  FormInputFieldProps,
  InputField,
  InputFieldType,
  LoadingComponentProps,
} from './types';
import { useInputFieldComponent } from './hooks/context/useInputFieldComponent';
import { useDecorator, useUtilComponent } from './hooks';
import { getFieldId } from './utils';

export function FormInputField<T>({
  config,
  value,
  onChange,
  options,
  label,
  status,
  fieldIndex = 0,
  isValid = true,
  validationErrors,
  fieldLayout,
}: FormInputFieldProps) {
  const InputCMP = useInputFieldComponent(config.type as InputFieldType);
  const { getFieldDecorator } = useDecorator();
  const fieldDecoratorName = getFieldDecoratorName(fieldLayout, config);
  const FieldDecorator = getFieldDecorator(fieldDecoratorName);
  const inputId = getFieldId(config, fieldIndex);
  const LoadingIndicator = useUtilComponent<LoadingComponentProps>('loading');
  return (
    <FieldDecorator
      id={inputId}
      label={label}
      helpText={config.helpText}
      required={config.required}
      customProps={config.customProps}
      controlElement={
        status !== DataStatus.Loaded ? (
          <LoadingIndicator size="small" />
        ) : (
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
        )
      }
      status={status}
      isValid={isValid}
      validationErrors={validationErrors}
    />
  );
}

const getFieldDecoratorName = (fieldLayout: FieldsLayout, fieldConfig: InputField) => {
  if (fieldConfig.fieldDecorator) {
    return fieldConfig.fieldDecorator;
  }
  if (fieldLayout === 'compact') {
    return 'compactField';
  } else if (fieldLayout === 'twoColumn') {
    return 'horizontalField';
  } else if (fieldLayout === 'twoColumnJustified') {
    return 'horizontalJustifiedFieldd';
  } else {
    return 'compactField';
  }
};
