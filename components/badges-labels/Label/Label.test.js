import React from 'react';
import { render, screen } from '@testing-library/react';
import { Label } from './Label';

describe('Label', () => {
  it('renders children correctly', () => {
    render(<Label>Test Content</Label>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Label variant="primary">Test</Label>);
    expect(container.firstChild).toHaveClass('label--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Label size="lg">Test</Label>);
    expect(container.firstChild).toHaveClass('label--lg');
  });
});
