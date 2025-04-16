import { EditorContextProps, UtilityComponentRegistry } from '../../../types';
import { FunctionComponent, useContext } from 'react';
import EditorContext from '../../EditorContext';

export const useUtilComponent = <PropType>(componentType: keyof UtilityComponentRegistry): FunctionComponent<PropType> => {
  const editorContextData = useContext<EditorContextProps>(EditorContext);

  return editorContextData.utilityComponentRegistry[componentType] as FunctionComponent<PropType>;
};