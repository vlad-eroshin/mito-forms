import { TabPanelProps } from '@mito-forms/core';
import React, { FunctionComponent } from 'react';

export const TabPanel: FunctionComponent<TabPanelProps> = ({ children, value, index }) => {
  return <div className={`mf-tab-panel panel-${index} tab-value-${value}`}>{children}</div>;
};
