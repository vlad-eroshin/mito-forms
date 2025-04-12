import type { EditorMetadata } from '../../types';
import * as R from 'ramda';

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
              label: 'Label'
            },
            {
              type: 'text',
              name: 'text',
              label: 'Value'
            }
          ]
        }
      ]
    }
  ],
  reducersMap: {
    widgetParams: {
      widgetParams: (editorData: { widgetParams: unknown; }, fieldSetData: { label: string; text: string; }) => {
        const setLabel = (label: string) => {
          return function(data: { widgetParams: unknown; }) {
            return {
              ...data,
              widgetParams: {
                ...data.widgetParams as object,
                label
              }
            };
          };
        };
        const setText = (text: string) => {
          return function(data: { widgetParams: unknown; }) {
            return {
              ...data,
              widgetParams: {
                ...data.widgetParams as object,
                text
              }
            };
          };
        };
        return R.compose(setLabel(fieldSetData.label), setText(fieldSetData.text))(editorData);
      }
    }
  }
};
