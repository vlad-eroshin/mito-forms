import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { FormFieldset } from './FormFieldset';
import { FieldSetMetadata } from './types';
import '@testing-library/jest-dom';
import { render } from './utils/test/test-utils';

const mockFieldsetConfig: FieldSetMetadata = {
  name: 'fieldset1',
  title: 'Test Fieldset',
  fields: [
    {
      type: 'text',
      name: 'field1',
      label: 'Field 1',
      required: true,
    },
    {
      type: 'select',
      name: 'field2',
      label: 'Field 2',
      options: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
      ],
    },
    {
      type: 'checkbox',
      name: 'field3',
      label: 'Field 3',
    },
  ],
};

describe('FormFieldset', () => {
  it('renders fieldset with title', () => {
    render(<FormFieldset config={mockFieldsetConfig} inputData={{}} onChange={() => {}} />);
    expect(screen.getByText('Test Fieldset')).toBeInTheDocument();
  });

  it('renders all fields', () => {
    render(<FormFieldset config={mockFieldsetConfig} inputData={{}} onChange={() => {}} />);
    expect(screen.getByLabelText('Field 1*')).toBeInTheDocument();
    expect(screen.getByLabelText('Field 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Field 3')).toBeInTheDocument();
  });

  it('handles field changes', () => {
    const handleChange = jest.fn();
    render(<FormFieldset config={mockFieldsetConfig} inputData={{}} onChange={handleChange} />);

    const field1 = screen.getByLabelText('Field 1*');
    fireEvent.change(field1, { target: { value: 'test value' } });

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        field1: 'test value',
      }),
      expect.any(Boolean)
    );
  });

  it('displays initial data', () => {
    const initialData = {
      field1: 'initial value 1',
      field2: '2',
      field3: true,
    };

    render(
      <FormFieldset config={mockFieldsetConfig} inputData={initialData} onChange={() => {}} />
    );

    expect(screen.getByLabelText('Field 1*')).toHaveValue('initial value 1');
    expect(screen.getByLabelText('Field 2')).toHaveValue('2');
    expect(screen.getByLabelText('Field 3')).toBeChecked();
  });

  it('renders without title when showTitle is false', () => {
    const configWithoutTitle = {
      ...mockFieldsetConfig,
      showTitle: false,
    };

    render(<FormFieldset config={configWithoutTitle} inputData={{}} onChange={() => {}} />);

    expect(screen.queryByText('Test Fieldset')).not.toBeInTheDocument();
  });
});
