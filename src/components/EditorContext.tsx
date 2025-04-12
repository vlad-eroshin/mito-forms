import { createContext } from 'react';
import type { EditorContextProps } from '../types';
import { CLASSIC_INPUTS, DEFAULT_UTILITY_REGISTRY } from './classic';


const EditorContext = createContext<EditorContextProps>({
  dataSources: {},
  contextParams: {},
  inputFieldRegistry: CLASSIC_INPUTS,
  utilityComponentRegistry: DEFAULT_UTILITY_REGISTRY,
  editorState: {
    formStates: {},
    editorResult: {}
  }
} as EditorContextProps<object>);

export default EditorContext;
