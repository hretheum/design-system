import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntersectionObserver } from './IntersectionObserver';

describe('IntersectionObserver', () => {
  it('renders children correctly', () => {
    render(<IntersectionObserver>Test Content</IntersectionObserver>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<IntersectionObserver variant="primary">Test</IntersectionObserver>);
    expect(container.firstChild).toHaveClass('intersectionobserver--primary');
  });

  it('applies size class', () => {
    const { container } = render(<IntersectionObserver size="lg">Test</IntersectionObserver>);
    expect(container.firstChild).toHaveClass('intersectionobserver--lg');
  });
});
