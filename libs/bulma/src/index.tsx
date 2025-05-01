import { ComponentRegistry, InputFieldRegistry, UtilityComponentRegistry } from '@mito-forms/core';
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './bulma-theme.scss';
import '@mito-forms/core/core.css';

import { AddRowButton } from './components/AddRowButton';
import { DeleteRowButton } from './components/DeleteRowButton';
import { LoadingIndicator } from './components/LoadingIndicator';
import { TabbedSection } from './components/Tabs/TabbedSection';
import { BulmaFieldset } from './inputs/BulmaFieldset';
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
  fieldset: BulmaFieldset,
  deleteRowButton: DeleteRowButton,
};

export const BULMA_REGISTRY: ComponentRegistry = {
  utilityComponents: BULMA_UTIL_COMPONENTS,
  inputFields: BULMA_INPUTS,
};
