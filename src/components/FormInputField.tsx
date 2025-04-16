import React, { useContext } from 'react';
import type {
  DataStatus,
  EditorContextProps,
  FieldsLayout,
  InputField,
  InputFieldType,
  InputOption,
  ParamsMap,
  ParamValue
} from '../types';
import EditorContext from './EditorContext';
import './FormInputField.scss';

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
  const editorContextData = useContext<EditorContextProps>(EditorContext) as EditorContextProps<T>;
  const InputCMP =
    editorContextData.inputFieldRegistry[config.type as InputFieldType] ||
    UnsupportedInputComponent;

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

FormInputField.displayName = 'FormInputField';

const UnsupportedInputComponent: React.FunctionComponent<Pick<FormInputFieldProps, 'config'>> = ({
                                                                                                   config
                                                                                                 }) => {
  return (
    <div className="unsupported-input">
      {`[Unsupported Input Component type (${config.type}): name: (${config.name})]`}
    </div>
  );
};

UnsupportedInputComponent.displayName = 'UnsupportedInputComponent';
