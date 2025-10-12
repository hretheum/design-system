import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders children correctly', () => {
    render(<EmptyState>Test Content</EmptyState>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<EmptyState variant="primary">Test</EmptyState>);
    expect(container.firstChild).toHaveClass('emptystate--primary');
  });

  it('applies size class', () => {
    const { container } = render(<EmptyState size="lg">Test</EmptyState>);
    expect(container.firstChild).toHaveClass('emptystate--lg');
  });
});
