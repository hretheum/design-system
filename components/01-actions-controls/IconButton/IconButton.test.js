import React from 'react';
import { render, screen } from '@testing-library/react';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renders children correctly', () => {
    render(<IconButton>Test Content</IconButton>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<IconButton variant="primary">Test</IconButton>);
    expect(container.firstChild).toHaveClass('iconbutton--primary');
  });

  it('applies size class', () => {
    const { container } = render(<IconButton size="lg">Test</IconButton>);
    expect(container.firstChild).toHaveClass('iconbutton--lg');
  });
});
