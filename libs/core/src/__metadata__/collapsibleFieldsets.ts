import type { EditorMetadata } from '../types';

export const editorWithCollapsibleFieldsets: EditorMetadata = {
  displayAs: 'onePage',
  forms: [
    {
      id: 'form',
      title: 'Collapsible Fieldsets',
      showTitle: true,
      fieldSets: [
        {
          name: 'collapsibleFieldSet',
          collapsible: true,
          collapsed: true,
          title: 'Fieldset collapsible',
          showTitle: true,
          fields: [
            {
              type: 'text',
              name: 'textInput',
              label: 'Text input',
            },
            {
              name: 'checkboxInput',
              label: 'Select some option',
              type: 'checkbox',
              options: [
                { value: 'Check1', label: 'Checkbox Option One' },
                { value: 'Check2', label: 'Checkbox Option Two' },
              ],
            },
          ],
        },
        {
          name: 'otherFieldSet',
          collapsible: true,
          collapsed: false,
          title: 'Other Fieldset',
          showTitle: true,
          fields: [
            {
              type: 'select',
              name: 'optionsSelector',
              value: 'opt1',
              options: [
                { value: 'opt1', label: 'Selector Option One' },
                { value: 'opt2', label: 'Selector Option Two' },
              ],
            },
          ],
        },
      ],
    },
  ],
  reducersMap: {},
};
