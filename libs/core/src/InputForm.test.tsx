import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { InputForm } from './InputForm';
import { FormMetadata } from './types';
import { render } from './utils/test/test-utils';

const mockFormConfig: FormMetadata = {
  id: 'testForm',
  title: 'Test Form',
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
        {
          type: 'text',
          name: 'field2',
          label: 'Field 2',
        },
      ],
    },
    {
      name: 'fieldset2',
      title: 'Fieldset 2',
      fields: [
        {
          type: 'select',
          name: 'field3',
          label: 'Field 3',
          options: [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
          ],
        },
      ],
    },
  ],
};

describe('InputForm', () => {
  it('renders form with title', () => {
    render(<InputForm config={mockFormConfig} onChange={() => {}} showTitle={true} />);
    expect(screen.getByText('Test Form')).toBeInTheDocument();
  });

  it('renders all fieldsets', () => {
    render(<InputForm config={mockFormConfig} onChange={() => {}} />);
    expect(screen.getByText('Fieldset 1')).toBeInTheDocument();
    expect(screen.getByText('Fieldset 2')).toBeInTheDocument();
  });

  it('renders all fields in fieldsets', () => {
    render(<InputForm config={mockFormConfig} onChange={() => {}} />);
    expect(screen.getByLabelText('Field 1*')).toBeInTheDocument();
    expect(screen.getByLabelText('Field 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Field 3')).toBeInTheDocument();
  });

  it('handles field changes', () => {
    const handleChange = jest.fn();
    render(<InputForm config={mockFormConfig} onChange={handleChange} />);

    const field1 = screen.getByLabelText('Field 1*');
    fireEvent.change(field1, { target: { value: 'test value' } });

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        fieldset1: {
          data: {
            field1: 'test value',
          },
          isValid: expect.any(Boolean),
        },
      }),
      'testForm',
      'fieldset1',
      expect.any(Boolean)
    );
  });

  it('handles initial data', () => {
    const initialData = {
      fieldset1: {
        data: {
          field1: 'initial value 1',
          field2: 'initial value 2',
        },
        isValid: true,
      },
      fieldset2: {
        data: {
          field3: '1',
        },
        isValid: true,
      },
    };
    const editorState = { formStates: { testForm: initialData } };

    render(<InputForm config={mockFormConfig} onChange={() => {}} />, { editorState });

    expect(screen.getByLabelText('Field 1*')).toHaveValue('initial value 1');
    expect(screen.getByLabelText('Field 2')).toHaveValue('initial value 2');
    expect(screen.getByLabelText('Field 3')).toHaveValue('1');
  });

  it('hides title when showTitle is false', () => {
    render(<InputForm config={mockFormConfig} onChange={() => {}} showTitle={false} />);
    expect(screen.queryByText('Test Form')).not.toBeInTheDocument();
  });
});
