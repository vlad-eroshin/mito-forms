import { EditorMetadata } from '@mito-forms/core';

export const multiColumnFieldset: EditorMetadata = {
  displayAs: 'onePage',
  forms: [
    {
      id: 'form',
      fieldSets: [
        {
          name: 'collapsibleFieldSet',
          title: 'Column Fieldset Layout',
          fieldSetDecorator: 'multiColumnFieldset',
          customProps: {
            columns: 3,
          },
          fields: [
            {
              type: 'text',
              name: 'textInput',
              label: 'Text Input One',
              customProps: {
                leftIcon: 'faEnvelope',
              },
            },
            {
              name: 'checkboxInput',
              label: 'Select some option',
              type: 'checkList',
              options: [
                { value: 'Check1', label: 'Checkbox Option One' },
                { value: 'Check2', label: 'Checkbox Option Two' },
                { value: 'Check3', label: 'Checkbox Option Three' },
              ],
            },
            {
              type: 'select',
              name: 'optionsSelector',
              value: 'opt1',
              label: 'Options Selector',
              options: [
                { value: 'opt1', label: 'Selector Option One' },
                { value: 'opt2', label: 'Selector Option Two' },
                { value: 'opt3', label: 'Selector Option Two' },
              ],
              customProps: {
                leftIcon: 'faHouse',
              },
            },
            {
              type: 'text',
              name: 'textInput2',
              label: 'Text input Two',
            },
            {
              name: 'checkboxInput2',
              label: 'Select options',
              type: 'checkList',
              options: [
                { value: 'Check1', label: 'Checkbox Option One' },
                { value: 'Check2', label: 'Checkbox Option Two' },
              ],
            },
            {
              type: 'select',
              name: 'optionsSelector2',
              value: 'opt1',
              label: 'Options Selector Two',
              options: [
                { value: 'opt1', label: 'Selector Option One' },
                { value: 'opt2', label: 'Selector Option Two' },
              ],
            },
          ],
        },
      ],
    },
  ],
  reducersMap: {},
};
