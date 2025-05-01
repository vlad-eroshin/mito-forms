import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UtilityButtonProps } from '@mito-forms/core';
import React from 'react';

export const AddRowButton: React.FunctionComponent<UtilityButtonProps> = ({
  onClick,
  text,
  showIcon = true,
}): React.ReactElement => {
  return (
    <button onClick={onClick}>
      {showIcon ? <FontAwesomeIcon icon={faAdd} /> : <></>}
      {text}
    </button>
  );
};
