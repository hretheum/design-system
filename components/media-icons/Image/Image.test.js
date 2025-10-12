import React from 'react';
import { render, screen } from '@testing-library/react';
import { Image } from './Image';

describe('Image', () => {
  it('renders children correctly', () => {
    render(<Image>Test Content</Image>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Image variant="primary">Test</Image>);
    expect(container.firstChild).toHaveClass('image--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Image size="lg">Test</Image>);
    expect(container.firstChild).toHaveClass('image--lg');
  });
});
