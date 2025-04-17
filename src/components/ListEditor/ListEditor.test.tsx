import React from 'react';
import type { FieldSetMetadata } from '../../types';
import { ListEditorWrapper } from '../__stories__/ListEditorWrapper';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

const rowFieldset: FieldSetMetadata = {
  name: 'testFieldSet',
  fieldsLayout: 'compact',
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
};
const testData = [
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
];

describe('List Editor Tests', () => {
  it.skip('test basic rendering', async () => {
    const mockChangeHandler = jest.fn();
    render(
      <ListEditorWrapper
        onChange={mockChangeHandler}
        rowFieldset={rowFieldset}
        data={testData}
        canDeleteRows={true}
      />
    );

    const staticText = await screen.findByText('Static Text Value 1');
    expect(staticText).toBeInTheDocument();
  });

  it.skip('test delete row', async () => {
    const mockChangeHandler = jest.fn();
    render(
      <ListEditorWrapper
        onChange={mockChangeHandler}
        rowFieldset={rowFieldset}
        data={testData}
        canDeleteRows={true}
      />
    );

    const staticText = await screen.findByText('Static Text Value 1');
    expect(staticText).toBeInTheDocument();
    const deleteRowButton = await screen.findByTestId('list-editor-delete-row-0');
    expect(deleteRowButton).toBeInTheDocument();
    deleteRowButton.click();
    expect(screen.queryByText('Static Text Value 1')).not.toBeInTheDocument();
  });
  it.skip('test change row', async () => {
    const mockChangeHandler = jest.fn();
    render(
      <ListEditorWrapper
        onChange={mockChangeHandler}
        rowFieldset={rowFieldset}
        data={testData}
        canDeleteRows={true}
      />
    );

    const textInputField = await screen.findByTestId('text-textValue-0');
    expect(textInputField).toBeInTheDocument();
    await userEvent.clear(textInputField);
    await userEvent.type(textInputField, 'New Text Value');
    const newData1 = [...testData];
    newData1[0].textValue = 'New Text Value';
    expect(mockChangeHandler).toHaveBeenCalledWith(newData1, true);
  });
});
