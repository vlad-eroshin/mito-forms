import type { Meta, StoryObj } from '@storybook/react';
import type { InputFieldRegistry, ParamsMap } from '../../types';
import { CORE_UI_INPUTS } from '../EditorInput';
import INPUT_DATA from '../__data__/mockInputObject.json';
import { basicEditor } from '../__metadata__/basic';
import { editorWithCollapsibleFieldsets } from '../__metadata__/collapsibleFieldsets';
import { editorWithConditions } from '../__metadata__/editorWithConditions';
import { editorWithJsonPath } from '../__metadata__/jsonPathRetrieval';
import { staticTextEditor } from '../__metadata__/staticText';
import { tabbedLayout } from '../__metadata__/tabbedLayout';
import { withListEditor } from '../__metadata__/withListEditor';
import { FormEditorStory } from './FormEditorStory';
const meta: Meta<typeof FormEditorStory> = {
  title: 'Form Editor/Usage',
  component: FormEditorStory,
  decorators: [],
  parameters: {},
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
  ...CORE_UI_INPUTS,
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
    inputFieldRegistry: missingFieldRegistry as InputFieldRegistry,
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
