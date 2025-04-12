import { useIntl } from 'react-intl';
import { FormInputField } from '../FormInputField';
import { generateReactKey, retrieveInputOptions } from '../utils';
import React from 'react';
import { DataRecord, InputField, ParamsMap } from '../../types';

type EditableRowProps = {
  values: ParamsMap;
  fields: InputField[];
  rowIndex: number;
  onDelete?: (() => void) | undefined;
  onChange: (record: DataRecord, isValid?: boolean) => void;
};

export const EditableRow: React.FunctionComponent<EditableRowProps> = ({
                                                                         onDelete,
                                                                         values,
                                                                         fields,
                                                                         onChange,
                                                                         rowIndex
                                                                       }) => {
  const { formatMessage } = useIntl();
  return (
    <tr>
      {fields.map((field) => {
        const options = retrieveInputOptions(field, values);
        return (
          <td key={generateReactKey('list-item', field.name)}>
            <FormInputField
              renderAsFormElement={false}
              config={field}
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
          <button
            data-testid={`list-editor-delete-row-${rowIndex}`}
            onClick={onDelete}
            aria-label={formatMessage({ id: 'Delete' })}
          >
            {/*<DeleteIcon />*/}
          </button>
        </td>
      )}
    </tr>
  );
};

EditableRow.displayName = 'EditableRow';
