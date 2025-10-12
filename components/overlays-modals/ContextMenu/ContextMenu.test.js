import React from 'react';
import { render, screen } from '@testing-library/react';
import { ContextMenu } from './ContextMenu';

describe('ContextMenu', () => {
  it('renders children correctly', () => {
    render(<ContextMenu>Test Content</ContextMenu>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<ContextMenu variant="primary">Test</ContextMenu>);
    expect(container.firstChild).toHaveClass('contextmenu--primary');
  });

  it('applies size class', () => {
    const { container } = render(<ContextMenu size="lg">Test</ContextMenu>);
    expect(container.firstChild).toHaveClass('contextmenu--lg');
  });
});
