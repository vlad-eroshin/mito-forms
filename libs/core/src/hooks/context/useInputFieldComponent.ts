import { EditorContextProps, FormInputFieldProps, InputFieldRegistry } from '../../types';
import { useContext } from 'react';
import { EditorContext } from '../../EditorContext';
import { UnsupportedInputComponent } from '../../UnsupportedInputComponent';

export const useInputFieldComponent = (
  componentType: keyof InputFieldRegistry
): React.FunctionComponent<FormInputFieldProps> => {
  const editorContextData = useContext<EditorContextProps>(EditorContext);

  return (
    editorContextData.componentRegistry.inputFields[componentType] || UnsupportedInputComponent
  );
};
