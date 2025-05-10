import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import { FormEditor } from './FormEditor';
import { EditorMetadata } from './types';
import { createMockComponentRegistry } from './utils/test/mockComponentRegistry';

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
          ],
        },
      ],
    },
  ],
  reducersMap: {},
};

const mockComponentRegistry = createMockComponentRegistry();

describe('FormEditor', () => {
  it('renders forms with tabs', () => {
    render(
      <FormEditor
        editorMetadata={mockMetadata}
        initialData={{}}
        onChange={() => {}}
        componentRegistry={mockComponentRegistry}
      />
    );
    expect(screen.getByText('Form 1')).toBeInTheDocument();
    expect(screen.getByText('Field 1*')).toBeInTheDocument();
    expect(screen.getByText('Form 2')).toBeInTheDocument();
    expect(screen.getByText('Field 2')).toBeInTheDocument();
  });

  it('handles form changes', () => {
    const handleChange = jest.fn();
    render(
      <FormEditor
        editorMetadata={{ ...mockMetadata, displayAs: 'onePage' }}
        initialData={{}}
        onChange={handleChange}
        componentRegistry={mockComponentRegistry}
      />
    );

    const field1 = screen.getByLabelText('Field 1*');
    fireEvent.change(field1, { target: { value: 'test value' } });

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        form1: {
          fieldset1: {
            data: {
              field1: 'test value',
            },
            isValid: expect.any(Boolean),
          },
        },
      }),
      expect.any(Boolean),
      undefined
    );
  });

  it('handles initial data', () => {
    const initialData = {
      field1: 'initial value 1',
      field2: 'initial value 2',
    };

    render(
      <FormEditor
        editorMetadata={{ ...mockMetadata }}
        initialData={initialData}
        onChange={() => {}}
        componentRegistry={mockComponentRegistry}
      />
    );

    expect(screen.getByLabelText('Field 1*')).toHaveValue('initial value 1');

    // Switch to Form 2
    fireEvent.click(screen.getByText('Form 2'));
    expect(screen.getByLabelText('Field 2')).toHaveValue('initial value 2');
  });

  it('renders forms without tabs when displayAs is onePage', () => {
    const onePageMetadata: EditorMetadata = {
      ...mockMetadata,
      displayAs: 'onePage',
    };

    render(
      <FormEditor
        editorMetadata={onePageMetadata}
        initialData={{}}
        onChange={() => {}}
        componentRegistry={mockComponentRegistry}
      />
    );

    // Both forms should be visible
    expect(screen.getByLabelText('Field 1*')).toBeInTheDocument();
    expect(screen.getByLabelText('Field 2')).toBeInTheDocument();
  });

  // it('shows loading indicator when changes are throttled', async () => {
  //   render(
  //     <FormEditor
  //       editorMetadata={mockMetadata}
  //       initialData={{}}
  //       onChange={() => {}}
  //       componentRegistry={mockComponentRegistry}
  //       throttleChange={true}
  //       changeInterval={2000}
  //     />
  //   );
  //
  //   const field1 = screen.getByLabelText('Field 1*');
  //   fireEvent.change(field1, { target: { value: 'test value' } });
  //
  //   await waitFor(
  //     () => {
  //       return expect(screen.findByText('Loading...')).toBeInTheDocument();
  //     },
  //     { timeout: 2000 }
  //   );
  // });
});
