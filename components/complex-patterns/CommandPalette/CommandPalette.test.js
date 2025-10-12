import React from 'react';
import { render, screen } from '@testing-library/react';
import { CommandPalette } from './CommandPalette';

describe('CommandPalette', () => {
  it('renders children correctly', () => {
    render(<CommandPalette>Test Content</CommandPalette>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<CommandPalette variant="primary">Test</CommandPalette>);
    expect(container.firstChild).toHaveClass('commandpalette--primary');
  });

  it('applies size class', () => {
    const { container } = render(<CommandPalette size="lg">Test</CommandPalette>);
    expect(container.firstChild).toHaveClass('commandpalette--lg');
  });
});
