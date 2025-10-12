import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingOverlay } from './LoadingOverlay';

describe('LoadingOverlay', () => {
  it('renders children correctly', () => {
    render(<LoadingOverlay>Test Content</LoadingOverlay>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<LoadingOverlay variant="primary">Test</LoadingOverlay>);
    expect(container.firstChild).toHaveClass('loadingoverlay--primary');
  });

  it('applies size class', () => {
    const { container } = render(<LoadingOverlay size="lg">Test</LoadingOverlay>);
    expect(container.firstChild).toHaveClass('loadingoverlay--lg');
  });
});
