import type { FormInputFieldProps } from '../components/FormInputField';
import type { ConditionInfo, ParamsMap, ParamValue, RecordsArray } from './common';
import type { DataSourceBinding, DataSourceConfig, DataSourceState } from './dataSource';

export type ValidationFunctionType<T> = (value: ParamValue) => boolean | T | T[];

/**
 * Editor UI Metadata. Used to describe editor UI.
 */
export type EditorMetadata<T = object> = {
  /**
   * List of forms in the editor
   */
  forms: FormMetadata[];

  /**
   * Reducer map. Maps field set name to the function that will be modifying when any of the fieldset is changed.
   */
  reducersMap: ReducersMap<T>;

  /**
   * Editor Title
   */
  title?: string;

  /**
   * Form that will be first active when editor is open.
   */
  activeForm?: string;

  /**
   * Data sources that bring Data for the editor.
   */
  dataSources?: DataSourceConfig[];

  /**
   * Controls how editor is presented to the user.
   * When 'tabSet' is specified each form will be placed in its own tab otherwise it all forms are listed in one screen.
   *
   */
  displayAs?: 'tabSet' | 'onePage';

  /**
   * Global editor result validator
   */
  resultValidator?: ResultValidator<T>;
};

export type ValidatorResult = {
  isValid: boolean;
  message?: string;
};

export type ResultValidator<T> = (
  editorData: T,
  contextParams?: { [key: string]: unknown }
) => ValidatorResult;

export type FieldSetReducer<T> = (
  editorData: T,
  newData: ParamsMap,
  contextParams?: { [key: string]: unknown }
) => T;

export type FieldSetRecordsReducer<T> = (
  editorData: T,
  newData: RecordsArray,
  contextParams?: { [key: string]: unknown }
) => T;

export type ReducersMap<T> = {
  [key: string]: { [key: string]: FieldSetReducer<T> | FieldSetRecordsReducer<T> };
};

export type FormDividerConfig = {
  type: 'divider';
  style?: 'solid' | 'dashed' | 'dotted' | 'rounded' | 'double';
};
/**
 * Fieldset is intended to describe a group of fields.
 */
export type FieldSetMetadata = {
  /**
   * Fieldset name is required for the fieldset. Reducer is mapped to the
   */
  name: string;
  /**
   * List of input fields
   */
  fields: (InputField | FormDividerConfig)[];
  /**
   *
   */
  fieldLayout?: 'twoColumn' | 'compact' | 'twoColumnJustified';

  arrangeFields?: 'column' | 'row' | 'tableRow';
  /**
   * Field set title
   */
  title?: string;
  /**
   * Intended to be used for conditional display. For example if some field has certain value display this fieldset.
   */
  showIf?: ConditionInfo | ConditionInfo[];
  /**
   * TODO: Not implemented yet but if allows the user to collapse fieldset.
   */
  collapsible?: boolean;
  collapsed?: boolean;
  /**
   * Data object locator in the overall data that is being edited.
   */
  jsonPath?: string;
  /**
   * Allows to manage show/hide title
   */
  showTitle?: boolean;
  /**
   * Data source binding for the fieldset.
   */
  dataSource?: DataSourceBinding;
};

/**
 * Metadata about Input form
 */
export type FormMetadata = {
  /**
   * Unique (within one editor) id
   */
  id: string;
  title?: string;
  /**
   * List of form fieldsets
   */
  fieldSets: FieldSetEntry[];

  /**
   * Data path is the json path to data object in the data that is being edited
   */
  jsonPath?: string;
  showTitle?: boolean;
};
export type ValidatorType = 'number' | 'string' | 'email' | 'emailMultiline';

export type ValueAccessorFn = (context: ParamsMap) => void;

export type InputFieldType =
  | 'text'
  | 'checkbox'
  | 'select'
  | 'radio'
  | 'switch'
  | 'staticText'
  | 'textbox';

/**
 * Metadata about individual field
 */
export type InputField = {
  name: string;
  label?: string;
  placeHolderText?: string;
  type: InputFieldType | 'divider';
  valueType?: 'text' | 'email' | 'password' | 'url' | 'search';
  required?: boolean;
  options?: InputOption[] | string[] | string;
  isSelectable?: boolean;
  default?: ParamValue;
  disabled?: boolean;
  value?: ParamValue | InputOption | ValueAccessorFn;
  jsonPath?: string;
  dataBindings?: DataSourceBinding[];
  validator?: ValidatorType | ValidationFunctionType<string>;
  showIf?: ConditionInfo | ConditionInfo[];
  minValue?: number;
  maxValue?: number;
  multiSelect?: boolean;
};

export type InputOption = {
  label: string;
  value: ParamValue;
  checked?: boolean;
  disabled?: boolean;
  params?: { [key: string]: ParamValue };
};

export type ListEditorMetadata = {
  name: string;
  rowFieldset: FieldSetMetadata;
  canDeleteOrAddRows?: boolean;
  minItemsRequired?: number;
  label?: string;
  jsonPath?: string;
  addButtonLabel?: string;
  showIf?: ConditionInfo | ConditionInfo[];
};

export type FieldSetEntry = (FieldSetMetadata | ListEditorMetadata) & {
  type?: 'fieldSet' | 'fieldSetList';
};

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

export type InputFieldRegistry = {
  [key in InputFieldType]: React.FunctionComponent<FormInputFieldProps>;
};

export type EditorContextProps<T = object> = {
  dataSources: { [key: string]: DataSourceState };
  inputFieldRegistry: InputFieldRegistry;
  editorState: EditorState<T>;
  contextParams?: { [key: string]: unknown } | undefined; // Context params that maybe necessary in reducers
};
