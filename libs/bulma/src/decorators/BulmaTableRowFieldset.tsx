import {
  FieldsetProps,
  generateReactKey,
  useUtilComponent,
  UtilityButtonProps,
} from '@mito-forms/core';
import React from 'react';
import './BulmaFieldset.scss';
import 'bulma/bulma.scss';

export const BulmaTableRowFieldset: React.FC<FieldsetProps> = ({ onRowDelete, children }) => {
  const DeleteRowButton = useUtilComponent<UtilityButtonProps>('deleteRowButton');
  const fieldChildren = Array.isArray(children) ? children : [children];
  return (
    <tr>
      {fieldChildren.map((field, index) => {
        if (field.type === 'divider') {
          return <></>;
        }
        return <td key={generateReactKey('list-item', `${index}`)}>{field}</td>;
      })}
      {onRowDelete && (
        <td className="controls-col">
          <DeleteRowButton showIcon={true} onClick={onRowDelete} />
        </td>
      )}
    </tr>
  );
};
