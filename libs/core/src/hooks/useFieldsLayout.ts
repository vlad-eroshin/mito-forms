import { EditorContext, EditorContextProps, FieldsLayout } from '@mito-forms/core';
import { useContext, useMemo } from 'react';

export const useFieldsLayout = (): FieldsLayout => {
  const editorContextData = useContext<EditorContextProps>(EditorContext);
  const editorMetadata = useMemo(
    () => editorContextData.editorMetadata,
    [editorContextData.editorMetadata]
  );

  return editorMetadata.fieldsLayout;
};
