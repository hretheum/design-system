import React from 'react';
import { render, screen } from '@testing-library/react';
import { PinInput } from './PinInput';

describe('PinInput', () => {
  it('renders children correctly', () => {
    render(<PinInput>Test Content</PinInput>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<PinInput variant="primary">Test</PinInput>);
    expect(container.firstChild).toHaveClass('pininput--primary');
  });

  it('applies size class', () => {
    const { container } = render(<PinInput size="lg">Test</PinInput>);
    expect(container.firstChild).toHaveClass('pininput--lg');
  });
});
