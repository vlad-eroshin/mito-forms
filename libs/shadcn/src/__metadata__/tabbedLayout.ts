import { EditorMetadata } from '@mito-forms/core';

export const tabbedLayout: EditorMetadata = {
  displayAs: 'tabSet',
  activeForm: 'Form1',
  forms: [
    {
      id: 'Form1',
      title: 'First Form',
      fieldSets: [
        {
          name: 'fieldset1',
          fields: [
            {
              name: 'textInput',
              type: 'text',
              value: 'initialValue',
              label: 'Text input',
              required: true,
            },
            {
              name: 'switchInput',
              type: 'switch',
              label: 'Switch on/of',
              value: true,
            },
          ],
        },
        {
          name: 'fieldset2',
          title: 'Fieldset With Title',
          showTitle: true,
          fields: [
            {
              label: 'Select value',
              name: 'selector',
              type: 'select',
              default: '1',
              options: [
                {
                  value: '1',
                  label: 'option 1',
                },
                {
                  value: '2',
                  label: 'option 2',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'Form2',
      title: 'Second Form',
      fieldSets: [
        {
          name: 'fieldset3',
          fields: [
            {
              name: 'radio',
              type: 'radio',
              default: '1',
              options: [
                {
                  value: '1',
                  label: 'option 1',
                },
                {
                  value: '2',
                  label: 'option 2',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  reducersMap: {},
};
