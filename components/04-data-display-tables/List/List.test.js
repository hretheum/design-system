import React from 'react';
import { render, screen } from '@testing-library/react';
import { List } from './List';

describe('List', () => {
  it('renders children correctly', () => {
    render(<List>Test Content</List>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<List variant="primary">Test</List>);
    expect(container.firstChild).toHaveClass('list--primary');
  });

  it('applies size class', () => {
    const { container } = render(<List size="lg">Test</List>);
    expect(container.firstChild).toHaveClass('list--lg');
  });
});
