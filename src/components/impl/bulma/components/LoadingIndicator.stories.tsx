import type { Meta, StoryObj } from '@storybook/react';
import { LoadingIndicator } from './LoadingIndicator';

const meta: Meta<typeof LoadingIndicator> = {
  title: 'Bulma/Utils/LoadingIndicator',
  component: LoadingIndicator,
  decorators: [],
  parameters: {},
};
export default meta;

type Story = StoryObj<typeof LoadingIndicator>;

export const Basic: Story = {
  args: {
    size: 'small',
    loadingText: 'Loading',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    loadingText: 'Large Loading',
  },
};
