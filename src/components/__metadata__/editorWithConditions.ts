import type { EditorMetadata } from '../../types';
import { ConditionTypeEnum } from '../../types';

export const editorWithConditions = {
  displayAs: 'onePage',
  activeForm: 'Form1',
  forms: [
    {
      id: 'Form1',
      title: 'Form with conditional input Fields and FieldSets',
      fieldSets: [
        {
          name: 'fieldset2',
          title: 'Fieldset With Title',
          showTitle: true,
          fields: [
            {
              label: "Select value (Select 'option2' to show text field)",
              name: 'selector',
              type: 'select',
              default: '1',
              options: [
                {
                  value: '1',
                  label: 'option 1',
                },
                {
                  value: '2',
                  label: 'option 2',
                },
              ],
            },
          ],
        },
        {
          name: 'fieldset1',
          title: 'Other fieldset',
          showTitle: true,
          fields: [
            {
              name: 'textInput',
              type: 'text',
              value: 'initialValue',
              label: "Text input (shown only when 'option2' selected)",
              required: true,
              showIf: {
                value: '$.Form1.fieldset2.data.selector',
                value2: '2',
                type: ConditionTypeEnum.Equal,
              },
            },
            {
              name: 'switchInput',
              type: 'switch',
              label: 'Show yes/no',
              value: true,
            },
            {
              name: 'oneMoreConditional',
              type: 'text',
              label: 'Test Label',
              showIf: {
                value: '$.Form1.fieldset1.data.switchInput',
                value2: true,
                type: ConditionTypeEnum.Equal,
              },
            },
            {
              name: 'showFieldset3',
              type: 'switch',
              label: 'Show/Hide FieldSet below',
              value: false,
            },
          ],
        },
        {
          name: 'fieldset3',
          title: 'Fieldset Displayed when the Switch is on',
          showTitle: true,
          showIf: {
            value: '$.Form1.fieldset1.data.showFieldset3',
            value2: true,
            type: ConditionTypeEnum.Equal,
          },
          fields: [
            {
              label: 'Option Selector',
              name: 'selectorField',
              type: 'select',
              default: '1',
              options: [
                {
                  value: '1',
                  label: 'Choice One',
                },
                {
                  value: '2',
                  label: 'Choice Two',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  reducersMap: {},
} as EditorMetadata;
