import React from 'react';
import { render, screen } from '@testing-library/react';
import { SplitButton } from './SplitButton';

describe('SplitButton', () => {
  it('renders children correctly', () => {
    render(<SplitButton>Test Content</SplitButton>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<SplitButton variant="primary">Test</SplitButton>);
    expect(container.firstChild).toHaveClass('splitbutton--primary');
  });

  it('applies size class', () => {
    const { container } = render(<SplitButton size="lg">Test</SplitButton>);
    expect(container.firstChild).toHaveClass('splitbutton--lg');
  });
});
