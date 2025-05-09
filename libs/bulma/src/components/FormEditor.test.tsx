import { ComponentRegistry, FormEditor } from '@mito-forms/core';
import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

import { editorWithConditions } from '../__metadata__/editorWithConditions';

describe('Config Editor Tests', () => {
  it('test basic editor', async () => {
    const mockChangeHandler = jest.fn();

    render(
      <FormEditor
        initialData={{}}
        editorMetadata={editorWithConditions}
        onChange={mockChangeHandler}
        componentRegistry={{} as ComponentRegistry}
      />
    );

    const switchControl = screen.getByText('Show yes/no');
    expect(switchControl).toBeInTheDocument();
    //    expect(screen.getByTestId(`elementrow-text-oneMoreConditional`)).toBeVisible();

    // switchControl.click();
    // const result = {
    //   Form1: {
    //     fieldset2: { data: { selector: '1' } },
    //     fieldset1: {
    //       data: {
    //         switchInput: false,
    //         textInput: 'initialValue'
    //       },
    //       isValid: true
    //     },
    //     fieldset3: {
    //       data: { selectorField: '1' }
    //     }
    //   }
    // };
    // expect(mockChangeHandler).toHaveBeenCalledWith(result, true, undefined);
    //
    // expect(screen.queryByTestId('elementrow-text-oneMoreConditional')).not.toBeInTheDocument();
    // screen.getByLabelText('Show yes/no').click();
    // await waitFor(() => screen.findByTestId(`elementrow-text-oneMoreConditional`));
    // const fieldsetShowHide = screen.getByLabelText('Show/Hide FieldSet below');
    // fieldsetShowHide.click();
    // await waitFor(() => screen.findByTestId(`fieldset-fieldset3`));
  });
});
