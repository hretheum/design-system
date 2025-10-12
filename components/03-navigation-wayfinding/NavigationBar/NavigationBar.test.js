import React from 'react';
import { render, screen } from '@testing-library/react';
import { NavigationBar } from './NavigationBar';

describe('NavigationBar', () => {
  it('renders children correctly', () => {
    render(<NavigationBar>Test Content</NavigationBar>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<NavigationBar variant="primary">Test</NavigationBar>);
    expect(container.firstChild).toHaveClass('navigationbar--primary');
  });

  it('applies size class', () => {
    const { container } = render(<NavigationBar size="lg">Test</NavigationBar>);
    expect(container.firstChild).toHaveClass('navigationbar--lg');
  });
});
