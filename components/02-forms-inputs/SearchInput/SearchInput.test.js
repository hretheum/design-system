import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  it('renders children correctly', () => {
    render(<SearchInput>Test Content</SearchInput>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<SearchInput variant="primary">Test</SearchInput>);
    expect(container.firstChild).toHaveClass('searchinput--primary');
  });

  it('applies size class', () => {
    const { container } = render(<SearchInput size="lg">Test</SearchInput>);
    expect(container.firstChild).toHaveClass('searchinput--lg');
  });
});
