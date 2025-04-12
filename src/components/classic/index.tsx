import { InputFieldRegistry, UtilityComponentRegistry } from '../../types';
import { TextField } from './inputs/TextField';
import React from 'react';
import { TabbedSection } from './Tabs/TabbedSection';
import { RadioList } from './inputs/RadioList';
import { CheckList } from './inputs/CheckList';
import { Selector } from './inputs/Selector';
import Fieldset from './inputs/Fieldset';
import { SwitchList } from './inputs/SwitchList';
import { TextArea } from './inputs/TextArea';
import { StaticText } from './inputs/StaticText';
import { FileUpload } from './inputs/FileUpload';

export const CLASSIC_INPUTS: InputFieldRegistry = {
  checkbox: CheckList,
  radio: RadioList,
  select: Selector,
  staticText: StaticText,
  switch: SwitchList,
  text: TextField,
  textbox: TextArea,
  fileupload: FileUpload
};


export const DEFAULT_UTILITY_REGISTRY: UtilityComponentRegistry = {
  loading: props => {
    return <div className={props.className}>{props.loadingText || 'Loading...'}</div>;
  },
  block: props => <div className={`box ${props.className}`}>{props.children}</div>,
  tabbedSection: TabbedSection,
  fieldset: Fieldset
};
