import React from 'react';
import { render, screen } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders children correctly', () => {
    render(<Skeleton>Test Content</Skeleton>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Skeleton variant="primary">Test</Skeleton>);
    expect(container.firstChild).toHaveClass('skeleton--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Skeleton size="lg">Test</Skeleton>);
    expect(container.firstChild).toHaveClass('skeleton--lg');
  });
});
