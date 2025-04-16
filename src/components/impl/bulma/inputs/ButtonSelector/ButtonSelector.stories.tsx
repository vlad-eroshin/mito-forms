import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { ButtonSelector, ButtonSelectorProps } from './ButtonSelector';
import React, { useState } from 'react';

const ButtonSelectorWrapper: React.FC<ButtonSelectorProps> = ({
                                                                value,
                                                                options,
                                                                buttonSize
                                                              }) => {
  const [selValue, setSelValue] = useState(value);
  return (
    <ButtonSelector
      options={options}
      value={selValue}
      buttonSize={buttonSize}
      onChange={(val) => {
        setSelValue(val as string | number);
      }}
    />
  );
};

const meta: Meta<typeof ButtonSelectorWrapper> = {
  title: 'Bulma/Inputs/Button Selector',
  component: ButtonSelectorWrapper
};

export default meta;
type Story = StoryObj<typeof ButtonSelectorWrapper>;

export const Main: Story = {
  args: {
    value: 'Table',
    options: ['Table', 'Chart', 'Other']
  }
};

export const SizeSmall: Story = {
  args: {
    value: 'Table',
    buttonSize: 'small',
    options: ['Table', 'Chart', 'Other']
  }
};

export const Icon: Story = {
  args: {
    value: 'table',
    options: [
      { label: 'Table', value: 'table', params: { icon: 'faTable' } },
      { label: 'Chart', value: 'chart', params: { icon: 'faChartSimple' } },
      { label: 'Other', value: 'other', params: { icon: 'folder-bold' } }
    ]
  }
};

export const IconSmall: Story = {
  args: {
    value: 'table',
    buttonSize: 'small',
    options: [
      { label: 'Table', value: 'table', params: { icon: 'faTable' } },
      { label: 'Chart', value: 'chart', params: { icon: 'faChartSimple' } },
      { label: 'Other', value: 'other', params: { icon: 'fas folder-bold' } }
    ]
  }
};

export const ClickStory: Story = {
  args: {
    value: 3,
    buttonSize: 'small',
    options: [
      { label: 'Opt 1', value: 1 },
      { label: 'Opt 2', value: 2 },
      { label: 'Opt 3', value: 3 },
      { label: 'Opt 4', value: 4 }
    ]
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Opt 1')).toBeVisible();
    expect(canvas.getByText('Opt 3')).toBeVisible();
    const opt3 = canvas.getByText('Opt 3');
    expect(opt3.parentElement).toHaveClass('selected');
    const opt1 = canvas.getByText('Opt 1');
    await userEvent.click(opt1);
    expect(canvas.getByText('Opt 1').parentElement).toHaveClass('selected');
  }
};
