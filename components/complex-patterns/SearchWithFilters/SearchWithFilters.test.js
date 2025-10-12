import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchWithFilters } from './SearchWithFilters';

describe('SearchWithFilters', () => {
  it('renders children correctly', () => {
    render(<SearchWithFilters>Test Content</SearchWithFilters>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<SearchWithFilters variant="primary">Test</SearchWithFilters>);
    expect(container.firstChild).toHaveClass('searchwithfilters--primary');
  });

  it('applies size class', () => {
    const { container } = render(<SearchWithFilters size="lg">Test</SearchWithFilters>);
    expect(container.firstChild).toHaveClass('searchwithfilters--lg');
  });
});
