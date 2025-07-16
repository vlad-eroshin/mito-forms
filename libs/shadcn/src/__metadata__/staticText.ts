import { EditorMetadata } from '@mito-forms/core';
import * as R from 'ramda';

export const staticTextEditor: EditorMetadata = {
  activeForm: 'widgetParams',
  forms: [
    {
      id: 'widgetParams',
      title: 'Form with Reducer',
      fieldSets: [
        {
          name: 'widgetParams',
          jsonPath: 'widgetParams',
          fields: [
            {
              type: 'text',
              name: 'label',
              label: 'Label',
              value: '!{widgetParams.widgetParams.data.label}',
            },
            {
              type: 'text',
              name: 'text',
              label: 'Value',
              value: '!{widgetParams.widgetParams.data.text}',
            },
          ],
        },
      ],
    },
  ],
  reducersMap: {
    widgetParams: {
      widgetParams: (
        editorData: { widgetParams: unknown },
        fieldSetData: { label: string; text: string }
      ) => {
        const setLabel = (label: string) => {
          return function (data: { widgetParams: unknown }) {
            return {
              ...data,
              widgetParams: {
                ...(data.widgetParams as object),
                label,
              },
            };
          };
        };
        const setText = (text: string) => {
          return function (data: { widgetParams: unknown }) {
            return {
              ...data,
              widgetParams: {
                ...(data.widgetParams as object),
                text,
              },
            };
          };
        };
        return R.compose(setLabel(fieldSetData.label), setText(fieldSetData.text))(editorData);
      },
    },
  },
};
