import type { Meta, StoryObj } from '@storybook/react';
import { TestInputFieldsConfigsMap } from './__metadata__/mockGenericFields';
import type { FormEditorStoryProps } from './__stories__/FormEditorStory';
import { FormEditorStory } from './__stories__/FormEditorStory';
import { ValidatorResult } from '../types';

const meta: Meta<typeof FormEditorStory> = {
  title: 'Form Editor',
  component: FormEditorStory,
  decorators: [],
  parameters: {}
};
export default meta;

type Story = StoryObj<typeof FormEditorStory>;

const AllFieldTypesEditor: FormEditorStoryProps = {
  editorMetadata: {
    displayAs: 'onePage',
    forms: [
      {
        id: 'Form',
        title: 'All Field Types',
        showTitle: true,
        fieldSets: [
          {
            type: 'fieldSet',
            name: 'fieldset',
            fields: [
              {
                type: 'staticText',
                name: 'staticText',
                label: 'Static Text',
                value: 'Some Text'
              },
              {
                type: 'text',
                name: 'text',
                label: 'Text Input',
                value: 'Some Text'
              },
              {
                type: 'select',
                name: 'select',
                label: 'Value Selector',
                options: [
                  { label: 'Option 1', value: 1 },
                  { label: 'Option 2', value: 2 },
                  { label: 'Option 3', value: 3 }
                ],
                value: 1
              },
              {
                type: 'checkbox',
                name: 'checkboxList',
                label: 'Checkbox List',
                options: [
                  { label: 'Option One', value: 1 },
                  { label: 'Option Two', value: 2 },
                  { label: 'Option Three', value: 3 }
                ],
                value: 1
              },
              {
                type: 'switch',
                name: 'switch',
                label: 'Switch',
                value: 1
              },
              {
                type: 'switch',
                name: 'switchList',
                label: 'Switch List',
                value: 1,
                options: [
                  { label: 'Switch Option One', value: 1 },
                  { label: 'Switch Option Two', value: 2 },
                  { label: 'Switch Option Three', value: 3 },
                  { label: 'Switch Option Four', value: 4 }
                ]
              },
              {
                type: 'radio',
                name: 'radio',
                label: 'Radio',
                options: [
                  { label: 'Option 1', value: 1 },
                  { label: 'Option 2', value: 2 },
                  { label: 'Option 3', value: 3 }
                ],
                value: 1
              },
              {
                type: 'textbox',
                name: 'textBox',
                label: 'Text Box'
              },
              {
                name: 'optionSwitch',
                ...TestInputFieldsConfigsMap['switch']
              },
              {
                type: 'staticText',
                name: 'dividerSolid',
                value: 'Divider Solid (default)'
              },
              {
                type: 'divider'
              },
              {
                type: 'staticText',
                name: 'dividerDashed',
                value: 'Divider Dashed'
              },
              { type: 'divider', style: 'dashed' },
              {
                type: 'staticText',
                name: 'dividerDotted',
                value: 'Divider Dotted'
              },
              { type: 'divider', style: 'dotted' },
              {
                type: 'staticText',
                name: 'dividerRounded',
                value: 'Divider Rounded'
              },
              { type: 'divider', style: 'rounded' },
              {
                type: 'staticText',
                name: 'dividerDouble',
                value: 'Divider Double'
              },
              { type: 'divider', style: 'double' }
            ]
          }
        ]
      }
    ],
    reducersMap: {},
    activeForm: '',
    resultValidator: function(data: object): ValidatorResult {
      throw new Error('Function not implemented.');
    }
  },
  throttleChange: false,
  initialData: {}
};

export const AllFieldTypes: Story = {
  args: AllFieldTypesEditor
};
