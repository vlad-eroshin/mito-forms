import { ChecklistInput } from './ChecklistInput';
import { RadiolistInput } from './RadiolistInput';
import { SelectInput } from './SelectInput';
import { StaticText } from './StaticText';
import { SwitchInput } from './SwitchInput';
import { TextBoxInput } from './TextBoxInput';
import { TextInput } from './TextInput';
import { InputFieldRegistry } from '../../types';

export const CORE_UI_INPUTS: InputFieldRegistry = {
  text: TextInput,
  checkbox: ChecklistInput,
  select: SelectInput,
  radio: RadiolistInput,
  switch: SwitchInput,
  staticText: StaticText,
  textbox: TextBoxInput
};
