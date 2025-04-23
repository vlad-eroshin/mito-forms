import { EditorMetadata } from '@mito-forms/core';

export const withListEditor: EditorMetadata = {
  activeForm: 'widgetParams',
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
          name: 'list',
          jsonPath: '$.listOfData',
          type: 'fieldSetList',
          canDeleteOrAddRows: false,
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
