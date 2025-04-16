import React from 'react';
import { DeleteRowButtonProps } from '../../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';

export const DeleteRowButton: React.FunctionComponent<DeleteRowButtonProps> = ({ onClick, text, showIcon }) => {
  return <button onClick={onClick}>{showIcon ? <FontAwesomeIcon icon={faRemove} /> : <></>}{text}</button>;
};