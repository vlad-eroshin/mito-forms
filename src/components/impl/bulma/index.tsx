import { ComponentRegistry, InputFieldRegistry, UtilityComponentRegistry } from '../../../types';
import { TextField } from './inputs/TextField';
import React from 'react';
import { TabbedSection } from './components/Tabs/TabbedSection';
import { RadioList } from './inputs/RadioList';
import { CheckList } from './inputs/CheckList';
import { Selector } from './inputs/Selector';
import { BulmaFieldset } from './inputs/BulmaFieldset';
import { SwitchList } from './inputs/SwitchList';
import { TextArea } from './inputs/TextArea';
import { StaticText } from './inputs/StaticText';
import { FileUpload } from './inputs/FileUpload';
import { ButtonSelectorField } from './inputs/ButtonSelectorField';
import { CheckBox } from './inputs/CheckBox';
import { PasswordField } from './inputs/PasswordField';
import { SwitchField } from './inputs/SwitchField';
import { ProgressBar } from './inputs/ProgressBar';
import { DeleteRowButton } from './components/DeleteRowButton';
import { LoadingIndicator } from './components/LoadingIndicator';

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
  fileUpload: FileUpload
};


const BULMA_UTIL_COMPONENTS: UtilityComponentRegistry = {
  loading: LoadingIndicator,
  block: props => <div className={`box ${props.className}`}>{props.children}</div>,
  tabbedSection: TabbedSection,
  fieldset: BulmaFieldset,
  deleteRowButton: DeleteRowButton
};

export const BULMA_REGISTRY: ComponentRegistry = {
  utilityComponents: BULMA_UTIL_COMPONENTS,
  inputFields: BULMA_INPUTS
};