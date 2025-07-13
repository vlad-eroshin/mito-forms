import { TabPanelProps } from '@mito-forms/core';
import React, { FunctionComponent } from 'react';

export const TabPanel: FunctionComponent<TabPanelProps> = ({ children }) => {
  return <div className="tab-content">{children}</div>;
};
