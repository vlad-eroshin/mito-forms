import type { DataCellValue } from './common';
import type { DefaultDataTypes } from './dataSource';

export enum ComponentTypeEnum {
  Widget,
  DataSource,
  EditorField,
  Data,
}

export enum AccessorType {
  DirectUsage,
  Property,
  JsonPath,
}

export enum TransformType {
  Sort,
  RemapRecord,
  RemapRecordsArray,
  MapToArray,
  DecorateObject,
  ConvertNanoToMilliSeconds,
  GroupByField,
  ArrayJoin,
  InjectData,
  FlattenHierarchy,
  MilliSecondsToTimestamp,
  RemapFieldValue,
  FilterRecord,
  SplitStrings,
  UniqueValues,
}

export type DataTransformer = {
  type: TransformType;

  /**
   * if this property is specified the source object is retrieved from this path first
   */
  sourceJsonPath?: string;
  /**
   * source->target
   */
  propertyMap?: {
    [key: string]: string;
  };

  /*
   * List of properties (keys).
   */
  propertyKvList?: [string, string | number][];

  objectTemplate?: object;

  sortBy?: string; // field Name

  groupBy?: string; // group by field name

  sortOrder?: 'asc' | 'desc';

  targetColumn?: string;

  precision?: number; //Number of fraction digits

  delimiter?: string;

  targetJsonPath?: string;

  targetProperty?: string;
  sourceProperty?: string;
  caseSensitive?: boolean;
  datetimeFormat?: string;
  value?: DefaultDataTypes;
  valuesMap?: {
    accessor?: DataAccessor;
    data?: { [key: string]: DataCellValue };
  };

  // Used by filtering transformers
  // If set to true, filter will include by condition
  // If set to failse, filter will exclude by condition
  include?: boolean;
  splitBy?: string;
};

export type TransformerFn = (
  currentData: DefaultDataTypes,
  transformer: DataTransformer,
  originalData: DefaultDataTypes
) => DefaultDataTypes;

export type DataAccessor = {
  type: AccessorType;
  jsonPath?: string;
  property?: string;
};

export type DataChangeMode = 'replace' | 'merge';
export type DataBinding = {
  widgetId?: string;
  datasourceId?: string;
  type: ComponentTypeEnum;
  /**
   * targetProperty specifies where data will be injected if targetProperty is "$data" it means that data
   * from Data Binding will be passed as the data to the component this is most useful for data visualization
   * components.
   */
  targetProperty?: string;
  staticValue?: object;
  changeMode?: DataChangeMode;

  // If specified, uses this property field on reach record as the unique ID for the merge behavior.
  mergeOnField?: string;

  jsonPath?: string;
  /**
   * Accessor Expression. Used to access values inside Object Hierarchies.
   * Useful when for example DataSource result is in the format where the
   * data produced by the data source requires child object. In case of
   * Widget binding accessor can be used to access child hierarchy of
   * the bound state.
   *
   *  Example 1: Data Source result is in format:
   *
   *    {
   *      fullComparison: {...},
   *      topRegressions: {...},
   *      topImprovements: {...}
   *    }
   *
   *  if Component requires only 'topRegressions' object component can specify topRegressions as an accessor path.
   *
   *    {
   *        accessor: {
   *            type: AccessorType.FetchPropertyPath,
   *            attributePath: 'topRegressions'
   *        }
   *    }
   *  Example 2: Data source result is an array of objects and we need to access only one property of the object or
   *  one or two elements of the object. [{id: "1", title: "Title1"}, {id: "2", title: "Title2"}, {id: "3", title: "Title3"}]
   *
   *    {
   *        type: AccessorType.RemapRecordsArray
   *        propertyMap: {
   *          id: "recordId"
   *          title: "titleString"
   *        }
   *    }
   *    produces result of:
   *      [
   *        {recordId: "1", titleString: "Title1"},
   *        {recordId: "2", titleString: "Title1"},
   *        {recordId: "3", titleString: "Title1"}
   *      ]
   */
  accessor?: DataAccessor;
  /**
   * If specified data is first retrieved and the transformed accordingly (Currently not used)
   */
  transformers?: DataTransformer[];
};
