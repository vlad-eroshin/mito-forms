import type {
  ApiCallAction,
  ConditionInfo,
  DataAccessor,
  DataSourceConfig,
  DataTransformer,
  DataValue,
  DefaultDataTypes,
  DefinedDataValue,
  ExpressionContext,
  ParamsMap,
  ParamValue,
} from '../types';
import { ConditionTypeEnum } from '../types';
import { checkJsonPath, extractJsonPathString, fetchJsonPath, isJsonPathExp } from '../utils';
import { resolveAccessor } from './accessor';

//import { transformData } from './transformer';
export const transformData = (
  dataObject: DefaultDataTypes,
  _transformers?: DataTransformer[],
  _origData?: DefaultDataTypes
) => {
  //DUMMY implementation of missing transform Data function
  return dataObject;
};
export const evaluateLogicCondition = (
  conditionInfo: ConditionInfo,
  dataValue: DataValue
): boolean => {
  switch (conditionInfo.type) {
    case ConditionTypeEnum.Equal: {
      return conditionInfo.value === dataValue;
    }
    case ConditionTypeEnum.Greater: {
      const dataType = typeof conditionInfo.value;
      if (dataType === 'number' || dataType === 'string') {
        return conditionInfo.value > (dataValue || 0);
      }
      return false;
    }
    case ConditionTypeEnum.Less: {
      const dataType = typeof conditionInfo.value;
      if (dataType === 'number' || dataType === 'string') {
        return conditionInfo.value < (dataValue || 0);
      }
      return false;
    }
    case ConditionTypeEnum.Between: {
      const dataType = typeof conditionInfo.value;
      if (dataType === 'number' || dataType === 'string') {
        return (
          conditionInfo.value < (dataValue || 0) && (dataValue || 0) < (conditionInfo.value2 || 0)
        );
      }
      return false;
    }
    case ConditionTypeEnum.NotEqual: {
      return conditionInfo.value !== dataValue;
    }
  }
};

/**
 * Evaluates logic
 *
 * @param expression
 * @param contextData
 */
export const evaluateLogicInContext = <T>(
  expression: boolean | string,
  contextData: ExpressionContext
): boolean => {
  if (typeof expression === 'boolean') {
    return expression;
  }
  if (isJsonPathExp(expression)) {
    const jsonPath = extractJsonPathString(expression);
    return checkJsonPath(contextData, jsonPath);
  } else {
    return !!expression;
  }
};

export const evaluateConditionInContext = (
  condition: ConditionInfo,
  contextData: ExpressionContext
): boolean => {
  const valueField = condition.value; // Treating value as JSON PATH
  const value = fetchJsonPath(contextData as object, valueField as string);
  if (
    (value === '' || typeof value !== 'object' || value === null) &&
    !evaluateLogicCondition(
      { ...condition, value: (value || '') as DefinedDataValue },
      condition.value2
    )
  ) {
    return false;
  } else {
    return true;
  }
};

export const accessAndTransformData = (
  dataObject: DefaultDataTypes,
  accessor?: DataAccessor,
  transformers?: DataTransformer[]
) => {
  const accessedData = !accessor ? dataObject : resolveAccessor(dataObject, accessor);

  return !transformers ? accessedData : transformData(accessedData, transformers, dataObject);
};

export const dataSourceHasRequiredParams = (dataSource: DataSourceConfig, params?: ParamsMap) => {
  if (dataSource.action.requiredParams) {
    const dsParams: ParamsMap = {
      ...dataSource.action.params,
      ...(dataSource.action as ApiCallAction).urlParams,
      ...params,
    };
    const notDefinedParams = dataSource.action.requiredParams.filter(param => !dsParams[param]);
    return notDefinedParams.length === 0;
  }
  return true;
};

/**
 * Regex to test if property intends to access element in the array example 'prop[10]'
 */
const ARRAY_ELEMENT_INDEX_RX = /^(\w+)\[(\d+)\].*?/u;

/**
 * Inserts property value into object several levels down the hierarchy
 * Arrays are supported too.
 * example if there is data as {} this function can insert value as this
 * {top: { lower: {value: "test" }}} if the target Path specified as 'top.lower.value' and the value as 'test'.
 *
 *
 * @param data
 * @param targetPathStr
 * @param value
 */
export const injectPropertyValue = (data: object, targetPathStr: string, value: ParamValue) => {
  const propPath: string[] = targetPathStr.split('.');
  let currentObj: ParamsMap = data as ParamsMap;
  propPath.forEach((prop: string, i) => {
    if (typeof currentObj !== 'object') {
      console.error('Attempting to inject value into incompatible type.');
      return;
    }
    if (i === propPath.length - 1) {
      setProperty(currentObj, prop, value);
      return;
    }
    const holderObj = getProperty(currentObj, prop);
    if (!holderObj) {
      setProperty(currentObj, prop, {});
      currentObj = getProperty(currentObj, prop) as ParamsMap;
    } else {
      currentObj = holderObj as ParamsMap;
    }
  });
};

const setProperty = (data: object, prop: string, value: ParamValue) => {
  const dataAsParams: ParamsMap = data as ParamsMap;
  const matchArr: RegExpMatchArray | null = prop.match(ARRAY_ELEMENT_INDEX_RX);
  if (matchArr) {
    let arrayObj: ParamValue[] | undefined = accessArray(dataAsParams, prop);
    if (!arrayObj) {
      arrayObj = dataAsParams[matchArr[1]] = [];
    }
    const arrayInd = parseInt(matchArr[2], 10);
    arrayObj[arrayInd] = value;
  } else if (typeof data === 'object') {
    dataAsParams[prop] = value;
  }
};

const getProperty = (data: object, prop: string) => {
  const dataAsParams: ParamsMap = data as ParamsMap;
  const matchArr: RegExpMatchArray | null = prop.match(ARRAY_ELEMENT_INDEX_RX);
  if (matchArr) {
    const arrayObj: ParamValue[] | undefined = accessArray(dataAsParams, prop);
    if (arrayObj) {
      const arrayInd = parseInt(matchArr[2], 10);
      return arrayObj[arrayInd];
    } else {
      return null;
    }
  } else if (typeof data === 'object') {
    return dataAsParams[prop];
  }
  return undefined;
};

const accessArray = (data: ParamValue, prop: string): ParamValue[] | undefined => {
  const dataAsParams: ParamsMap = data as ParamsMap;
  const matchArr: RegExpMatchArray | null = prop.match(ARRAY_ELEMENT_INDEX_RX);
  if (matchArr) {
    const arrayName: string = matchArr[1];
    if (!Array.isArray(dataAsParams[arrayName])) {
      console.error('Attempting to inject value into incompatible type.');
      return;
    }
    return dataAsParams[arrayName] as ParamValue[];
  }
  return undefined;
};
