import React from 'react';
import { render, screen } from '@testing-library/react';
import { Charts } from './Charts';

describe('Charts', () => {
  it('renders children correctly', () => {
    render(<Charts>Test Content</Charts>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Charts variant="primary">Test</Charts>);
    expect(container.firstChild).toHaveClass('charts--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Charts size="lg">Test</Charts>);
    expect(container.firstChild).toHaveClass('charts--lg');
  });
});
