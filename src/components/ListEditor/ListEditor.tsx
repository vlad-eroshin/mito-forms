import React, { useCallback, useState } from 'react';

import { FieldSetUI } from '../FieldSetUI';
import { fetchJsonPath, getFieldValues } from '../utils';
import './ListEditor.scss';
import { DataRecord, FieldSetMetadata, InputField, ParamsMap, RecordsArray } from '../../types';

export type ListInputProps = {
  rowFieldset: FieldSetMetadata;
  data: object;
  jsonPath?: string;
  showHeader?: boolean;
  canDeleteRows?: boolean | undefined;
  showBorders?: boolean;
  onChange?: (data: RecordsArray, isValid: boolean) => void;
  minItemsRequired?: number;
};

export const ListEditor: React.FC<ListInputProps> = ({
                                                       rowFieldset,
                                                       jsonPath,
                                                       data,
                                                       onChange,
                                                       minItemsRequired = 0,
                                                       showHeader = false,
                                                       canDeleteRows,
                                                       showBorders = false
                                                     }) => {
  const [rowsData, setRowsData] = useState<RecordsArray>(
    (jsonPath ? fetchJsonPath(data, jsonPath) || [] : data) as RecordsArray
  );

  const isValid = useCallback(
    (currentData: RecordsArray) => {
      return !(minItemsRequired > 0 && currentData.length < minItemsRequired);
    },
    [minItemsRequired]
  );

  const handleRowChange = useCallback(
    (rowIndex: number, record: DataRecord) => {
      const newRowsData = [...rowsData];
      newRowsData[rowIndex] = record;
      setRowsData(newRowsData);
      if (onChange) onChange(newRowsData, true);
    },
    [onChange, rowsData]
  );

  const handleDelete = useCallback(
    (itemIndex: number) => {
      const newInputData = [...rowsData];
      newInputData.splice(itemIndex, 1);
      setRowsData(newInputData);
      if (onChange) {
        onChange(newInputData, isValid(newInputData));
      }
    },
    [rowsData, isValid, onChange]
  );

  return (
    <table className={`${showBorders ? 'list-view borders' : 'list-view'}`}>
      {showHeader && (
        <thead>
        <tr>
          {(rowFieldset.fields as InputField[]).map((field: InputField) => {
            return <th key={`list-header-cell-${field.name}`}>{field.label || field.name}</th>;
          })}
          {canDeleteRows ? (
            <th>
              <div aria-label="Actions" role="region">
                &nbsp;
              </div>
            </th>
          ) : (
            <></>
          )}
        </tr>
        </thead>
      )}
      <tbody>
      {rowsData.map((itemData: ParamsMap | RecordsArray, i: number) => {
        const fieldValues = getFieldValues(itemData, rowFieldset);

        return (
          <FieldSetUI
            key={`list-item-row-${i}`}
            config={{ ...rowFieldset, arrangeFields: 'tableRow' }}
            rowIndex={i}
            inputData={fieldValues as ParamsMap}
            onChange={(fieldsetValues: ParamsMap, isFieldsetValid) =>
              isFieldsetValid && handleRowChange(i, fieldsetValues)
            }
            onRowDelete={canDeleteRows ? () => handleDelete(i) : undefined}
          />
        );
      })}
      </tbody>
    </table>
  );
};

ListEditor.displayName = 'ListEditor';
