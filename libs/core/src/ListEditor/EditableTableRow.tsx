import { FormInputField } from '../FormInputField';
import { generateReactKey, retrieveInputOptions } from '../utils';
import React from 'react';
import { DataRecord, DeleteRowButtonProps, InputField, ParamsMap } from '../types';
import { useUtilComponent } from '../hooks';

type EditableRowProps = {
  values: ParamsMap;
  fields: InputField[];
  rowIndex: number;
  onDelete?: (() => void) | undefined;
  onChange: (record: DataRecord, isValid?: boolean) => void;
  showFieldLabels?: boolean;
};

export const EditableRow: React.FunctionComponent<EditableRowProps> = ({
  onDelete,
  values,
  fields,
  onChange,
  rowIndex,
  showFieldLabels = true,
}) => {
  const DeleteRowButton = useUtilComponent<DeleteRowButtonProps>('deleteRowButton');
  return (
    <tr>
      {fields.map(field => {
        const options = retrieveInputOptions(field, values);
        return (
          <td key={generateReactKey('list-item', field.name)}>
            <FormInputField
              renderAsFormElement={false}
              config={field}
              label={showFieldLabels ? field.label : undefined}
              value={values ? values[field.name] : null}
              options={options}
              onChange={onChange}
              fieldIndex={rowIndex}
            />
          </td>
        );
      })}
      {onDelete && (
        <td className="controls-col">
          <DeleteRowButton showIcon={true} onClick={onDelete} />
        </td>
      )}
    </tr>
  );
};

EditableRow.displayName = 'EditableRow';
