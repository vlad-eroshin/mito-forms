import type { EditorMetadata } from '../../types';

export const editorWithJsonPath: EditorMetadata = {
  displayAs: 'onePage',
  forms: [
    {
      id: 'form',
      title: 'Form using JSON Path to access values',
      showTitle: true,
      fieldSets: [
        {
          title: 'Path to fieldset data ($.path.to.fieldsetData)',
          name: 'jsonPathFieldset',
          jsonPath: '$.path.to.fieldsetData',
          showTitle: true,
          fieldLayout: 'twoColumn',
          fields: [
            {
              type: 'staticText',
              label: 'Label',
              name: 'label',
            },
            {
              type: 'text',
              label: 'Value',
              name: 'value',
            },
          ],
        },
        {
          title: 'Access data per field',
          name: 'jsonPathPerField',
          showTitle: true,
          fieldLayout: 'twoColumn',
          fields: [
            {
              type: 'staticText',
              label: 'Access numeric value ($.other.numericValue1)',
              name: 'numericValue',
              jsonPath: '$.other.numericValue1',
            },
            {
              type: 'text',
              label: 'Text Value ($.other.textValue)',
              name: 'textValue',
              jsonPath: '$.other.textValue',
            },
            {
              type: 'select',
              name: 'selector',
              label: 'Selector retrieves options from ($.someData.to.listOfOptions)',
              options: '{$.someData.to.listOfOptions}',
              value: 1,
            },
            {
              type: 'checkbox',
              name: 'checkboxList',
              label: 'Check List retrieves options from ($.someData.to.listOfOptions)',
              options: '{$.someData.to.listOfOptions}',
              value: 1,
            },
            {
              type: 'radio',
              name: 'radioList',
              label: 'Radio buttons retrieves options from ($.someData.to.listOfOptions)',
              options: '{$.someData.to.listOfOptions}',
              value: 1,
            },
            {
              type: 'switch',
              name: 'switchList',
              label: 'Switch List retrieves options from ($.someData.to.switchListOfOptions)',
              options: '{$.someData.to.switchListOfOptions}',
              value: 1,
            },
          ],
        },
      ],
    },
  ],
  reducersMap: {},
};
