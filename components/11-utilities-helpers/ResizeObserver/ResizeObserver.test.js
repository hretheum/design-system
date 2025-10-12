import React from 'react';
import { render, screen } from '@testing-library/react';
import { ResizeObserver } from './ResizeObserver';

describe('ResizeObserver', () => {
  it('renders children correctly', () => {
    render(<ResizeObserver>Test Content</ResizeObserver>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<ResizeObserver variant="primary">Test</ResizeObserver>);
    expect(container.firstChild).toHaveClass('resizeobserver--primary');
  });

  it('applies size class', () => {
    const { container } = render(<ResizeObserver size="lg">Test</ResizeObserver>);
    expect(container.firstChild).toHaveClass('resizeobserver--lg');
  });
});
