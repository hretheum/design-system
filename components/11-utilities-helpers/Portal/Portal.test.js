import React from 'react';
import { render, screen } from '@testing-library/react';
import { Portal } from './Portal';

describe('Portal', () => {
  it('renders children correctly', () => {
    render(<Portal>Test Content</Portal>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Portal variant="primary">Test</Portal>);
    expect(container.firstChild).toHaveClass('portal--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Portal size="lg">Test</Portal>);
    expect(container.firstChild).toHaveClass('portal--lg');
  });
});
