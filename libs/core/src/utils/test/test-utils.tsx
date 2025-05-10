import React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EditorContext } from '../../EditorContext';
import { createMockComponentRegistry } from './mockComponentRegistry';
import { EditorState } from '@mito-forms/core';

const mockEditorMetadata = {
  forms: [],
  reducersMap: {},
  fieldsLayout: 'compact' as const,
};

const defaultEditorState: EditorState = {
  formStates: {},
  editorResult: {},
  isValid: true,
};

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  editorState?: Partial<EditorState>;
}

const AllTheProviders = ({
  children,
  editorState = defaultEditorState,
}: {
  children: React.ReactNode;
  editorState?: Partial<EditorState>;
}) => {
  const mockComponentRegistry = createMockComponentRegistry();
  const mergedEditorState = { ...defaultEditorState, ...editorState };

  return (
    <EditorContext.Provider
      value={{
        componentRegistry: mockComponentRegistry,
        dataSources: {},
        editorState: mergedEditorState,
        editorMetadata: mockEditorMetadata,
        contextParams: {},
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

const customRender = (ui: React.ReactElement, options?: CustomRenderOptions): RenderResult => {
  const { editorState, ...renderOptions } = options || {};
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders editorState={editorState}>{children}</AllTheProviders>
    ),
    ...renderOptions,
  });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
