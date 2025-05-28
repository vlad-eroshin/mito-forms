import { EditorContextProps, FormInputFieldProps, InputFieldRegistry } from '../../types';
import { useContext, useMemo } from 'react';
import { EditorContext } from '../../EditorContext';
import { UnsupportedInputComponent } from '../../UnsupportedInputComponent';

export const useInputFieldComponent = (
  componentType: keyof InputFieldRegistry
): React.FunctionComponent<FormInputFieldProps> => {
  const editorContextData = useContext<EditorContextProps>(EditorContext);

  const componentRegistry = useMemo(
    () => editorContextData.componentRegistry,
    [editorContextData.componentRegistry]
  );

  return componentRegistry.inputFields[componentType] || UnsupportedInputComponent;
};
