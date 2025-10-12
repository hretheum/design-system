import React from 'react';
import { render, screen } from '@testing-library/react';
import { Gallery } from './Gallery';

describe('Gallery', () => {
  it('renders children correctly', () => {
    render(<Gallery>Test Content</Gallery>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Gallery variant="primary">Test</Gallery>);
    expect(container.firstChild).toHaveClass('gallery--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Gallery size="lg">Test</Gallery>);
    expect(container.firstChild).toHaveClass('gallery--lg');
  });
});
