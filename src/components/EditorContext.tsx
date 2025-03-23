import { createContext } from 'react';
import type { EditorContextProps, InputFieldRegistry } from '../types';

/**
 * Editor context is used to share editor state across all child components.
 *
 */
const EMPTY_REGISTRY: unknown = {};

const EditorContext = createContext<EditorContextProps>({
  dataSources: {},
  contextParams: {},
  inputFieldRegistry: EMPTY_REGISTRY as InputFieldRegistry,
  editorState: {
    formStates: {},
    editorResult: {},
  },
} as EditorContextProps<object>);

export default EditorContext;
