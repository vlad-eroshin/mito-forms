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
import { Stack, Typography } from '@mui/material';

/**
 * Wrapper around most of the form input types supported.
 */
export type FormInputFieldProps = {
  config: InputField;
  value: ParamValue;
  onChange: (paramsMap: ParamsMap) => void;
  options?: string[] | InputOption[] | undefined;
  status?: DataStatus | undefined;
  // When used as formElement the input field will be wrapped into core-ui `FormElementRow`
  // When the ussage is `element` the input field is rendered out as any component with label
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
    <Stack direction={'row'}>
      {config.label && <Typography variant="body2">{config.label}</Typography>}
      <InputCMP config={config} value={value} onChange={onChange} options={options} />
    </Stack>
    // <FormControl
    //   data-testid={`elementrow-${config.type}-${config.name}`}
    //   label={config.type === 'switch' && !config.options ? undefined : (config.label as string)}
    //   element={}
    //   formElementID={`${config.type}-${config.name}-${fieldIndex || 0}`}
    //   required={config.required}
    // />
  ) : (
    <Stack direction={'column'}>
      {config.label && <Typography variant="body2">{config.label}</Typography>}
      {/*<Label*/}
      {/*  htmlFor={`${config.type}-${(config as InputField).name}-${fieldIndex || 0}`}*/}
      {/*  display="block"*/}
      {/*  height={0}*/}
      {/*  color="transparent"*/}
      {/*>*/}
      {/*  {config.label}*/}
      {/*</Label>*/}
      <InputCMP
        renderAsFormElement={false}
        fieldIndex={fieldIndex}
        config={config}
        value={value}
        onChange={onChange}
        options={options}
        status={status}
      />
    </Stack>
  );
}

FormInputField.displayName = 'FormInputField';

const UnsupportedInputComponent: React.FunctionComponent<Pick<FormInputFieldProps, 'config'>> = ({
                                                                                                   config
                                                                                                 }) => {
  return (
    <span className="unsupported-input">{`[Unsupported Input Component type (${config.type})]`}</span>
  );
};

UnsupportedInputComponent.displayName = 'UnsupportedInputComponent';
