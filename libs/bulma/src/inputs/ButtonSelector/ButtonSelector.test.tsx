import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { ButtonSelector } from './ButtonSelector';

const optionsList = [
  { label: 'Opt 1', value: 1 },
  { label: 'Opt 2', value: 2 },
  { label: 'Opt 3', value: 3 },
  { label: 'Opt 4', value: 4 },
];
describe('Button Selector Tests', () => {
  it('test basic selector', () => {
    const mockChangeHandler = jest.fn();

    render(<ButtonSelector onChange={mockChangeHandler} options={optionsList} value={3} />);

    expect(screen.getByText('Opt 1')).toBeInTheDocument();
    expect(screen.getByText('Opt 3')).toBeInTheDocument();
  });

  it('test click on option', async () => {
    const mockChangeHandler = jest.fn();

    render(<ButtonSelector onChange={mockChangeHandler} options={optionsList} value={3} />);

    expect(screen.getByText('Opt 1')).toBeInTheDocument();
    expect(screen.getByText('Opt 3')).toBeInTheDocument();
    const buttonOpt2 = screen.getByTestId('buttonOpt-2-1');
    await userEvent.click(buttonOpt2);

    expect(mockChangeHandler).toHaveBeenCalledTimes(1);
  });
});
