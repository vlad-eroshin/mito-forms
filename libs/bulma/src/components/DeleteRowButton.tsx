import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DeleteRowButtonProps } from '@mito-forms/core';
import React from 'react';

export const DeleteRowButton: React.FunctionComponent<DeleteRowButtonProps> = ({
  onClick,
  text,
  showIcon = true,
}) => {
  return (
    <button onClick={onClick}>
      {showIcon ? <FontAwesomeIcon icon={faRemove} /> : <></>}
      {text}
    </button>
  );
};
