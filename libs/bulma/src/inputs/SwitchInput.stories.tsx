import type { Meta, StoryObj } from '@storybook/react';
import { SwitchInput } from './SwitchInput';

const meta: Meta<typeof SwitchInput> = {
  title: 'Bulma/Inputs/Switch Input',
  component: SwitchInput,
  decorators: [],
  parameters: {},
};
export default meta;

type Story = StoryObj<typeof SwitchInput>;

export const Basic: Story = {
  args: {
    checked: true,
    onChange: event => {
      debugger;
      alert(`Switch is checked: ${event.target.checked}`);
    },
  },
};
