import React from 'react';
import type {
  BlockComponentProps,
  ComponentRegistry,
  DecoratorRegistry,
  FieldsetProps,
  FormDividerProps,
  FormInputFieldProps,
  FormMetadata,
  InputFieldLayoutProps,
  InputFieldRegistry,
  InputOption,
  ListEditorMetadata,
  ListInputProps,
  UtilityComponentRegistry,
} from '../../types';
import { MockTabsetComponent } from './mockTabsetComponent';

export const createMockComponentRegistry = (): ComponentRegistry => {
  // Mock field decorator component
  const MockFieldDecorator: React.FunctionComponent<InputFieldLayoutProps> = ({
    id,
    label,
    controlElement,
    required,
    isValid,
  }) => (
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
  );

  const utilityComponents: UtilityComponentRegistry = {
    addRowButton: () => <button>Add Row</button>,
    loading: () => <div>Loading...</div>,
    block: ({ className, children }: BlockComponentProps) => (
      <div className={className}>{children}</div>
    ),
    tabbedSection: MockTabsetComponent,
    deleteRowButton: () => <button>Delete Row</button>,
    divider: ({ config }: FormDividerProps) => (
      config.render !== false ? <hr className={`divider ${config.style || 'solid'}`} /> : null
    ),
  };

  const decorators: DecoratorRegistry = {
    defaultFieldDecorator: MockFieldDecorator,
    defaultFieldsetDecorator: ({ legend, children }: FieldsetProps) => (
      <fieldset>
        {legend && <legend>{legend}</legend>}
        {children}
      </fieldset>
    ),
    defaultFormDecorator: undefined,
    defaultListEditorDecorator: ({ data, onChange }: ListInputProps) => (
      <div>Mock List Editor</div>
    ),
    customDecorators: {
      compactField: MockFieldDecorator,
    },
  };

  const inputFields: InputFieldRegistry = {
    text: (props: FormInputFieldProps) => (
      <input
        type="text"
        id={props.config.name}
        value={(props.value as string) || ''}
        onChange={e => props.onChange({ [props.config.name]: e.target.value })}
      />
    ),
    fileUpload: (props: FormInputFieldProps) => (
      <input
        type="file"
        id={props.config.name}
        onChange={e => props.onChange({ [props.config.name]: e.target.files?.[0] })}
      />
    ),
    checkbox: (props: FormInputFieldProps) => (
      <input
        type="checkbox"
        id={props.config.name}
        checked={props.value as boolean}
        onChange={e => props.onChange({ [props.config.name]: e.target.checked })}
      />
    ),
    checkList: (props: FormInputFieldProps) => <div>CheckList</div>,
    select: (props: FormInputFieldProps) => (
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
    ),
    radio: (props: FormInputFieldProps) => (
      <input
        type="radio"
        id={props.config.name}
        checked={props.value as boolean}
        onChange={e => props.onChange({ [props.config.name]: e.target.checked })}
      />
    ),
    switch: (props: FormInputFieldProps) => (
      <input
        type="checkbox"
        id={props.config.name}
        checked={props.value as boolean}
        onChange={e => props.onChange({ [props.config.name]: e.target.checked })}
      />
    ),
    switchList: (props: FormInputFieldProps) => <div>SwitchList</div>,
    staticText: (props: FormInputFieldProps) => <div>Static Text</div>,
    textbox: (props: FormInputFieldProps) => (
      <textarea
        id={props.config.name}
        value={props.value as string}
        onChange={e => props.onChange({ [props.config.name]: e.target.value })}
      />
    ),
    password: (props: FormInputFieldProps) => (
      <input
        type="password"
        id={props.config.name}
        value={props.value as string}
        onChange={e => props.onChange({ [props.config.name]: e.target.value })}
      />
    ),
    progress: (props: FormInputFieldProps) => <div>Progress</div>,
    buttonSelector: (props: FormInputFieldProps) => <div>Button Selector</div>,
  };

  return {
    inputFields,
    utilityComponents,
    decorators,
    getFieldDecorator: function (
      decoratorName: string
    ): React.FunctionComponent<InputFieldLayoutProps> {
      const result = decorators.customDecorators[decoratorName];
      if (!result) {
        return decorators.defaultFieldDecorator;
      }
      return result;
    },
    getFieldsetDecorator: function (decoratorName: string): React.FunctionComponent<FieldsetProps> {
      const result = decorators.customDecorators[decoratorName];
      if (!result) {
        return decorators.defaultFieldsetDecorator;
      }
      return result;
    },
    getFormDecorator: function (decoratorName: string): React.FunctionComponent<FormMetadata> {
      const result = decorators.customDecorators[decoratorName];
      if (!result) {
        return decorators.defaultFormDecorator;
      }
      return result;
    },
    getListEditorDecorator: function (
      decoratorName: string
    ): React.FunctionComponent<ListInputProps> {
      const result = decorators.customDecorators[decoratorName];
      if (!result) {
        return decorators.defaultListEditorDecorator;
      }
      return result;
    },
  };
};
