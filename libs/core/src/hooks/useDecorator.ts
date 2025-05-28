import React, { useCallback, useContext, useMemo } from 'react';
import { EditorContextProps, FieldsetProps, InputFieldLayoutProps } from '../types';
import { EditorContext } from '../EditorContext';

/**
 * Use Decorator Hook used to retrieve field decorator
 */
export function useDecorator(): {
  getFieldDecorator: (decoratorName: string) => React.FunctionComponent<InputFieldLayoutProps>;
  getFieldsetDecorator: (decoratorName: string) => React.FunctionComponent<FieldsetProps>;
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

  return {
    getFieldDecorator,
    getFieldsetDecorator,
  };
}
