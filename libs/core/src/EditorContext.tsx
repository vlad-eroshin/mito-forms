import { createContext } from 'react';
import type { EditorContextProps } from './types';

export const EditorContext = createContext<EditorContextProps>({
  dataSources: {},
  contextParams: {},
  componentRegistry: {
    inputFields: {},
    utilityComponents: {},
  },
  editorState: {
    formStates: {},
    editorResult: {},
  },
} as EditorContextProps<object>);
