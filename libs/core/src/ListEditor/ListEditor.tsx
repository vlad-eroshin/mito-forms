import React, { ReactElement, useCallback, useState } from 'react';

import { FormFieldset } from '../FormFieldset';
import { buildEmptyRecordFromFields, fetchJsonPath, getFieldsetData } from '../utils';
import {
  DataRecord,
  InputField,
  ListInputProps,
  ParamsMap,
  RecordsArray,
  UtilityButtonProps,
} from '../types';
import { useUtilComponent } from '../hooks';

export const ListEditor: React.FC<ListInputProps> = ({
  rowFieldset,
  jsonPath,
  data,
  onChange,
  minItemsRequired = 0,
  showHeader = false,
  canDeleteRows = false,
  canAddRows = false,
  showBorders = false,
}): ReactElement => {
  const [rowsData, setRowsData] = useState<RecordsArray>(
    (jsonPath ? fetchJsonPath(data, jsonPath) || [] : data) as RecordsArray
  );

  const isValid = useCallback(
    (currentData: RecordsArray) => {
      return !(minItemsRequired > 0 && currentData.length < minItemsRequired);
    },
    [minItemsRequired]
  );
  const AddRowButton = useUtilComponent<UtilityButtonProps>('addRowButton');

  const handleAddListItem = useCallback(() => {
    const newRows = [
      ...rowsData,
      buildEmptyRecordFromFields(
        rowFieldset.fields.filter(f => f.type !== 'divider') as InputField[]
      ),
    ];
    setRowsData(newRows);
  }, [rowsData]);

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
          const fieldValues = getFieldsetData(itemData, rowFieldset);
          return (
            <FormFieldset
              key={`list-item-row-${i}`}
              config={{ ...rowFieldset, arrangeFields: 'tableRow' }}
              showFieldLabels={!showHeader}
              rowIndex={i}
              inputData={fieldValues as ParamsMap}
              onChange={(fieldsetValues: ParamsMap, isFieldsetValid) =>
                isFieldsetValid && handleRowChange(i, fieldsetValues)
              }
              onRowDelete={canDeleteRows ? () => handleDelete(i) : undefined}
            />
          );
        })}
        {canAddRows && (
          <tr className={'footer-row'}>
            <td
              colSpan={rowFieldset.fields.length + (canDeleteRows ? 1 : 0)}
              className={'control-cell'}
            >
              <AddRowButton showIcon={true} onClick={handleAddListItem} />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

ListEditor.displayName = 'ListEditor';
