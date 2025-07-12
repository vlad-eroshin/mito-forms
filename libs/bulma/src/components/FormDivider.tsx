import { FormDividerProps } from '@mito-forms/core';
import React, { FunctionComponent } from 'react';

export const FormDivider: FunctionComponent<FormDividerProps> = ({ config }) => {
  if (config.render === false) {
    return null;
  }
  return <hr className={`divider ${config.style || 'solid'}`} />;
};

FormDivider.displayName = 'FormDivider';
