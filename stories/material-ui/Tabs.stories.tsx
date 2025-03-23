import React from 'react';
import { TabbedSection } from '../../src/components/EditorInput/TabbedSection';


export default {
  title: 'Material UI/Tabs',
  component: TabbedSection,
  parameters: {},
  args: {}
};

export const Basic = {
  args: {
    selected: '1',
    //onTab: (tabId: string | number) => void,
    tabs: [{
      id: '1',
      label: 'Tab One',
      content: (<div>Some Content</div>)
    }, {
      id: '2',
      label: 'Tab Two',
      content: (<div>Some Content</div>)
    }]
  }
};
