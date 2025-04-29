import type { InputFieldRegistry, ParamsMap } from '@mito-forms/core';
import { FormEditorStory } from '@mito-forms/core';
import type { Meta, StoryObj } from '@storybook/react';

import INPUT_DATA from './__data__/mockInputObject.json';
import { basicEditor } from './__metadata__/basic';
import { chartEditorMetadata } from './__metadata__/chartEditor';
import { editorWithCollapsibleFieldsets } from './__metadata__/collapsibleFieldsets';
import { editorWithConditions } from './__metadata__/editorWithConditions';
import { editorWithJsonPath } from './__metadata__/jsonPathRetrieval';
import { staticTextEditor } from './__metadata__/staticText';
import { tabbedLayout } from './__metadata__/tabbedLayout';
import { withListEditor } from './__metadata__/withListEditor';
import { BULMA_REGISTRY } from './index';

const meta: Meta<typeof FormEditorStory> = {
  title: 'BULMA/FORM EDITOR',
  component: FormEditorStory,
  decorators: [],
  parameters: {},
  args: {
    componentRegistry: BULMA_REGISTRY,
  },
};
export default meta;

type Story = StoryObj<typeof FormEditorStory>;

export const Basic: Story = {
  args: {
    editorMetadata: {
      ...basicEditor,
      reducersMap: {},
    },
    initialData: {},
  },
};
export const ThrottleChange: Story = {
  args: {
    editorMetadata: {
      ...basicEditor,
      reducersMap: {},
    },
    throttleChange: true,
    initialData: {},
  },
};

export const TabbedLayout: Story = {
  args: {
    editorMetadata: tabbedLayout,
    initialData: {},
  },
};

export const OnePageLayout: Story = {
  args: {
    editorMetadata: {
      ...tabbedLayout,

      forms: [
        { ...tabbedLayout.forms[0], showTitle: true },
        { ...tabbedLayout.forms[1], showTitle: true },
      ],
      displayAs: 'onePage',
    },
    initialData: {},
  },
};

export const ConditionalDisplay: Story = {
  args: {
    editorMetadata: editorWithConditions,
    initialData: {},
  },
};

export const WithReducer: Story = {
  args: {
    editorMetadata: staticTextEditor,
    initialData: {},
  },
};

export const CollapsibleFieldsets: Story = {
  args: {
    editorMetadata: editorWithCollapsibleFieldsets,
    initialData: {},
  },
};

export const ValuesFromJsonPath: Story = {
  args: {
    editorMetadata: editorWithJsonPath,
    initialData: { ...INPUT_DATA },
  },
};
const missingFieldRegistry: unknown = {
  ...BULMA_REGISTRY.inputFields,
  textbox: undefined,
};
export const UnsupportedComponent: Story = {
  args: {
    editorMetadata: {
      activeForm: 'test',
      forms: [
        {
          id: 'test',
          title: 'Test Form',
          fieldSets: [
            {
              name: 'fieldset',
              fields: [
                {
                  type: 'textbox',
                  name: 'textBox',
                  value: 'test',
                  label: 'Unsupported field Type',
                },
                {
                  type: 'text',
                  name: 'textInput',
                  value: 'Some Value',
                  label: 'Some other field',
                },
              ],
            },
          ],
        },
      ],
      reducersMap: {},
    },
    componentRegistry: {
      ...BULMA_REGISTRY,
      inputFields: missingFieldRegistry as InputFieldRegistry,
    },
    initialData: { ...INPUT_DATA },
  },
};

export const WithListEditor: Story = {
  args: {
    editorMetadata: {
      ...withListEditor,
      reducersMap: {
        widgetParams: {
          widgetParams: (editorData: object, newData: ParamsMap) => {
            return {
              ...editorData,
              ...newData,
            };
          },
        },
        listEditor: {
          list: (editorData: object, newData: ParamsMap) => {
            return {
              ...editorData,
              listOfData: newData,
            };
          },
        },
      },
    },
    initialData: {
      label: 'Label',
      text: 'Text',
      listOfData: [
        { field: 'FIELD1', axisType: 'quant' },
        { field: 'FIELD2', axisType: 'temp' },
        { field: 'FIELD3', axisType: 'ordinal' },
      ],
    },
  },
};

export const SwitchComponent: Story = {
  args: {
    editorMetadata: {
      displayAs: 'tabSet',
      activeForm: 'form',
      forms: [
        {
          id: 'form',
          title: 'Form Tab',
          showTitle: true,
          fieldSets: [
            {
              title: 'Some Fieldset Title',
              name: 'fieldsetWithSwitchList',
              showTitle: true,
              fieldsLayout: 'twoColumn',
              fields: [
                {
                  type: 'switch',
                  name: 'switchList',
                  label: 'Switch List',
                  options: [
                    { label: 'Switch One', value: 'one' },
                    { label: 'Switch Two', value: 'two' },
                    { label: 'Switch Three', value: 'three' },
                    { label: 'Switch Four', value: 'four' },
                  ],
                  value: '!{objectOfSomeKind.switchValues}',
                },
                {
                  type: 'checkbox',
                  name: 'checkList',
                  label: 'Check List',
                  options: [
                    { label: 'Check One', value: 1 },
                    { label: 'Check Two', value: 2 },
                    { label: 'Check Three', value: 3 },
                    { label: 'Check Four', value: 4 },
                  ],
                  value: '!{objectOfSomeKind.checkValues}',
                },
              ],
            },
          ],
        },
      ],
      reducersMap: {
        form: {
          fieldsetWithSwitchList: (
            editorData: { objectOfSomeKind: object },
            newData: {
              switchList: string[];
              checkList: number[];
            }
          ) => {
            return {
              ...editorData,
              objectOfSomeKind: {
                ...editorData.objectOfSomeKind,
                switchValues: newData.switchList,
                checkValues: newData.checkList,
              },
            };
          },
        },
      },
    },
    initialData: {
      objectOfSomeKind: {
        switchValues: ['two', 'three'],
        checkValues: [2, 4],
      },
    },
  },
};

export const ChartEditor: Story = {
  args: {
    editorMetadata: chartEditorMetadata,
    initialData: {},
  },
};
