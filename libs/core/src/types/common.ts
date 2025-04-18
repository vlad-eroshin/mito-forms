export type DataRecord = { [key: string]: DataCellValue };
export type ParamValue = string | number | boolean | object | object[] | null;
export type DataCellValue = ParamValue;
export type ParamsMap = { [key: string]: ParamValue };
export type FieldValues = { [key: string]: ParamValue | File };

export enum DataType {
  String,
  Decimal,
  Date,
  Object,
}

export type DataValue = null | undefined | string | number | boolean;

export type InputParamType = 'string' | 'number';
export type InputParamInfo = {
  name: string;
  label: string;
  type?: InputParamType;
  enumValues?: (string | number)[];
  targetProp?: string;
};
export type RecordsArray = DataRecord[];
export type DefinedDataValue = string | number | boolean;

export enum ConditionTypeEnum {
  Equal,
  NotEqual,
  Greater,
  Less,
  Between,
}

export type Size = {
  width?: number;
  height?: number;
};
export type ConditionInfo = {
  logic?: 'and' | 'or';
  value: DefinedDataValue;
  value2?: DefinedDataValue | null;
  type: ConditionTypeEnum;
};

export enum SortOrder {
  Asc = 1,
  Desc,
}
