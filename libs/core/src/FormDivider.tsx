import type { FormDividerConfig } from './types';
import './FormDivider.scss';
import React, { FunctionComponent } from 'react';

export type FormDividerProps = {
  config: FormDividerConfig;
};
export const FormDivider: FunctionComponent<FormDividerProps> = ({ config }) => {
  return <hr className={`divider ${config.style || 'solid'}`} />;
};

FormDivider.displayName = 'FormDivider';
