import React, { useCallback, useContext, useMemo } from 'react';
import { EditorContextProps, FieldsetProps, InputFieldLayoutProps, ListInputProps } from '../types';
import { EditorContext } from '../EditorContext';

/**
 * Use Decorator Hook used to retrieve field decorator
 */
export function useDecorator(): {
  getFieldDecorator: (decoratorName: string) => React.FunctionComponent<InputFieldLayoutProps>;
  getFieldsetDecorator: (decoratorName: string) => React.FunctionComponent<FieldsetProps>;
  getListEditorDecorator: (decoratorName: string) => React.FunctionComponent<ListInputProps>;
} {
  const editorContextData = useContext<EditorContextProps>(EditorContext);

  const componentRegistry = useMemo(
    () => editorContextData.componentRegistry,
    [editorContextData.componentRegistry]
  );

  const getFieldDecorator = useCallback(
    (decoratorName: string) => componentRegistry.getFieldDecorator(decoratorName),
    [componentRegistry]
  );

  const getFieldsetDecorator = useCallback(
    (decoratorName: string) => componentRegistry.getFieldsetDecorator(decoratorName),
    [componentRegistry]
  );
  const getListEditorDecorator = useCallback(
    (decoratorName: string) => componentRegistry.getListEditorDecorator(decoratorName),
    [componentRegistry]
  );

  return {
    getFieldDecorator,
    getFieldsetDecorator,
    getListEditorDecorator,
  };
}
