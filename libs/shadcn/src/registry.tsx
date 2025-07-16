import React from 'react';
import type {
  BlockComponentProps,
  ComponentRegistry,
  DecoratorRegistry,
  FieldsetProps,
  FormMetadata,
  InputFieldLayoutProps,
  InputFieldRegistry,
  ListInputProps,
  UtilityComponentRegistry
} from '@mito-forms/core';

// Import UI components
import { AddRowButton } from './components/AddRowButton';
import { DeleteRowButton } from './components/DeleteRowButton';
import { LoadingIndicator } from './components/LoadingIndicator';
import { FormDivider } from './components/FormDivider';
import { TabbedSection } from './components/TabbedSection';

// Import input components
import { TextField } from './inputs/TextField';
import { TextArea } from './inputs/TextArea';
import { PasswordField } from './inputs/PasswordField';
import { CheckBox } from './inputs/CheckBox';
import { Selector } from './inputs/Selector';
import { SwitchField } from './inputs/SwitchField';
import { RadioList } from './inputs/RadioList';
import { FileUpload } from './inputs/FileUpload';
import { ProgressBar } from './inputs/ProgressBar';
import { StaticText } from './inputs/StaticText';
import { ButtonSelector } from './inputs/ButtonSelector';

// Import decorators
import { FieldDecorator } from './decorators/FieldDecorator';
import { FieldsetDecorator } from './decorators/FieldsetDecorator';

// Import ListEditor
import { ListEditor } from './components/ListEditor';

// Block component for layout
const Block: React.FunctionComponent<BlockComponentProps> = ({ className, children }) => (
  <div className={className}>{children}</div>
);

// Create the input field registry
const inputFields: InputFieldRegistry = {
  text: TextField,
  textbox: TextArea,
  password: PasswordField,
  checkbox: CheckBox,
  select: Selector,
  switch: SwitchField,
  radio: RadioList,
  fileUpload: FileUpload,
  progress: ProgressBar,
  staticText: StaticText,
  buttonSelector: ButtonSelector,
  checkList: () => <div>CheckList (Not implemented)</div>,
  switchList: () => <div>SwitchList (Not implemented)</div>
};

// Create the utility components registry
const utilityComponents: UtilityComponentRegistry = {
  addRowButton: AddRowButton,
  deleteRowButton: DeleteRowButton,
  loading: LoadingIndicator,
  block: Block,
  tabbedSection: TabbedSection,
  divider: FormDivider
};

// Create the decorators registry
const decorators: DecoratorRegistry = {
  defaultFieldDecorator: FieldDecorator,
  defaultFieldsetDecorator: FieldsetDecorator,
  defaultFormDecorator: undefined,
  defaultListEditorDecorator: ListEditor,
  customDecorators: {
    compactField: FieldDecorator,
    tableRowFieldset: FieldsetDecorator
  }
};

// Create the main component registry
export const SHADCN_REGISTRY: ComponentRegistry = {
  inputFields,
  utilityComponents,
  decorators,
  getFieldDecorator: (decoratorName: string): React.FunctionComponent<InputFieldLayoutProps> => {
    const result = decorators.customDecorators[decoratorName];
    if (!result) {
      return decorators.defaultFieldDecorator;
    }
    return result;
  },
  getFieldsetDecorator: (decoratorName: string): React.FunctionComponent<FieldsetProps> => {
    const result = decorators.customDecorators[decoratorName];
    if (!result) {
      return decorators.defaultFieldsetDecorator;
    }
    return result;
  },
  getFormDecorator: (decoratorName: string): React.FunctionComponent<FormMetadata> => {
    const result = decorators.customDecorators[decoratorName];
    if (!result) {
      return decorators.defaultFormDecorator;
    }
    return result;
  },
  getListEditorDecorator: (decoratorName: string): React.FunctionComponent<ListInputProps> => {
    const result = decorators.customDecorators[decoratorName];
    if (!result) {
      return decorators.defaultListEditorDecorator;
    }
    return result;
  }
};
