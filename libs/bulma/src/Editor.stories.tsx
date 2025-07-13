import {
  DataStatus,
  EditorMetadata,
  FormEditorStory,
  InputFieldRegistry,
  ParamsMap,
  ResultFormat,
} from '@mito-forms/core';
import type { Meta, StoryObj } from '@storybook/react';

import INPUT_DATA from './__data__/mockInputObject.json';
import { basicEditor } from './__metadata__/basic';
import { editorWithCollapsibleFieldsets } from './__metadata__/collapsibleFieldsets';
import { dataSourceUsage } from './__metadata__/dataSourceUsage';
import { editorWithConditions } from './__metadata__/editorWithConditions';
import { editorWithJsonPath } from './__metadata__/jsonPathRetrieval';
import { multiColumnFieldset } from './__metadata__/multiColumnFieldset';
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

const mockMetadata: EditorMetadata = {
  displayAs: 'tabSet',
  activeForm: 'form1',
  forms: [
    {
      id: 'form1',
      title: 'Form 1',
      fieldSets: [
        {
          name: 'fieldset1',
          title: 'Fieldset 1',
          fields: [
            {
              type: 'text',
              name: 'field1',
              label: 'Field 1',
              required: true,
            },
          ],
        },
      ],
    },
    {
      id: 'form2',
      title: 'Form 2',
      fieldSets: [
        {
          name: 'fieldset2',
          title: 'Fieldset 2',
          fields: [
            {
              type: 'text',
              name: 'field2',
              label: 'Field 2',
            },
            {
              type: 'divider',
              style: 'dashed',
            },
            {
              type: 'text',
              name: 'field3',
              label: 'Field 3',
            },
          ],
        },
      ],
    },
  ],
  reducersMap: {},
};

export const BasicForTestsTabs: Story = {
  args: {
    editorMetadata: mockMetadata,
    initialData: {},
  },
};
export const BasicForTestsPage: Story = {
  args: {
    editorMetadata: { ...mockMetadata, displayAs: 'onePage' },
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

export const ConditionalAttributes: Story = {
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
          fieldset1: (editorData: object, newData: ParamsMap) => {
            return {
              ...editorData,
              fieldset1: newData,
            };
          },
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
        { field: 'Speed', axisType: 'quant' },
        { field: 'Date', axisType: 'temp' },
        { field: 'Color', axisType: 'ordinal' },
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
              fields: [
                {
                  type: 'switchList',
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
                  type: 'checkList',
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

export const DataSourceUsage: Story = {
  args: {
    editorMetadata: dataSourceUsage,
    initialData: {},
    delayDataSource: { selectorOptions: 5000, switchList: 2000, radioList: 3000 },
    dataSourceStates: {
      selectorOptions: {
        resultFormat: ResultFormat.RecordsArray,
        data: [
          { label: 'Option 1', value: 1 },
          { label: 'Option 2', value: 2 },
          { label: 'Option 3', value: 3 },
          { label: 'Option 4', value: 4 },
          { label: 'Option 5', value: 5 },
          { label: 'Option 6', value: 6 },
          { label: 'Option 7', value: 7 },
          { label: 'Option 8', value: 8 },
          { label: 'Option 9', value: 9 },
          { label: 'Option 10', value: 10 },
        ],
        id: 'selectorOptions',
        status: DataStatus.Loading,
      },
      switchList: {
        resultFormat: ResultFormat.RecordsArray,
        data: [
          { label: 'Switch 1', value: 1 },
          { label: 'Switch 2', value: 2 },
          { label: 'Switch 3', value: 3 },
          { label: 'Switch 4', value: 4 },
          { label: 'Switch 5', value: 5 },
          { label: 'Switch 6', value: 6 },
          { label: 'Switch 7', value: 7 },
        ],
        id: 'switchList',
        status: DataStatus.Loading,
      },
      radioList: {
        resultFormat: ResultFormat.RecordsArray,
        data: [
          { label: 'Radio Option 1', value: 1 },
          { label: 'Radio Option 2', value: 2 },
          { label: 'Radio Option 3', value: 3 },
          { label: 'Radio Option 4', value: 4 },
          { label: 'Radio Option 5', value: 5 },
        ],
        id: 'radioList',
        status: DataStatus.Loading,
      },
    },
  },
};

export const CustomFieldsetDecorator: Story = {
  args: {
    editorMetadata: {
      ...multiColumnFieldset,
      reducersMap: {},
    },
    initialData: {},
  },
};
