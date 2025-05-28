import { EditorMetadata } from '@mito-forms/core';

export const basicEditor: EditorMetadata = {
  displayAs: 'tabSet',
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
              name: 'username',
              label: 'User Name',
              required: true,
              customProps: {
                leftIcon: 'faUser',
              },
            },
            {
              type: 'password',
              name: 'password',
              label: 'Password',
              required: true,
              customProps: {
                leftIcon: 'faKey',
              },
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
              customProps: {
                leftIcon: 'faHome',
              },
            },
          ],
        },
      ],
    },
  ],
  reducersMap: {},
};
