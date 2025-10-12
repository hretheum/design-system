import React from 'react';
import { render, screen } from '@testing-library/react';
import { TreeView } from './TreeView';

describe('TreeView', () => {
  it('renders children correctly', () => {
    render(<TreeView>Test Content</TreeView>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<TreeView variant="primary">Test</TreeView>);
    expect(container.firstChild).toHaveClass('treeview--primary');
  });

  it('applies size class', () => {
    const { container } = render(<TreeView size="lg">Test</TreeView>);
    expect(container.firstChild).toHaveClass('treeview--lg');
  });
});
