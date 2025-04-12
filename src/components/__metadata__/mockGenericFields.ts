import type { InputField, InputFieldType } from '../../types';

export const TestInputFieldsConfigsMap: { [key in InputFieldType]: InputField | undefined } = {
  text: {
    name: 'testText',
    type: 'text',
    label: 'Text Field'
  },
  checkbox: {
    name: 'checkboxInput',
    label: '',
    type: 'checkbox',
    options: [
      { value: 'Value1', label: 'label 1' },
      { value: 'Value2', label: 'label 2' }
    ]
  },
  select: {
    name: 'selector',
    type: 'select',
    options: [
      { value: 'Value1', label: 'label 1' },
      { value: 'Value2', label: 'label 2' }
    ],
    value: 'Value1'
  },
  radio: {
    name: 'radioInput',
    type: 'radio',
    options: [
      { value: 'Value1', label: 'label 1' },
      { value: 'Value2', label: 'label 2' }
    ],
    value: 'Value1'
  },
  switch: {
    name: 'optionSwitch',
    label: 'Option Switch',
    type: 'switch',
    value: 'Value1'
  },
  staticText: {
    name: 'staticText',
    type: 'staticText'
  },
  textbox: {
    name: 'textBoxInput',
    type: 'textbox'
  },
  fileupload: {
    name: 'fileUpload',
    label: 'File Upload',
    type: 'fileupload'
  }
};
