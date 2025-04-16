import React, { FunctionComponent } from 'react';
import { TabPanelProps } from '../../../../../types';

export const TabPanel: FunctionComponent<TabPanelProps> = ({ children, value, index }) => {
  return <div className={`mf-tab-panel panel-${index} tab-value-${value}`}>
    {children}
  </div>;
};