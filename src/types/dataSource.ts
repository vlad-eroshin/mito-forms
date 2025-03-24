import type { DataCellValue, ParamsMap, ParamValue, RecordsArray } from './common';
import type { DataAccessor, DataBinding, DataTransformer } from './dataBindings';

export enum DataSourceType {
  ApiCall,
  Static,
  Aggregate,
}

export interface DataAction {
  params?: ParamsMap;
  requiredParams?: string[];
}

export interface StaticAction extends DataAction {
  staticData: RecordsArray | (string | object)[] | object;
}

export interface QueryAction extends DataAction {
  query: string;
}

export interface ApiCallAction extends DataAction {
  uri: string;
  method: 'GET' | 'POST';
  urlParams?: { [key: string]: ParamValue };
  accessor?: DataAccessor;
  transformers?: DataTransformer[];
}

export enum DataAggregationMode {
  Append,
}

export type AggregationConfig = ApiCallAction & {
  aggregateId?: string;
};

export interface AggregateAction extends DataAction {
  aggregationMode: DataAggregationMode;
  aggregateSources: AggregationConfig[];
  preserveSourceData?: boolean;
}

export type AggregateDatasourceResult = {
  aggResult: { [key: string]: DefaultDataTypes } | RecordsArray;
  sourceData: { [key: string]: DefaultDataTypes };
};

export enum ResultFormat {
  PandasDataFrame = 0,
  RecordsArray,
  Object,
  Any,
}

export type DataSourceConfig = {
  id: string;
  type: DataSourceType;
  action: QueryAction | ApiCallAction | StaticAction | AggregateAction;
  resultFormat: ResultFormat;
  dataBindings?: DataBinding[];
  accessor?: DataAccessor;
  transformers?: DataTransformer[];
};

export enum DataStatus {
  Unknown = 0,
  NeedsRefresh,
  Loading,
  Loaded,
  Error,
}

export type DefaultDataTypes =
  | RecordsArray
  | DataCellValue
  | (string | object)[]
  | { [key: string]: object | RecordsArray }
  | undefined;

export interface Datum<Type = DefaultDataTypes> {
  data?: Type;
}

export type DatasourceError = {
  error: string;
};

export interface DataSourceState<Type = DefaultDataTypes> extends Datum<Type> {
  id: string;
  status: DataStatus;
  resultFormat: ResultFormat;
  params?: { [key: string]: ParamValue };
  urlParams?: { [key: string]: ParamValue };
  errorDetails?: DatasourceError;
  config?: DataSourceConfig;
}

export type DataSourceBinding = Omit<DataBinding, 'type'> & {
  datasourceId: string;
};
