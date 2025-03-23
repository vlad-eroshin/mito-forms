import type { DataAccessor, DataRecord, DefaultDataTypes } from '../../../types';
import { AccessorType } from '../../../types';

import { JSONPath } from 'jsonpath-plus';

/**
 * Resolve accessor on the specified data object
 *
 * @param data
 * @param accessor
 */
export const resolveAccessor = (data: DefaultDataTypes | undefined, accessor: DataAccessor) => {
  if (!data) {
    return null;
  }
  const accessorType = accessor.type;
  switch (accessorType) {
    case AccessorType.Property: {
      if (!accessor.property) {
        return null;
      }
      return (data as DataRecord)[accessor.property];
    }
    case AccessorType.JsonPath: {
      const resolvedData = JSONPath({ json: data, path: accessor.jsonPath || '$.*' });
      return resolvedData && resolvedData.length === 1 ? resolvedData[0] : resolvedData;
    }
    default:
      return data;
  }
};
