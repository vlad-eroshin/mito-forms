import React, { useContext } from 'react';
import type {
  DataStatus,
  EditorContextProps,
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
  options?: string[] | InputOption[] | undefined;
  status?: DataStatus | undefined;
  renderAsFormElement?: boolean;
  fieldIndex?: number;
};

export function FormInputField<T>({
                                    config,
                                    value,
                                    onChange,
                                    options,
                                    status,
                                    renderAsFormElement = true,
                                    fieldIndex = 0
                                  }: FormInputFieldProps) {
  const editorContextData = useContext<EditorContextProps>(EditorContext) as EditorContextProps<T>;
  const InputCMP =
    editorContextData.inputFieldRegistry[config.type as InputFieldType] ||
    UnsupportedInputComponent;

  return renderAsFormElement ? (
    <div className={'input-container'}>
      <InputCMP config={config} value={value} onChange={onChange} options={options} />
    </div>
  ) : (
    <InputCMP
      renderAsFormElement={false}
      fieldIndex={fieldIndex}
      config={config}
      value={value}
      onChange={onChange}
      options={options}
      status={status}
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
