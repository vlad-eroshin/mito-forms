import {
  DataRecord,
  DefinedDataValue,
  type EditorMetadata,
  ExpressionContext,
  FieldSetEntry,
  FieldSetMetadata,
  FormDataState,
  InputField,
  InputOption,
  ListEditorMetadata,
  ParamsMap,
  ParamValue,
  RecordsArray,
} from '../types';
import * as JME from 'jmespath';
import uuidByString from 'uuid-by-string';

export function isNullOrUndefined(value: unknown): boolean {
  return value === null || value === undefined;
}

/**
 * Retrieve value from `data` object by json path.
 *
 * @param data
 * @param jsonPath
 */
export const fetchJsonPath = (data: object, jsonPath?: string): object | DefinedDataValue => {
  if (!jsonPath) {
    return data;
  }
  const fetchedData = JME.search(data, jsonPath);
  if (fetchedData) {
    if (Array.isArray(fetchedData)) {
      if (fetchedData.length === 1) {
        return fetchedData[0];
      } else if (fetchedData.length === 0) {
        return '';
      }

      return fetchedData;
    }
    return fetchedData;
  } else {
    return '';
  }
};

/**
 * Checks if the specified data exist in the context data
 *
 * @param contextData
 * @param jsonPath
 */
export const checkJsonPath = (contextData: object, jsonPath: string): boolean => {
  const fetchedData = JME.search(contextData, jsonPath);
  if (Array.isArray(fetchedData)) {
    return fetchedData.length > 0;
  }
  return fetchedData;
};

export const getInitialFieldSetData = (
  inputData: ParamsMap,
  fieldSet: FieldSetMetadata
): ParamsMap => {
  const fieldValues: ParamsMap = {};
  (fieldSet.fields as InputField[]).forEach((fieldConf: InputField) => {
    if (fieldConf.type === 'divider') {
      //Skip Divider field as it is not interractive
      return;
    }
    let fetchedValue: ParamValue;
    if (inputData) {
      if (typeof fieldConf.value === 'function') {
        const rawValue = fieldConf.value(inputData);
        fetchedValue = !isNullOrUndefined(rawValue) ? rawValue : fieldConf.default;
      } else if (isJsonPathExp(fieldConf.value)) {
        const valueJsonPath = extractJsonPathString(fieldConf.value);
        const rawValue =
          fetchJsonPath(inputData as object, valueJsonPath) || inputData[fieldConf.name];
        fetchedValue = !isNullOrUndefined(rawValue) ? rawValue : fieldConf.default;
      } else {
        const rawValue = inputData[fieldConf.name];

        fetchedValue = !isNullOrUndefined(rawValue)
          ? rawValue
          : fieldConf.value || fieldConf.default;
      }
      if (isJsonPathExp(fieldConf.options)) {
        const jsonPath = extractJsonPathString(fieldConf.options);
        const optionsRes =
          fetchJsonPath(inputData as object, jsonPath) ||
          fetchJsonPath(inputData as object, `${fieldConf.name}__options`);
        fieldValues[`${fieldConf.name}__options`] = optionsRes
          ? Array.isArray(optionsRes)
            ? optionsRes
            : [optionsRes]
          : [];
      }
    } else {
      if (isJsonPathExp(fieldConf.value)) {
        fetchedValue = fieldConf.default; // input data is not defined
      } else {
        fetchedValue = fieldConf.value || fieldConf.default;
      }
    }
    if (!isNullOrUndefined(fetchedValue)) {
      fieldValues[fieldConf.name] = fetchedValue;
    }
  });
  return fieldValues;
};
/**
 * Fetch initial field values for a given fieldset.
 *
 * @param inputData
 * @param fieldSetEntry
 */
export const getFieldsetData = (
  inputData: ParamsMap | RecordsArray,
  fieldSetEntry: FieldSetEntry
): ParamsMap | RecordsArray => {
  let result: RecordsArray | ParamsMap;

  if (!fieldSetEntry.type || fieldSetEntry.type === 'fieldSet') {
    const fieldSetInput: ParamsMap = (
      fieldSetEntry.jsonPath ? fetchJsonPath(inputData, fieldSetEntry.jsonPath) : inputData
    ) as ParamsMap;

    result = getInitialFieldSetData(fieldSetInput, fieldSetEntry as FieldSetMetadata);
  } else {
    // Process records array
    result = [];
    const recordSetInput: RecordsArray = (
      fieldSetEntry.jsonPath ? fetchJsonPath(inputData, fieldSetEntry.jsonPath) : inputData
    ) as RecordsArray;
    if (!Array.isArray(recordSetInput)) {
      return [];
    }
    recordSetInput.forEach((record: DataRecord) => {
      (result as RecordsArray).push(
        getInitialFieldSetData(record, (fieldSetEntry as ListEditorMetadata).rowFieldset)
      );
    });
  }
  return result;
};

/**
 * Check if expr is the string in the following format '!{$.<sonPathstring>}' example: {$.tagsSelector__options}
 * @param expr input string
 * @returns true if the input value is JSON path expression
 */
export const isJsonPathExp = (expr: unknown): boolean => {
  if (typeof expr !== 'string') {
    return false;
  }
  const exprStr = expr as string;
  return exprStr && exprStr.startsWith('!{') && exprStr.endsWith('}');
};

/**
 * From the input string in the format '{$.<sonPathstring>}' example: {$.tagsSelector__options}. extract only
 * json path option of it -> $.tagsSelector#option
 *
 * @param expr input string
 * @returns json path string or undefined
 */
export const extractJsonPathString = (expr: unknown): string => {
  if (!isJsonPathExp(expr)) {
    return undefined;
  }
  const strExpr = expr as string;
  return strExpr.substring(2, strExpr.length - 1);
};

/**
 * Fetches value given by json path or json path expression !{<path>}
 *
 * @param contextData
 * @param exprOrJsonPath json path or json path expression !{<path>}
 */
export const fetchJsonPathValue = (contextData: object, exprOrJsonPath: unknown): ParamValue => {
  const jsonPath = isJsonPathExp(exprOrJsonPath)
    ? extractJsonPathString(exprOrJsonPath)
    : (exprOrJsonPath as string);
  return fetchJsonPath(contextData, jsonPath);
};

/**
 * For selector components input values (selected values) can go in
 * as comma separated string of values or it can be an array of strings or numbers
 * this function normalizes input by converting input values to array of strings.
 *
 * @param values input as string of comma separated values ("1,2,3") or array of [1, 2, 3] or ['1', '2', '3']
 *
 * @returns array of string values
 */
export const buildCheckedValues = (values: ParamValue | undefined | null): string[] => {
  if (isNullOrUndefined(values)) {
    return [];
  }
  if (Array.isArray(values)) {
    return values.length > 0 ? values.join(',').split(',') : (values as string[]);
  } else {
    const trimmedVal = `${values}`.trim();
    return trimmedVal ? `${trimmedVal}`.trim().split(',') : [];
  }
};

/**
 * Converts options array (string | InputOption) into array of InputOptions for stable consumption by input fields
 *
 * @param options array of string options
 * @param checkedValues optional list of checked options
 * @returns array of Input Options
 */
export const convertInputOptions = (
  options: (string | InputOption)[],
  checkedValues?: (string | number)[]
): InputOption[] => {
  const convertedOptions = options
    ? options.map(opt => {
        const rawOpt: InputOption =
          typeof opt === 'string'
            ? { label: opt as string, value: opt as string }
            : (opt as InputOption);

        return {
          ...rawOpt,
          checked: !!(checkedValues && checkedValues.indexOf(`${rawOpt.value}`) >= 0),
          params: rawOpt.params || {},
          disabled: !!rawOpt.disabled,
        };
      })
    : [];
  return convertedOptions;
};

/**
 * Checks if field has options passed down as JsonPath or as list of options and if it is JSON Path the corresponding json path is retrieved.
 * from the passed 'data' object
 *
 */
export const retrieveInputOptions = (
  field: InputField,
  data: object
): InputOption[] | string[] | undefined => {
  let rawOptions: string | InputOption[] | string[] | undefined;
  if (field.options && isJsonPathExp(field.options)) {
    const optionsJsonPath = extractJsonPathString(field.options);
    const optionsRes =
      fetchJsonPath(data, optionsJsonPath) || fetchJsonPath(data, `${field.name}__options`);
    rawOptions = optionsRes ? (Array.isArray(optionsRes) ? optionsRes : [optionsRes]) : [];
  } else {
    rawOptions = field.options;
  }
  if (typeof rawOptions === 'string') {
    return rawOptions.split(',');
  } else {
    return rawOptions;
  }
};

export function getFieldId(fieldConfig: InputField, fieldIndex?: number): string {
  return `${fieldConfig.type}-${fieldConfig.name}-${fieldIndex || 0}`;
}

/**
 * Generate react key
 *
 * @param seedValues
 */
export function generateReactKey(...seedValues: string[]): string {
  return uuidByString(seedValues.join('-'));
}

/**
 * Creates Expression Context
 *
 * @param state
 * @param context
 * @param additionalData
 */
export function buildExpressionContext(
  state: { [key: string]: FormDataState },
  context: ParamsMap,
  additionalData?: ParamsMap
): ExpressionContext {
  return {
    ...(additionalData || {}),
    _CONTEXT: context,
    _STATE: state,
  };
}

export function buildEmptyRecordFromFields(fields: InputField[]): DataRecord {
  const result: DataRecord = {};
  fields.forEach(field => {
    if (field.default) {
      result[field.name] = field.default;
      // if (field.type === 'select') {
      //   result[`${field.name}__options`] = field.options && isJsonPathExp(field.options);
      // }
    }
  });
  return result;
}

/**
 * Updates state from the passed input data for the editor.
 * Editor metadata how the data should be populated for each field and fieldset
 *
 * 1. Form Data retrieval :
 *    - if no jsonPath specified for the form data for the form will be editorData.
 *    - if jsonPath specified in the config first we perform lookup to that jsonPath
 *      and then pass what was retrieved is used as the Form Data.
 *
 * 2. Fieldset Data: Editor retrieves fieldset Data as following
 *    - by default fieldset data receives formData as an input refer to (1 above).
 *    - If jsonPath was provided then data is retrieved by that jsonPath from the containing form data.
 * 3. Field value Retrieval:
 *    - by default field value is retrieved from the editInput data by field name. Assuming no containing fieldset
 *      or form have jsonpath specified data for field is being lookced up in editorInput data object.
 *    - if value of the field is jsonPath expression (Example !{<path>}) then data is retrieved
 *      from that path in fieldset data.
 *
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
    const formData: ParamsMap = (
      form.jsonPath ? fetchJsonPath(editorData as ParamsMap, form.jsonPath) : editorData
    ) as ParamsMap;

    result[form.id] = {};
    form.fieldSets.forEach(fieldSet => {
      const fieldSetData = getFieldsetData(formData, fieldSet);
      result[form.id][fieldSet.name] = { data: fieldSetData };
    });
  });
  return result;
};
