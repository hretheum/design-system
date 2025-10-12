import React from 'react';
import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  it('renders children correctly', () => {
    render(<Sidebar>Test Content</Sidebar>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Sidebar variant="primary">Test</Sidebar>);
    expect(container.firstChild).toHaveClass('sidebar--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Sidebar size="lg">Test</Sidebar>);
    expect(container.firstChild).toHaveClass('sidebar--lg');
  });
});
