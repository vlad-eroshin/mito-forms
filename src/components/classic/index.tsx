import { InputFieldRegistry, UtilityComponentRegistry } from '../../types';
import { TextField } from './inputs/TextField';
import React from 'react';
import { TabbedSection } from './Tabs/TabbedSection';
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
import { DeleteRowButton } from './inputs/DeleteRowButton';
import { LoadingIndicator } from './LoadingIndicator';

export const CLASSIC_INPUTS: InputFieldRegistry = {
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


export const DEFAULT_UTILITY_REGISTRY: UtilityComponentRegistry = {
  loading: LoadingIndicator,
  block: props => <div className={`box ${props.className}`}>{props.children}</div>,
  tabbedSection: TabbedSection,
  fieldset: BulmaFieldset,
  deleteRowButton: DeleteRowButton
};
