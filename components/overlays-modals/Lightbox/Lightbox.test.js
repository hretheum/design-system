import React from 'react';
import { render, screen } from '@testing-library/react';
import { Lightbox } from './Lightbox';

describe('Lightbox', () => {
  it('renders children correctly', () => {
    render(<Lightbox>Test Content</Lightbox>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Lightbox variant="primary">Test</Lightbox>);
    expect(container.firstChild).toHaveClass('lightbox--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Lightbox size="lg">Test</Lightbox>);
    expect(container.firstChild).toHaveClass('lightbox--lg');
  });
});
