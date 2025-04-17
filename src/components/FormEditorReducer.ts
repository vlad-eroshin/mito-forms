import type {
  EditorMetadata,
  EditorState,
  EditorStateReplacePayload,
  FieldSetRecordsReducer,
  FieldSetReducer,
  FormChangePayload,
  FormDataState,
  ParamsMap,
  RecordsArray,
  ReducersMap,
} from '../types';
import { getFieldValues } from './utils/fieldUtils';

export type EditorReducerAction<T> = {
  type: 'replace' | 'formChange';
  payload: FormChangePayload<T> | EditorStateReplacePayload<T>;
};
/**
 * Editor state reducer
 *
 * @param editorState
 * @param action
 */
export function editorStateReducer<T>(
  editorState: EditorState<T>,
  action: EditorReducerAction<T>
): EditorState<T> {
  const newEditorState: EditorState<T> = { ...editorState };
  switch (action.type) {
    case 'formChange': {
      const formChangePayload = action.payload as FormChangePayload<T>;
      const editorMetadata = formChangePayload.editorMetadata;
      const reducersMap = formChangePayload.editorReducersMap;
      if (!reducersMap) {
        newEditorState.formStates[formChangePayload.formId] = {
          ...(action.payload.data as FormDataState),
        };
        newEditorState.editorResult = updateEditorData<T>(
          editorState.editorResult,
          formChangePayload
        );
      } else {
        newEditorState.editorResult = updateEditorData<T>(
          editorState.editorResult,
          formChangePayload,
          reducersMap
        );
        newEditorState.formStates = buildFormStatesFromData<T>(
          formChangePayload.editorMetadata,
          newEditorState.editorResult
        );
      }
      newEditorState.isValid = formChangePayload.isValid;
      let k: keyof typeof editorState.formStates;
      for (k in editorState.formStates) {
        newEditorState.isValid =
          typeof editorState.formStates[k].isValid !== 'undefined'
            ? !!editorState.formStates[k].isValid
            : formChangePayload.isValid;
        if (!newEditorState.isValid) {
          break;
        }
      }
      if (editorMetadata.resultValidator) {
        const validatorResult = editorMetadata.resultValidator(newEditorState.editorResult);
        newEditorState.isValid = formChangePayload.isValid && validatorResult.isValid;
        newEditorState.validatorMessage = validatorResult.message;
      }
      return newEditorState;
    }
    case 'replace': {
      return { ...(action.payload as EditorStateReplacePayload<T>).data };
    }
  }
  return newEditorState;
}

/**
 * Update editor data with Form Data (provided input field values).
 *
 * @param editorData raw edtior data
 * @param formChangePayload payload with the modified data
 * @param editorReducersMap map of editor reducers
 */
const updateEditorData = <T = object>(
  editorData: T,
  formChangePayload: FormChangePayload<T>,
  editorReducersMap?: ReducersMap<T>
): T => {
  const reducerMap = editorReducersMap;
  const formId = formChangePayload.formId;
  const fieldSetName = formChangePayload.fieldSetName;

  const formReducers = reducerMap ? reducerMap[formId] : undefined;
  const editorMetadata = formChangePayload.editorMetadata;
  const formMetadata = editorMetadata.forms.find(form => form.id === formId);
  if (!formMetadata) {
    throw `Form not found: ${formId}`;
  }
  const fieldsetMetadata = formMetadata.fieldSets.find(fs => fs.name === fieldSetName);
  const fieldSetReducer = formReducers?.[fieldSetName];
  if (fieldsetMetadata && fieldSetReducer) {
    const formData = (formChangePayload.data[fieldSetName] as ParamsMap).data;
    try {
      const editorResult =
        fieldsetMetadata.type !== 'fieldSetList'
          ? (fieldSetReducer as FieldSetReducer<T>)(
              editorData,
              formData as ParamsMap,
              formChangePayload.contextParams
            )
          : (fieldSetReducer as FieldSetRecordsReducer<T>)(
              editorData,
              formData as RecordsArray,
              formChangePayload.contextParams
            );
      return editorResult;
    } catch (error: unknown) {
      console.error(error);
      throw `Error occured in Reducer for FORM: ${formId}, FIELDSET: ${fieldSetName}`;
    }
  } else {
    // if no reducer function registered record data as following
    const newEditorData = { ...editorData } as { [key: typeof formChangePayload.formId]: unknown };
    newEditorData[formChangePayload.formId] = {
      ...((editorData as ParamsMap)[formChangePayload.formId] as ParamsMap),
      ...formChangePayload.data,
    };

    return newEditorData as T;
  }
};

/**
 * Updates state from the passed input data for the editor.
 * Editor metadata how the data should be populated for each field and fieldset
 *
 * @param editorMetadata
 * @param editorData
 */
export const buildFormStatesFromData = <T = object>(
  editorMetadata: EditorMetadata<T>,
  editorData: T
): { [key: string]: FormDataState } => {
  const result: { [key: string]: FormDataState } = {};
  editorMetadata.forms.forEach(form => {
    result[form.id] = {};
    form.fieldSets.forEach(fieldSet => {
      const fieldSetData = getFieldValues(editorData as ParamsMap, fieldSet);
      result[form.id][fieldSet.name] = { data: fieldSetData };
    });
  });
  return result;
};
