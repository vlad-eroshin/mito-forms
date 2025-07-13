import { FormInputFieldProps } from '@mito-forms/core';
import React from 'react';

export const ProgressBar: React.FunctionComponent<FormInputFieldProps> = props => {
  const { value } = props;
  return <progress className="progress is-link" value={value as number} max={100} />;
};
