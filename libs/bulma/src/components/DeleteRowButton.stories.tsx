import type { Meta, StoryObj } from '@storybook/react';
import { DeleteRowButton } from './DeleteRowButton';

const meta: Meta<typeof DeleteRowButton> = {
  title: 'Bulma/Utils/DeleteRowButton',
  component: DeleteRowButton,
  decorators: [],
  parameters: {},
};
export default meta;

type Story = StoryObj<typeof DeleteRowButton>;

export const Basic: Story = {
  args: {
    showIcon: true,
  },
};
