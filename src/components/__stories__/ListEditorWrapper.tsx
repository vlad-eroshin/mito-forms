import React, { useMemo } from 'react';
import EditorContext from '../EditorContext';
import { CORE_UI_INPUTS } from '../EditorInput';
import type { ListInputProps } from '../ListEditor/ListEditor';
import { ListEditor } from '../ListEditor/ListEditor';
import { IntlProvider } from 'react-intl';

export const ListEditorWrapper: React.FunctionComponent<ListInputProps> = (props) => {
  const contextVal = useMemo(
    () => ({
      dataSources: {},
      contextParams: {},
      inputFieldRegistry: CORE_UI_INPUTS,
      editorState: {
        formStates: {},
        editorResult: {}
      }
    }),
    []
  );
  return (
    <IntlProvider locale="en" messages={{}}>
      <EditorContext.Provider value={contextVal}>
        <ListEditor {...props} />
      </EditorContext.Provider>
    </IntlProvider>
  );
};

ListEditorWrapper.displayName = 'ListEditorWrapper';
