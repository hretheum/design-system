import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it('renders children correctly', () => {
    render(<StatusBadge>Test Content</StatusBadge>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<StatusBadge variant="primary">Test</StatusBadge>);
    expect(container.firstChild).toHaveClass('statusbadge--primary');
  });

  it('applies size class', () => {
    const { container } = render(<StatusBadge size="lg">Test</StatusBadge>);
    expect(container.firstChild).toHaveClass('statusbadge--lg');
  });
});
