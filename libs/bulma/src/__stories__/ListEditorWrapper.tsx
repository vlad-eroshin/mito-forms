import { EditorContext, EditorContextProps, ListEditor, ListInputProps } from '@mito-forms/core';
import React, { useMemo } from 'react';
import { IntlProvider } from 'react-intl';

import { BULMA_REGISTRY } from '../index';

export const ListEditorWrapper: React.FunctionComponent<ListInputProps> = props => {
  const contextVal = useMemo(
    () =>
      ({
        dataSources: {},
        contextParams: {},
        componentRegistry: BULMA_REGISTRY,
        editorMetadata: {},
        editorState: {
          formStates: {},
          editorResult: {},
        },
      }) as EditorContextProps,
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
