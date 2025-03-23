import React, { useMemo } from 'react';
import EditorContext from '../EditorContext';
import { CORE_UI_INPUTS } from '../EditorInput';
import type { ListInputProps } from '../ListEditor/ListEditor';
import { ListEditor } from '../ListEditor/ListEditor';

export const ListEditorWrapper: React.FunctionComponent<ListInputProps> = (props) => {
  const contextVal = useMemo(
    () => ({
      dataSources: {},
      contextParams: {},
      inputFieldRegistry: CORE_UI_INPUTS,
      editorState: {
        formStates: {},
        editorResult: {},
      },
    }),
    [],
  );
  return (
    <EditorContext.Provider value={contextVal}>
      <ListEditor {...props} />
    </EditorContext.Provider>
  );
};

ListEditorWrapper.displayName = 'ListEditorWrapper';
