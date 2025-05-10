import { EditorContextProps, EditorMetadata } from '../types';
import { useContext, useMemo } from 'react';
import { EditorContext } from '../EditorContext';

export const useEditorMetadata = (): EditorMetadata => {
  const editorContextData = useContext<EditorContextProps>(EditorContext);
  return useMemo(() => editorContextData.editorMetadata, [editorContextData.editorMetadata]);
};
