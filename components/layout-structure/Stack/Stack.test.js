import React from 'react';
import { render, screen } from '@testing-library/react';
import { Stack } from './Stack';

describe('Stack', () => {
  it('renders children correctly', () => {
    render(<Stack>Test Content</Stack>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Stack variant="primary">Test</Stack>);
    expect(container.firstChild).toHaveClass('stack--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Stack size="lg">Test</Stack>);
    expect(container.firstChild).toHaveClass('stack--lg');
  });
});
