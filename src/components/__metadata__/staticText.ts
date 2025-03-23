import type { EditorMetadata } from '../../types';

export const staticTextEditor: EditorMetadata = {
  activeForm: 'widgetParams',
  forms: [
    {
      id: 'widgetParams',
      title: 'Static Text',
      fieldSets: [
        {
          name: 'widgetParams',
          jsonPath: 'widgetParams',
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
