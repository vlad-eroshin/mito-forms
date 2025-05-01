import { EditorMetadata } from '@mito-forms/core';

export const withListEditor: EditorMetadata = {
  activeForm: 'widgetParams',
  displayAs: 'tabSet',
  forms: [
    {
      id: 'widgetParams',
      title: 'Static Text',
      fieldSets: [
        {
          name: 'widgetParams',
          fields: [
            {
              type: 'text',
              name: 'label',
              label: 'Label',
            },
            {
              type: 'text',
              name: 'text',
              label: 'Value',
            },
          ],
        },
      ],
    },
    {
      id: 'listEditor',
      title: 'List Editor',
      fieldSets: [
        {
          name: 'fieldset1',
          title: 'First Fieldset',
          jsonPath: 'fieldset1',
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
        {
          name: 'list',
          jsonPath: 'listOfData',
          type: 'fieldSetList',
          canDeleteRows: true,
          showHeader: true,
          label: 'Column Types',
          rowFieldset: {
            name: 'testListEditor',
            fields: [
              { type: 'staticText', name: 'field', label: 'Field Label' },
              {
                type: 'select',
                name: 'axisType',
                label: 'Axis Types',
                options: [
                  { label: 'Quantitative', value: 'quant' },
                  { label: 'Temporal', value: 'temp' },
                  { label: 'Ordinal', value: 'ordinal' },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
  reducersMap: {
    widgetParams: {
      widgetParams: (editorData: object, fieldSetData: object) => {
        return {
          ...editorData,
          widgetParams: {
            ...fieldSetData,
          },
        };
      },
    },
  },
};
