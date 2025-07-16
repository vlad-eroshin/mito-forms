import type { Meta, StoryObj } from '@storybook/react';
import { SHADCN_REGISTRY } from '../registry';
import { FormEditorStory } from '../__stories__/FormEditorStory';
import { basicEditor } from '../__metadata__/basic';
import { tabbedLayout } from '../__metadata__/tabbedLayout';

const meta: Meta<typeof FormEditorStory> = {
  title: 'SHADCN/FORM EDITOR',
  component: FormEditorStory,
  decorators: [],
  parameters: {},
  args: {
    componentRegistry: SHADCN_REGISTRY
  }
};
export default meta;

export const Basic: StoryObj = {
  args: {
    editorMetadata: {
      ...basicEditor,
      reducersMap: {}
    },
    initialData: {}
  }
};

export const TabbedLayout: StoryObj = {
  args: {
    editorMetadata: tabbedLayout,
    initialData: {}
  }
};

export const OnePageLayout: StoryObj = {
  args: {
    editorMetadata: {
      ...tabbedLayout,

      forms: [
        { ...tabbedLayout.forms[0], showTitle: true },
        { ...tabbedLayout.forms[1], showTitle: true }
      ],
      displayAs: 'onePage'
    },
    initialData: {}
  }
};