import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormInputField } from './FormInputField';
import { InputField } from './types';
import { render } from './utils/test/test-utils';

describe('FormInputField', () => {
  it('renders text input field', () => {
    const config: InputField = {
      type: 'text',
      name: 'field1',
      label: 'Field 1',
    };

    render(<FormInputField config={config} value="" onChange={() => {}} />);

    expect(screen.getByLabelText('Field 1')).toBeInTheDocument();
  });

  it('renders required text input field', () => {
    const config: InputField = {
      type: 'text',
      name: 'field1',
      label: 'Field 1',
      required: true,
    };

    render(<FormInputField config={config} value="" onChange={() => {}} />);

    expect(screen.getByLabelText('Field 1*')).toBeInTheDocument();
  });

  it('renders select field with options', () => {
    const config: InputField = {
      type: 'select',
      name: 'field2',
      label: 'Field 2',
      options: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
      ],
    };

    render(<FormInputField config={config} value="" onChange={() => {}} />);

    expect(screen.getByLabelText('Field 2')).toBeInTheDocument();
  });

  it('renders checkbox field', () => {
    const config: InputField = {
      type: 'checkbox',
      name: 'field3',
      label: 'Field 3',
    };

    render(<FormInputField config={config} value={false} onChange={() => {}} />);

    expect(screen.getByLabelText('Field 3')).toBeInTheDocument();
  });

  it('handles input changes', () => {
    const handleChange = jest.fn();
    const config: InputField = {
      type: 'text',
      name: 'field1',
      label: 'Field 1',
    };

    render(<FormInputField config={config} value="" onChange={handleChange} />);

    const input = screen.getByLabelText('Field 1');
    fireEvent.change(input, { target: { value: 'test value' } });

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        field1: 'test value',
      })
    );
  });

  it('displays validation errors', () => {
    const config: InputField = {
      type: 'text',
      name: 'field1',
      label: 'Field 1',
      required: true,
    };

    render(
      <FormInputField
        config={config}
        value=""
        onChange={() => {}}
        isValid={false}
        validationErrors={['This field is required']}
      />
    );

    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  // it('renders without label when renderAsFormElement is false', () => {
  //   const config: InputField = {
  //     type: 'text',
  //     name: 'field1',
  //     label: 'Field 1',
  //   };
  //
  //   render(
  //     <FormInputField config={config} value="" onChange={() => {}} renderAsFormElement={false} />
  //   );
  //
  //   expect(screen.queryByLabelText('Field 1')).not.toBeInTheDocument();
  // });
  //
  // it('displays loading state', () => {
  //   const config: InputField = {
  //     type: 'text',
  //     name: 'field1',
  //     label: 'Field 1',
  //   };
  //
  //   render(
  //     <FormInputField config={config} value="" onChange={() => {}} status={DataStatus.Loading} />
  //   );
  //
  //   expect(screen.getByText('Loading...')).toBeInTheDocument();
  // });
});
