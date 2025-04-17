import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { ListEditorWrapper } from '../__stories__/ListEditorWrapper';
import { FieldSetMetadata } from '../../types';

const meta: Meta<typeof ListEditorWrapper> = {
  title: 'Form Editor/List Editor',
  component: ListEditorWrapper,
  decorators: [],
  parameters: {},
};
export default meta;

type Story = StoryObj<typeof ListEditorWrapper>;

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const staticText = await canvas.findByText('Static Text Value 1');
    expect(staticText).toBeInTheDocument();
    const textInput = await canvas.findByTestId('text-textValue-0');
    expect(textInput).toBeInTheDocument();
    expect(textInput).toHaveAttribute('value');
    expect(textInput.getAttribute('value')).toBe('Text Value 1');
  },
  args: {
    rowFieldset: {
      name: 'testFieldSet',
      fieldLayout: 'compact',
      arrangeFields: 'row',
      fields: [
        {
          label: 'Some Label',
          name: 'textValue',
          type: 'text',
        },
        {
          label: 'Another Label 123',
          name: 'selector',
          type: 'select',
          options: ['Selector Value 1', 'Value 2'],
        },
        {
          label: '',
          name: 'staticText',
          type: 'staticText',
        },
        {
          label: '',
          name: 'tagKeyLabel',
          type: 'staticText',
        },
        {
          label: 'Tags Selector',
          name: 'tagsSelector',
          options: '{$.tagsSelector#options}',
          placeHolderText: 'Select Tag',
          type: 'select',
        },
      ],
    } as FieldSetMetadata,
    data: [
      {
        staticText: 'Static Text Value 1',
        textValue: 'Text Value 1',
        selector: 'Selector Value 1',
        'tagsSelector#options': ['tag1', 'tag2'],
        tagKeyLabel: 'TagKey1',
        tagsSelector: 'tag2',
      },
      {
        staticText: 'Static Text Value 2',
        textValue: 'Text Value 2',
        selector: 'Selector Value 2',
        'tagsSelector#options': ['tag aa', 'tag bb'],
        tagKeyLabel: 'TagKey1',
      },
    ],
  },
};

export const WithBorder: Story = {
  args: {
    showBorders: true,
    rowFieldset: {
      name: 'testFieldSet',
      fieldLayout: 'compact',
      arrangeFields: 'row',
      fields: [
        {
          label: 'Some Label',
          name: 'staticText',
          type: 'text',
        },
        {
          label: 'Another Label 123',
          name: 'selector',
          type: 'staticText',
        },
        {
          label: '',
          name: 'tagKeyLabel',
          type: 'staticText',
        },
        {
          label: 'Tags Selector',
          name: 'tagsSelector',
          options: '{$.tagsSelector#options}',
          placeHolderText: 'Select Tag',
          type: 'select',
        },
      ],
    } as FieldSetMetadata,
    data: [
      {
        staticText: 'Static Text Value 1',
        selector: 'Selector Value 1',
        'tagsSelector#options': ['tag1', 'tag2'],
        tagKeyLabel: 'TagKey1',
        tagsSelector: 'tag2',
      },
      {
        staticText: 'Static Text Value 2',
        selector: 'Selector Value 2',
        'tagsSelector#options': ['tag aa', 'tag bb'],
        tagKeyLabel: 'TagKey1',
      },
    ],
  },
};

export const WithHeaders: Story = {
  args: {
    showBorders: true,
    canDeleteRows: true,
    showHeader: true,
    rowFieldset: {
      name: 'testFieldSet',
      fieldLayout: 'compact',
      arrangeFields: 'row',
      fields: [
        {
          label: 'Some Label',
          name: 'staticText',
          type: 'text',
        },
        {
          label: 'Another Label 123',
          name: 'selector',
          type: 'staticText',
        },
        {
          label: '',
          name: 'tagKeyLabel',
          type: 'staticText',
        },
        {
          label: 'Tags Selector',
          name: 'tagsSelector',
          options: '{$.tagsSelector#options}',
          placeHolderText: 'Select Tag',
          type: 'select',
        },
      ],
    } as FieldSetMetadata,
    data: [
      {
        staticText: 'Static Text Value 1',
        selector: 'Selector Value 1',
        'tagsSelector#options': ['tag1', 'tag2'],
        tagKeyLabel: 'TagKey1',
        tagsSelector: 'tag2',
      },
      {
        staticText: 'Static Text Value 2',
        selector: 'Selector Value 2',
        'tagsSelector#options': ['tag aa', 'tag bb'],
        tagKeyLabel: 'TagKey1',
      },
    ],
  },
};
