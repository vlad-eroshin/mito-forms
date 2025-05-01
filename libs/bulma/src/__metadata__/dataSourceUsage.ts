import { EditorMetadata } from '@mito-forms/core';

export const dataSourceUsage: EditorMetadata = {
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
              name: 'label',
              label: 'Label',
              required: true,
            },
            {
              type: 'select',
              name: 'selector',
              label: 'Loading Options from DataSource',
              helpText: 'Delayed by 5 seconds',
              default: 1,
              options: [
                { label: 'Option 1', value: 1 },
                { label: 'Option 2', value: 2 },
              ],
              dataBindings: [
                {
                  datasourceId: 'selectorOptions',
                  targetProperty: 'options',
                },
              ],
            },
            {
              type: 'switchList',
              name: 'switchList',
              label: 'Loading Switch Options from DataSource',
              helpText: 'Delayed by 2 seconds',
              default: 1,
              options: [],
              dataBindings: [
                {
                  datasourceId: 'switchList',
                  targetProperty: 'options',
                },
              ],
            },
            {
              type: 'radio',
              name: 'radioList',
              label: 'Loading Radio List from DataSource',
              helpText: 'Delayed by 3  seconds',
              default: 1,
              options: [],
              dataBindings: [
                {
                  datasourceId: 'radioList',
                  targetProperty: 'options',
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
