import { EditorMetadata } from '@mito-forms/core';

export const editorWithConditions = {
  displayAs: 'onePage',
  activeForm: 'Form1',
  forms: [
    {
      id: 'Form1',
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
            {
              label: 'Switch value to Disable Field below',
              name: 'switchList',
              type: 'switchList',
              default: '1',
              options: [
                {
                  value: '1',
                  label: 'Disable Text Field One',
                },
                {
                  value: '2',
                  label: 'Disable Text Field Two',
                },
                {
                  value: '3',
                  label: 'Disable Text Field Three',
                },
              ],
            },
            {
              name: 'textInputD1',
              type: 'text',
              value: 'initialValue',
              label: 'Text Field One',
              required: true,
              disabled: `!{_STATE.Form1.fieldset2.data.switchList.contains(@, '1')}`,
            },
            {
              name: 'textInputD4',
              type: 'text',
              value: 'initialValue',
              label: 'Text Field Two',
              required: true,
              disabled: `!{_STATE.Form1.fieldset2.data.switchList.contains(@, '2')}`,
            },
            {
              name: 'textInputD3',
              type: 'text',
              value: 'initialValue',
              label: 'Text Field Three',
              required: true,
              disabled: `!{_STATE.Form1.fieldset2.data.switchList.contains(@, '3')}`,
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
              render: `!{_STATE.Form1.fieldset2.data.selector=='2'}`,
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
              render: '!{_STATE.Form1.fieldset1.data.switchInput}',
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
          render: '!{_STATE.Form1.fieldset1.data.showFieldset3}',
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
