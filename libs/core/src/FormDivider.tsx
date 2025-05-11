import type { FormDividerConfig } from './types';
import React, { FunctionComponent } from 'react';

export type FormDividerProps = {
  config: FormDividerConfig;
};
export const FormDivider: FunctionComponent<FormDividerProps> = ({ config }) => {
  if (config.render === false) {
    return null;
  }
  return <hr className={`divider ${config.style || 'solid'}`} />;
};

FormDivider.displayName = 'FormDivider';
