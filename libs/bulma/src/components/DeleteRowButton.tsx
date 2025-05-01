import { UtilityButtonProps } from '@mito-forms/core';
import React from 'react';

export const DeleteRowButton: React.FunctionComponent<UtilityButtonProps> = ({ onClick, text }) => {
  return (
    <button onClick={onClick} className={'delete'}>
      {text}
    </button>
  );
};
