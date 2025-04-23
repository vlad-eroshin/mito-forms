import { EditorMetadata } from '@mito-forms/core';

export const basicEditor: EditorMetadata = {
  activeForm: 'form1',
  forms: [
    {
      id: 'form1',
      title: 'Basic Form',
      fieldSets: [
        {
          name: 'fieldset1',
          fields: [
            {
              type: 'text',
              name: 'label',
              label: 'Label',
              required: true,
            },
            {
              type: 'select',
              name: 'selector',
              label: 'Select Option',
              default: 1,
              options: [
                { label: 'Option 1', value: 1 },
                { label: 'Option 2', value: 2 },
              ],
            },
          ],
        },
      ],
    },
  ],
  reducersMap: {},
};
