import { ParamsMap, ParamValue, RecordsArray } from './common';

import { DataSourceState } from './dataSource';
import { ComponentRegistry, EditorMetadata, FieldsLayout, ReducersMap } from './editorMetadata';

export type FieldValues = { [key: string]: ParamValue | File };

type FieldsetDataEntry = {
  data: ParamsMap | RecordsArray;
  isValid?: boolean;
  isHidden?: boolean;
};

export type FormDataState = { [key: string]: FieldsetDataEntry };

export type EditorState<T = object> = {
  /**
   * Form data information conforms to the hierarchy of the inputs from the editor metadata
   */
  formStates: { [key: string]: FormDataState };
  /**
   * Editor result
   */
  editorResult: T;
  /**
   * Is all input provided valid
   */
  isValid?: boolean | undefined;

  /**
   * Validation Message
   */
  validatorMessage?: string | undefined;
};

/**
 * Form Change payload for the editor state action.
 * Used to update editor state with new inputs provided by the user in UI.
 */
export type FormChangePayload<T = object> = {
  /**
   * form Id that captured the change
   */
  formId: string;
  /**
   * Field set name that captured the change in the form.
   */
  fieldSetName: string;

  /**
   * Data from field values for each fieldset in the form:
   *  {
   *    [fieldsetName]: {map of field set values}
   *  }
   */
  data: FormDataState;
  /**
   * Editor metadata. Because state reducer is an
   * independent function we need to somehow access editor metadata.
   */
  editorMetadata: EditorMetadata<T>;
  /**
   * Reducers map (from editor metadata)
   */
  editorReducersMap?: ReducersMap<T> | undefined;
  /**
   * Are all input values are valid in the current form
   */
  isValid?: boolean;

  /**
   * Optional Context Params that maybe passed down to fieldset reducers
   */
  contextParams?: { [key: string]: unknown } | undefined;
};

export type EditorStateReplacePayload<T = object> = {
  data: EditorState<T>;
};

export type EditorContextProps<T = object> = {
  dataSources: { [key: string]: DataSourceState };
  componentRegistry: ComponentRegistry;
  editorState: EditorState<T>;
  contextParams?: { [key: string]: unknown } | undefined; // Context params that maybe necessary in reducers
  fieldsLayout?: FieldsLayout;
};
