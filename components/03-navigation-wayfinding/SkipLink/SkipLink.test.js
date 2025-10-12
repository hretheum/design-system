import React from 'react';
import { render, screen } from '@testing-library/react';
import { SkipLink } from './SkipLink';

describe('SkipLink', () => {
  it('renders children correctly', () => {
    render(<SkipLink>Test Content</SkipLink>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<SkipLink variant="primary">Test</SkipLink>);
    expect(container.firstChild).toHaveClass('skiplink--primary');
  });

  it('applies size class', () => {
    const { container } = render(<SkipLink size="lg">Test</SkipLink>);
    expect(container.firstChild).toHaveClass('skiplink--lg');
  });
});
