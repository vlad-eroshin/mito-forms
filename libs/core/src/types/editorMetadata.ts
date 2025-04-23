import type { ConditionInfo, ParamsMap, ParamValue, RecordsArray } from './common';
import { DataSourceBinding, DataSourceConfig, DataSourceState, DataStatus } from './dataSource';
import React, { FunctionComponent, ReactElement, ReactNode } from 'react';

export type ValidationFunctionType<T> = (value: ParamValue) => boolean | T | T[];

export type FieldsLayout = 'twoColumn' | 'compact' | 'twoColumnJustified';
/**
 * Editor UI Metadata. Used to describe editor UI.
 */
export type EditorMetadata<T = object> = {
  /**
   * List of forms in the editor
   */
  forms: FormMetadata[];

  /**
   * Global setting for fields layout - if not specified it uses 'compact'
   */
  fieldsLayout?: FieldsLayout;

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
   *  Configures field layout overrides layout on the level of fieldset
   */
  fieldsLayout?: FieldsLayout;

  /**
   * Used for list editor component configures how the fieldset is displayed
   */
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
   * allows collapse expand fieldset.
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
export type ValidatorType = 'number' | 'string' | 'email' | 'emailMultiline' | 'required';

export type ValueAccessorFn = (context: ParamsMap) => void;

export type InputFieldType =
  | 'text'
  | 'fileUpload'
  | 'checkbox'
  | 'checkList'
  | 'select'
  | 'radio'
  | 'switch'
  | 'switchList'
  | 'staticText'
  | 'textbox'
  | 'password'
  | 'progress'
  | 'buttonSelector';

/**
 * Metadata about individual field
 */
export type InputField = {
  name: string;
  label?: string;
  placeHolderText?: string;
  helpText?: string;
  type: InputFieldType | 'divider';
  valueType?: 'text' | 'email' | 'password' | 'url' | 'search';
  required?: boolean;
  options?: InputOption[] | string[] | string;
  isSelectable?: boolean;
  default?: ParamValue;
  disabled?: boolean;
  value?: ParamValue | InputOption | ValueAccessorFn; // Can also be JSON path expression specified as {$.path.of.some.kind}
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

export type LoadingComponentProps = {
  className?: string;
  loadingText?: string;
  size?: 'small' | 'medium' | 'large';
};
export type BlockComponentProps = {
  className?: string;
  children?: ReactElement | ReactElement[];
};

export type FieldsetProps = {
  legend?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  collapsed?: boolean;
  onCollapse?: () => void;
  layout?: FieldsLayout;
};

export type DeleteRowButtonProps = {
  text?: string;
  showIcon?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export type ComponentRegistry = {
  inputFields: InputFieldRegistry;
  utilityComponents: UtilityComponentRegistry;
};

export type UtilityComponentRegistry = {
  loading: FunctionComponent<LoadingComponentProps>;
  block: FunctionComponent<BlockComponentProps>;
  tabbedSection: FunctionComponent<TabbedSectionProps>;
  fieldset: FunctionComponent<FieldsetProps>;
  deleteRowButton: FunctionComponent<DeleteRowButtonProps>;
};

export type EditorContextProps<T = object> = {
  dataSources: { [key: string]: DataSourceState };
  componentRegistry: ComponentRegistry;
  editorState: EditorState<T>;
  contextParams?: { [key: string]: unknown } | undefined; // Context params that maybe necessary in reducers
  fieldsLayout?: FieldsLayout;
};

export type TabProps = {
  id: string;
  label: string;
  disabled?: boolean;
  selected?: boolean;
  content: ReactNode;
};

export type TabbedSectionProps = {
  selected: string | number;
  onTab: (tabId: string | number) => void;
  tabs: Omit<TabProps, 'onClick' | 'selected'>[];
};

export type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number | string;
};

/**
 * Wrapper around most of the form input types supported.
 */
export type FormInputFieldProps = {
  config: InputField;
  value: ParamValue;
  onChange: (paramsMap: ParamsMap) => void;
  label?: string;
  options?: string[] | InputOption[] | undefined;
  status?: DataStatus | undefined;
  renderAsFormElement?: boolean;
  fieldIndex?: number;
  isValid?: boolean;
  validationErrors?: string[];
  fieldLayout?: FieldsLayout;
};
