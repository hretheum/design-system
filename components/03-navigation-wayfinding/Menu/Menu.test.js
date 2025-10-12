import React from 'react';
import { render, screen } from '@testing-library/react';
import { Menu } from './Menu';

describe('Menu', () => {
  it('renders children correctly', () => {
    render(<Menu>Test Content</Menu>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Menu variant="primary">Test</Menu>);
    expect(container.firstChild).toHaveClass('menu--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Menu size="lg">Test</Menu>);
    expect(container.firstChild).toHaveClass('menu--lg');
  });
});
