import type { Meta, StoryObj } from '@storybook/react';
import { SwitchList } from './SwitchList';

const meta: Meta<typeof SwitchList> = {
  title: 'Bulma/Inputs/Switch List',
  component: SwitchList,
  decorators: [],
  parameters: {},
};
export default meta;

type Story = StoryObj<typeof SwitchList>;

export const Basic: Story = {
  args: {
    config: {
      name: 'switchList',
      type: 'switch',
      label: 'Switch List',
      value: ['1', '3'],
      options: [
        { value: '1', label: 'Option one' },
        { value: '2', label: 'Option two' },
        { value: '3', label: 'Option three' },
        { value: '4', label: 'Option four' },
        { value: '5', label: 'Option five' },
      ],
    },
    value: ['1', '3'],
    options: [
      { value: '1', label: 'Option one' },
      { value: '2', label: 'Option two' },
      { value: '3', label: 'Option three' },
      { value: '4', label: 'Option four' },
      { value: '5', label: 'Option five' },
    ],
    onChange: paramsMap => {
      alert(paramsMap);
    },
  },
};
