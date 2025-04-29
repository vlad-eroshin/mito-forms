import {
  buildExpressionContext,
  EditorContext,
  EditorContextProps,
  FieldSetEntry,
  FormDataState,
  FormMetadata,
  ParamsMap,
} from '@mito-forms/core';
import { useCallback, useContext, useMemo } from 'react';
import { evaluateLogicInContext } from '../data';

export const useFormState = (
  formConfig: FormMetadata
): {
  formState: FormDataState;
  getFieldsetState: (fieldSet: string) => ParamsMap;
  getVisibleFieldSets: () => FieldSetEntry[];
} => {
  const editorContextData = useContext<EditorContextProps>(EditorContext);
  const editorState = useMemo(() => editorContextData.editorState, [editorContextData.editorState]);
  const formState = useMemo(() => editorState.formStates[formConfig.id], [formConfig, editorState]);

  const getFieldsetState = useCallback(
    (fieldsetName: string) => {
      return formState[fieldsetName];
    },
    [formState]
  );

  const getVisibleFieldSets = useCallback(() => {
    return formConfig.fieldSets.filter(fieldSetEntry => {
      if (fieldSetEntry.render) {
        return evaluateLogicInContext(
          fieldSetEntry.render,
          buildExpressionContext(
            editorState.formStates,
            editorContextData.contextParams as ParamsMap
          )
        );
      }
      return true;
    });
  }, [editorContextData.contextParams, editorState, formConfig.fieldSets]);

  return { formState, getFieldsetState, getVisibleFieldSets };
};
