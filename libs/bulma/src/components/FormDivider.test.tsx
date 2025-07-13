import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormDivider } from './FormDivider';

describe('FormDivider', () => {
  it('renders a divider with solid style by default', () => {
    render(<FormDivider config={{ type: 'divider' }} />);
    const divider = screen.getByRole('separator');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass('divider', 'solid');
  });

  it('renders a divider with custom style', () => {
    render(<FormDivider config={{ type: 'divider', style: 'dashed' }} />);
    const divider = screen.getByRole('separator');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass('divider', 'dashed');
  });

  it('does not render when render is false', () => {
    render(<FormDivider config={{ type: 'divider', render: false }} />);
    const divider = screen.queryByRole('separator');
    expect(divider).not.toBeInTheDocument();
  });
});
