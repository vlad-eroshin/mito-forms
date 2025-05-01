import { EditorContext, EditorContextProps, EditorMetadata } from '@mito-forms/core';
import { useContext, useMemo } from 'react';

export const useEditorMetadata = (): EditorMetadata => {
  const editorContextData = useContext<EditorContextProps>(EditorContext);
  return useMemo(() => editorContextData.editorMetadata, [editorContextData.editorMetadata]);
};
