import React from 'react';
import type {
  BlockComponentProps,
  ComponentRegistry,
  FieldsetProps,
  FormInputFieldProps,
  FormMetadata,
  InputFieldLayoutProps,
  InputFieldRegistry,
  InputOption,
  ListEditorMetadata,
  UtilityComponentRegistry,
} from '../../types';
import { MockTabsetComponent } from './mockTabsetComponent';

export const createMockComponentRegistry = (): ComponentRegistry => {
  const utilityComponents: UtilityComponentRegistry = {
    inputFieldLayout: ({ id, label, controlElement, required, isValid }: InputFieldLayoutProps) => (
      <div>
        {label && (
          <label htmlFor={id}>
            {label}
            {required && '*'}
          </label>
        )}
        {controlElement}
        {!isValid && <div>Error</div>}
      </div>
    ),
    addRowButton: () => <button>Add Row</button>,
    loading: () => <div>Loading...</div>,
    block: ({ className, children }: BlockComponentProps) => (
      <div className={className}>{children}</div>
    ),
    tabbedSection: MockTabsetComponent,
    fieldset: ({ legend, children }: FieldsetProps) => (
      <fieldset>
        {legend && <legend>{legend}</legend>}
        {children}
      </fieldset>
    ),
    deleteRowButton: () => <button>Delete Row</button>,
  };

  const inputFields: InputFieldRegistry = {
    text: (props: FormInputFieldProps) => {
      const InputLayout = utilityComponents.inputFieldLayout;
      return (
        <InputLayout
          id={props.config.name}
          label={props.label || props.config.label}
          required={props.config.required}
          isValid={props.isValid !== false}
          controlElement={
            <input
              type="text"
              id={props.config.name}
              value={(props.value as string) || ''}
              onChange={e => props.onChange({ [props.config.name]: e.target.value })}
            />
          }
        />
      );
    },
    fileUpload: (props: FormInputFieldProps) => {
      const InputLayout = utilityComponents.inputFieldLayout;
      return (
        <InputLayout
          id={props.config.name}
          label={props.label || props.config.label}
          required={props.config.required}
          isValid={props.isValid !== false}
          controlElement={
            <input
              type="file"
              id={props.config.name}
              onChange={e => props.onChange({ [props.config.name]: e.target.files?.[0] })}
            />
          }
        />
      );
    },
    checkbox: (props: FormInputFieldProps) => {
      const InputLayout = utilityComponents.inputFieldLayout;
      return (
        <InputLayout
          id={props.config.name}
          label={props.label || props.config.label}
          required={props.config.required}
          isValid={props.isValid !== false}
          controlElement={
            <input
              type="checkbox"
              id={props.config.name}
              checked={props.value as boolean}
              onChange={e => props.onChange({ [props.config.name]: e.target.checked })}
            />
          }
        />
      );
    },
    checkList: (props: FormInputFieldProps) => <div>CheckList</div>,
    select: (props: FormInputFieldProps) => {
      const InputLayout = utilityComponents.inputFieldLayout;
      return (
        <InputLayout
          id={props.config.name}
          label={props.label || props.config.label}
          required={props.config.required}
          isValid={props.isValid !== false}
          controlElement={
            <select
              id={props.config.name}
              value={props.value as string}
              onChange={e => props.onChange({ [props.config.name]: e.target.value })}
            >
              {(props.options as InputOption[])?.map(option => (
                <option key={option.value as string} value={option.value as string}>
                  {option.label}
                </option>
              ))}
            </select>
          }
        />
      );
    },
    radio: (props: FormInputFieldProps) => {
      const InputLayout = utilityComponents.inputFieldLayout;
      return (
        <InputLayout
          id={props.config.name}
          label={props.label || props.config.label}
          required={props.config.required}
          isValid={props.isValid !== false}
          controlElement={
            <input
              type="radio"
              id={props.config.name}
              checked={props.value as boolean}
              onChange={e => props.onChange({ [props.config.name]: e.target.checked })}
            />
          }
        />
      );
    },
    switch: (props: FormInputFieldProps) => {
      const InputLayout = utilityComponents.inputFieldLayout;
      return (
        <InputLayout
          id={props.config.name}
          label={props.label || props.config.label}
          required={props.config.required}
          isValid={props.isValid !== false}
          controlElement={
            <input
              type="checkbox"
              id={props.config.name}
              checked={props.value as boolean}
              onChange={e => props.onChange({ [props.config.name]: e.target.checked })}
            />
          }
        />
      );
    },
    switchList: (props: FormInputFieldProps) => <div>SwitchList</div>,
    staticText: (props: FormInputFieldProps) => <div>Static Text</div>,
    textbox: (props: FormInputFieldProps) => {
      const InputLayout = utilityComponents.inputFieldLayout;
      return (
        <InputLayout
          id={props.config.name}
          label={props.label || props.config.label}
          required={props.config.required}
          isValid={props.isValid !== false}
          controlElement={
            <textarea
              id={props.config.name}
              value={props.value as string}
              onChange={e => props.onChange({ [props.config.name]: e.target.value })}
            />
          }
        />
      );
    },
    password: (props: FormInputFieldProps) => {
      const InputLayout = utilityComponents.inputFieldLayout;
      return (
        <InputLayout
          id={props.config.name}
          label={props.label || props.config.label}
          required={props.config.required}
          isValid={props.isValid !== false}
          controlElement={
            <input
              type="password"
              id={props.config.name}
              value={props.value as string}
              onChange={e => props.onChange({ [props.config.name]: e.target.value })}
            />
          }
        />
      );
    },
    progress: (props: FormInputFieldProps) => <div>Progress</div>,
    buttonSelector: (props: FormInputFieldProps) => <div>Button Selector</div>,
  };

  return {
    inputFields,
    utilityComponents,
    getFieldDecorator: function (
      decoratorName: string
    ): React.FunctionComponent<InputFieldLayoutProps> {
      throw new Error('Function not implemented.');
    },
    getFieldsetDecorator: function (decoratorName: string): React.FunctionComponent<FieldsetProps> {
      throw new Error('Function not implemented.');
    },
    getFormDecorator: function (decoratorName: string): React.FunctionComponent<FormMetadata> {
      throw new Error('Function not implemented.');
    },
    getListEditorDecorator: function (
      decoratorName: string
    ): React.FunctionComponent<ListEditorMetadata> {
      throw new Error('Function not implemented.');
    },
    getListItemDecorator: function (decoratorName: string): React.FunctionComponent<unknown> {
      throw new Error('Function not implemented.');
    },
    getListHeaderDecorator: function (decoratorName: string): React.FunctionComponent<unknown> {
      throw new Error('Function not implemented.');
    },
  };
};
