import type { Meta, StoryObj } from '@storybook/react';
import { TabbedSection } from './TabbedSection';
import React, { FunctionComponent, useState } from 'react';
import { TabbedSectionProps } from '../../../../../types';

const TabbsWrapper: FunctionComponent<TabbedSectionProps> = props => {
  const [selectedTab, setSelectedTab] = useState<string | number>(props.selected);
  return (
    <TabbedSection
      {...props}
      selected={selectedTab}
      onTab={sel => {
        setSelectedTab(sel);
      }}
    />
  );
};

const meta: Meta<typeof TabbsWrapper> = {
  title: 'Bulma/Utils/Tabbed Section',
  component: TabbsWrapper,
  decorators: [],
  parameters: {},
};
export default meta;

type Story = StoryObj<typeof TabbsWrapper>;

export const Basic: Story = {
  args: {
    selected: '1',
    onTab: selected => {
      alert(`Switch tab: ${selected}`);
    },
    tabs: [
      {
        label: 'Tab One',
        id: '1',
        content: <div>Tab One content</div>,
      },
      {
        label: 'Tab Two',
        id: '2',
        content: <div>Tab Two content</div>,
      },
      {
        label: 'Tab Three',
        id: '3',
        content: <div>Tab Three content</div>,
      },
      {
        label: 'Tab Four',
        id: '4',
        content: <div>Tab Four content</div>,
      },
    ],
  },
};
