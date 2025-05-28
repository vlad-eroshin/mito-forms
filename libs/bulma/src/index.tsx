import {
  ComponentRegistry,
  DecoratorRegistry,
  FieldsetProps,
  FormMetadata,
  InputFieldLayoutProps,
  InputFieldRegistry,
  ListEditorMetadata,
  UtilityComponentRegistry,
} from '@mito-forms/core';
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './bulma-theme.scss';
import '@mito-forms/core/core.css';

import { AddRowButton } from './components/AddRowButton';
import { DeleteRowButton } from './components/DeleteRowButton';
import { LoadingIndicator } from './components/LoadingIndicator';
import { TabbedSection } from './components/Tabs/TabbedSection';
import { BulmaCompactField, BulmaHorizontalField } from './decorators';
import { BulmaFieldset } from './decorators/BulmaFieldset';
import { BulmaMultiColumnFieldset } from './decorators/BulmaMultiColumnFieldset';
import { BulmaTableRowFieldset } from './decorators/BulmaTableRowFieldset';
import { ButtonSelectorField } from './inputs/ButtonSelectorField';
import { CheckBox } from './inputs/CheckBox';
import { CheckList } from './inputs/CheckList';
import { FileUpload } from './inputs/FileUpload';
import { PasswordField } from './inputs/PasswordField';
import { ProgressBar } from './inputs/ProgressBar';
import { RadioList } from './inputs/RadioList';
import { Selector } from './inputs/Selector';
import { StaticText } from './inputs/StaticText';
import { SwitchField } from './inputs/SwitchField';
import { SwitchList } from './inputs/SwitchList';
import { TextArea } from './inputs/TextArea';
import { TextField } from './inputs/TextField';

const BULMA_INPUTS: InputFieldRegistry = {
  progress: ProgressBar,
  password: PasswordField,
  buttonSelector: ButtonSelectorField,
  checkList: CheckList,
  switchList: SwitchList,
  checkbox: CheckBox,
  radio: RadioList,
  select: Selector,
  staticText: StaticText,
  switch: SwitchField,
  text: TextField,
  textbox: TextArea,
  fileUpload: FileUpload,
};

const BULMA_UTIL_COMPONENTS: UtilityComponentRegistry = {
  addRowButton: AddRowButton,
  loading: LoadingIndicator,
  block: props => <div className={`box ${props.className}`}>{props.children}</div>,
  tabbedSection: TabbedSection,
  deleteRowButton: DeleteRowButton,
};

export const BULMA_DECORATOR_REGISTRY: DecoratorRegistry = {
  defaultFieldDecorator: BulmaCompactField,
  defaultFieldsetDecorator: BulmaFieldset,
  defaultFormDecorator: undefined,
  defaultListEditorDecorator: undefined,
  defaultListItemDecorator: undefined,
  defaultListHeaderDecorator: undefined,
  customDecorators: {
    compactField: BulmaCompactField,
    horizontalField: BulmaHorizontalField,
    horizontalJustifiedField: BulmaHorizontalField,
    multiColumnFieldset: BulmaMultiColumnFieldset,
    tableRowFieldset: BulmaTableRowFieldset,
  },
};

export const BULMA_REGISTRY: ComponentRegistry = {
  utilityComponents: BULMA_UTIL_COMPONENTS,
  inputFields: BULMA_INPUTS,
  decorators: BULMA_DECORATOR_REGISTRY,
  getFieldDecorator: function (
    decoratorName: string
  ): React.FunctionComponent<InputFieldLayoutProps> {
    const result = this.decorators.customDecorators[decoratorName];
    if (!result) {
      console.error(
        `Custom Field decorator with name '${decoratorName}' not found. Proceeding with default Field.`
      );
      return this.decorators.defaultFieldDecorator;
    }
    return result;
  },
  getFieldsetDecorator: function (decoratorName: string): React.FunctionComponent<FieldsetProps> {
    const result = this.decorators.customDecorators[decoratorName];
    if (!result) {
      console.error(
        `Custom FieldSet decorator with name '${decoratorName}' not found. Proceeding with default Field.`
      );
      return this.decorators.defaultFieldsetDecorator;
    }
    return result;
  },
  getFormDecorator: function (decoratorName: string): React.FunctionComponent<FormMetadata> {
    const result = this.decorators.customDecorators[decoratorName];
    if (!result) {
      console.error(
        `Custom Form decorator with name '${decoratorName}' not found. Proceeding with default Field.`
      );
      return this.decorators.defaultFormDecorator;
    }
    return result;
  },
  getListEditorDecorator: function (
    decoratorName: string
  ): React.FunctionComponent<ListEditorMetadata> {
    const result = this.decorators.customDecorators[decoratorName];
    if (!result) {
      console.error(
        `Custom ListEditor decorator with name '${decoratorName}' not found. Proceeding with default Field.`
      );
      return this.decorators.defaultListEditorDecorator;
    }
    return result;
  },
  getListItemDecorator: function (decoratorName: string): React.FunctionComponent<unknown> {
    const result = this.decorators.customDecorators[decoratorName];
    if (!result) {
      console.error(
        `Custom ListItem decorator with name '${decoratorName}' not found. Proceeding with default Field.`
      );
      return this.decorators.defaultListItemDecorator;
    }
    return result;
  },
  getListHeaderDecorator: function (decoratorName: string): React.FunctionComponent<unknown> {
    const result = this.decorators.customDecorators[decoratorName];
    if (!result) {
      console.error(
        `Custom ListHeader decorator with name '${decoratorName}' not found. Proceeding with default Field.`
      );
      return this.decorators.defaultListHeaderDecorator;
    }
    return result;
  },
};
