import { Box, Tab, Tabs } from '@mui/material';
import React, { ReactNode, useCallback } from 'react';

export type TabProps = {
  id: string;
  label: string;
  disabled?: boolean
  content: ReactNode;
}

export type TabbedSectionProps = {
  selected: string,
  onTab: (tabId: string | number) => void,
  tabs: TabProps []
}


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number | string;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export function TabbedSection(props: TabbedSectionProps) {
  const { selected, onTab, tabs } = props;
  const handleChange = useCallback((_event: unknown, value: string | number) => {
    onTab(value);
  }, []);
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selected} onChange={handleChange}>
          {tabs.map((tp, index) =>
            (<Tab key={`tab-${index}`} title={tp.label} label={tp.label} value={tp.id}></Tab>)
          )}
        </Tabs>
      </Box>
      {tabs.map((tp, index) =>
        (<CustomTabPanel key={`tabpanel-${index}`} index={index}
                         value={tp.id === selected ? index : -1}>{tp.content}</CustomTabPanel>)
      )}
    </Box>);
}
