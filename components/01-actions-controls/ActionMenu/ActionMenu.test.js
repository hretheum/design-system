import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActionMenu } from './ActionMenu';

describe('ActionMenu', () => {
  it('renders children correctly', () => {
    render(<ActionMenu>Test Content</ActionMenu>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<ActionMenu variant="primary">Test</ActionMenu>);
    expect(container.firstChild).toHaveClass('actionmenu--primary');
  });

  it('applies size class', () => {
    const { container } = render(<ActionMenu size="lg">Test</ActionMenu>);
    expect(container.firstChild).toHaveClass('actionmenu--lg');
  });
});
