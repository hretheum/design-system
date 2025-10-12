import React from 'react';
import { render, screen } from '@testing-library/react';
import { NumberInput } from './NumberInput';

describe('NumberInput', () => {
  it('renders children correctly', () => {
    render(<NumberInput>Test Content</NumberInput>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<NumberInput variant="primary">Test</NumberInput>);
    expect(container.firstChild).toHaveClass('numberinput--primary');
  });

  it('applies size class', () => {
    const { container } = render(<NumberInput size="lg">Test</NumberInput>);
    expect(container.firstChild).toHaveClass('numberinput--lg');
  });
});
