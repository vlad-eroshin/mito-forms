import { generateReactKey, TabbedSectionProps } from '@mito-forms/core';
import React, { FunctionComponent, useCallback, useMemo } from 'react';

import { Tab } from './Tab';
import { TabPanel } from './TabPanel';

export const TabbedSection: FunctionComponent<TabbedSectionProps> = ({ selected, tabs, onTab }) => {
  const handleChange = useCallback((value: string | number, _event: unknown) => {
    onTab(value);
  }, []);
  const tabPanels = useMemo(() => {
    return tabs.map((tp, index) => (
      <TabPanel
        key={generateReactKey('tab panel', tp.label, `${tp.id}`)}
        index={index}
        value={tp.id === selected ? index : -1}
      >
        {tp.content}
      </TabPanel>
    ));
  }, [tabs]);
  return (
    <div className={'mf-tabbed-section'}>
      <div className={'tabs mf-tabs-container'}>
        <ul>
          {tabs.map((tp, index) => {
            return (
              <Tab
                key={`tab-${tp.id}`}
                id={tp.id}
                selected={tp.id === selected}
                label={tp.label}
                onTab={handleChange}
              ></Tab>
            );
          })}
        </ul>
      </div>
      {tabPanels.find((tp, index) => tabs[index].id === selected)}
    </div>
  );
};
