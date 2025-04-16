import { createContext } from 'react';
import type { EditorContextProps } from '../types';


const EditorContext = createContext<EditorContextProps>({
  dataSources: {},
  contextParams: {},
  componentRegistry: {
    inputFields: {},
    utilityComponents: {}
  },
  editorState: {
    formStates: {},
    editorResult: {}
  }
} as EditorContextProps<object>);

export default EditorContext;
