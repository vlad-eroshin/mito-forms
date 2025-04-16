import React, { useMemo } from 'react';
import EditorContext from '../EditorContext';
import type { ListInputProps } from '../ListEditor/ListEditor';
import { ListEditor } from '../ListEditor/ListEditor';
import { IntlProvider } from 'react-intl';
import { BULMA_REGISTRY } from '../impl/bulma';

export const ListEditorWrapper: React.FunctionComponent<ListInputProps> = (props) => {
  const contextVal = useMemo(
    () => ({
      dataSources: {},
      contextParams: {},
      componentRegistry: BULMA_REGISTRY,
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
