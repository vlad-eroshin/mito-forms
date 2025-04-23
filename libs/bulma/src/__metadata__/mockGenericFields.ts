import { InputField, InputFieldType } from '@mito-forms/core';

export const TestInputFieldsConfigsMap: { [key in InputFieldType]: InputField | undefined } = {
  text: {
    name: 'testText',
    type: 'text',
    label: 'Text Field',
  },
  checkbox: {
    name: 'checkboxInput',
    label: 'Simple Check',
    type: 'checkbox',
  },
  select: {
    name: 'selector',
    type: 'select',
    options: [
      { value: 'Value1', label: 'label 1' },
      { value: 'Value2', label: 'label 2' },
    ],
    value: 'Value1',
  },
  radio: {
    name: 'radioInput',
    type: 'radio',
    options: [
      { value: 'Value1', label: 'label 1' },
      { value: 'Value2', label: 'label 2' },
    ],
    value: 'Value1',
  },
  switch: {
    name: 'optionSwitch',
    label: 'Option Switch',
    type: 'switch',
    value: true,
  },
  staticText: {
    name: 'staticText',
    type: 'staticText',
  },
  textbox: {
    name: 'textBoxInput',
    type: 'textbox',
  },
  fileUpload: {
    name: 'fileUpload',
    label: 'File Upload',
    type: 'fileUpload',
  },
  buttonSelector: {
    name: 'buttonSelector',
    type: 'buttonSelector',
    label: 'Button Selector',
    value: 'Value1',
    options: [
      { value: 'Value1', label: 'label 1' },
      { value: 'Value2', label: 'label 2' },
      { value: 'Value3', label: 'label 3' },
      { value: 'Value4', label: 'label 4' },
      { value: 'Value5', label: 'label 5' },
    ],
  },
  checkList: {
    name: 'checkListInput',
    label: 'Checklist',
    type: 'checkList',
    options: [
      { value: 'Value1', label: 'label 1' },
      { value: 'Value2', label: 'label 2' },
    ],
  },
  password: {
    name: 'passwordField',
    type: 'password',
    label: 'Password',
  },
  progress: {
    name: 'progressBar',
    type: 'progress',
    label: 'Progress Bar',
    value: 54,
  },
  switchList: {
    name: 'switchListInput',
    label: 'Switch List',
    type: 'switchList',
    value: ['Value1', 'Value5'],
    options: [
      { value: 'Value1', label: 'label 1' },
      { value: 'Value2', label: 'label 2' },
      { value: 'Value3', label: 'label 3' },
      { value: 'Value4', label: 'label 4' },
      { value: 'Value5', label: 'label 5' },
    ],
  },
};
