import { JSONPath } from 'jsonpath-plus';
import type {
  DataRecord,
  DefinedDataValue,
  FieldSetEntry,
  FieldSetMetadata,
  InputField,
  InputOption,
  ListEditorMetadata,
  ParamsMap,
  ParamValue,
  RecordsArray
} from '../../types';
import uuidByString from 'uuid-by-string';

/**
 * This expression matches strings like `{$.json.path}` this is used because there is a need to pickup list of options
 * from data passed to the editors.
 */
export const RX_JSON_PATH = /^\{(\$(\.(\w|[a-zA-Z-9\\#])+)+)\}$/u;

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
  const fetchedData = JSONPath({
    json: data,
    path: jsonPath
  });
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
    let fetchedValue;
    if (inputData) {
      if (typeof fieldConf.value === 'function') {
        const rawValue = fieldConf.value(inputData);
        fetchedValue = !isNullOrUndefined(rawValue) ? rawValue : fieldConf.default;
      } else if (isJsonPathExp(fieldConf.value)) {
        const valueJsonPath = extractJsonPathString(fieldConf.value);
        const rawValue =
          fetchJsonPath(inputData as object, valueJsonPath) || inputData[fieldConf.name];
        fetchedValue = !isNullOrUndefined(rawValue)
          ? rawValue
          : fieldConf.default;
      } else if (fieldConf.jsonPath) {
        const rawValue =
          fetchJsonPath(inputData as object, fieldConf.jsonPath) || inputData[fieldConf.name];
        fetchedValue = !isNullOrUndefined(rawValue)
          ? rawValue
          : fieldConf.value || fieldConf.default;
      } else {
        const rawValue = inputData[fieldConf.name];

        fetchedValue = !isNullOrUndefined(rawValue)
          ? rawValue
          : fieldConf.value || fieldConf.default;
      }
      if (
        isJsonPathExp(fieldConf.options)
      ) {
        const matchRes = (fieldConf.options as string).match(RX_JSON_PATH) as string[];
        const optionsRes =
          fetchJsonPath(inputData as object, matchRes[1]) ||
          fetchJsonPath(inputData as object, `${fieldConf.name}#options`);
        const options = optionsRes ? (Array.isArray(optionsRes) ? optionsRes : [optionsRes]) : [];
        fieldValues[`${fieldConf.name}#options`] = options;
      }
    } else {
      fetchedValue = fieldConf.value || fieldConf.default;
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
export const getFieldValues = (
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
 * Check if expr is the string in the following format '{$.<sonPathstring>}' example: {$.tagsSelector#options}
 * @param expr input string
 * @returns true if the input value is JSON path expression
 */
export const isJsonPathExp = (expr: unknown) => {
  return expr && typeof expr === 'string' && RX_JSON_PATH.test(expr);
};

/**
 * From the input string in the format '{$.<sonPathstring>}' example: {$.tagsSelector#options}. extract only
 * json path option of it -> $.tagsSelector#option
 *
 * @param expr input string
 * @returns json path string or undefined
 */
export const extractJsonPathString = (expr: unknown) => {
  if (!isJsonPathExp(expr)) {
    return undefined;
  }
  const strExpr = expr as string;
  const matchRes = strExpr.match(RX_JSON_PATH) as string[];

  return matchRes.length > 1 ? matchRes[1] : undefined;
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
    return values.length > 0 ? values.join(',').split(',') : values as string [];
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
    ? options.map((opt) => {
      const rawOpt: InputOption =
        typeof opt === 'string'
          ? { label: opt as string, value: opt as string }
          : (opt as InputOption);

      return {
        ...rawOpt,
        checked: !!(checkedValues && checkedValues.indexOf(`${rawOpt.value}`) >= 0),
        params: rawOpt.params || {},
        disabled: !!rawOpt.disabled
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
      fetchJsonPath(data, optionsJsonPath) || fetchJsonPath(data, `${field.name}#options`);
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


export function getFieldId(fieldConfig: InputField, fieldIndex?: number) {
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
