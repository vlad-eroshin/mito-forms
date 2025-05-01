import type { ParamsMap, ParamValue, RecordsArray } from './common';
import { DataSourceBinding, DataSourceConfig, DataStatus } from './dataSource';

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
  render?: boolean | string;
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
  render?: boolean | string;

  /**
   * TODO: not implemented yet need to implement it
   */
  disabled?: boolean | string;
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
  render?: boolean | string;
  minValue?: number;
  maxValue?: number;
  multiSelect?: boolean;
  customProps?: ParamsMap;
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
  canDeleteRows?: boolean;
  canAddRows?: boolean;
  minItemsRequired?: number;
  label?: string;
  jsonPath?: string;
  addButtonLabel?: string;
  render?: boolean | string;
  showHeader?: boolean;
  showBorders?: boolean;
};

export type FieldSetEntry = (FieldSetMetadata | ListEditorMetadata) & {
  type?: 'fieldSet' | 'fieldSetList';
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
