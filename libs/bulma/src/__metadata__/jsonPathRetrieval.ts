import { EditorMetadata } from '@mito-forms/core';

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
          fields: [
            {
              type: 'staticText',
              label: 'Access numeric value',
              helpText: `$.other.numericValue1`,
              name: 'numericValue',
              value: '{$.other.numericValue1}',
            },
            {
              type: 'text',
              label: 'Text Value',
              helpText: 'Json path $.other.textValue',
              name: 'textValue',
              value: '{$.other.textValue}',
            },
            {
              type: 'select',
              name: 'selector',
              label: 'Selector ',
              helpText: 'Retrieves options from $.someData.to.listOfOptions',
              options: '{$.someData.to.listOfOptions}',
              value: 1,
            },
            {
              type: 'checkbox',
              name: 'checkboxList',
              label: 'Check List',
              helpText: 'Options loaded from $.someData.to.listOfOptions',
              options: '{$.someData.to.listOfOptions}',
              value: 1,
            },
            {
              type: 'radio',
              name: 'radioList',
              label: 'Radio buttons',
              helpText: 'Retrieves options from ($.someData.to.listOfOptions)',
              options: '{$.someData.to.listOfOptions}',
              value: 1,
            },
            {
              type: 'switch',
              name: 'switchList',
              label: 'Switch List',
              helpText: 'Retrieves options from ($.someData.to.switchListOfOptions)',
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
