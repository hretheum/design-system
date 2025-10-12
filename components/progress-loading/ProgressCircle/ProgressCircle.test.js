import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressCircle } from './ProgressCircle';

describe('ProgressCircle', () => {
  it('renders children correctly', () => {
    render(<ProgressCircle>Test Content</ProgressCircle>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<ProgressCircle variant="primary">Test</ProgressCircle>);
    expect(container.firstChild).toHaveClass('progresscircle--primary');
  });

  it('applies size class', () => {
    const { container } = render(<ProgressCircle size="lg">Test</ProgressCircle>);
    expect(container.firstChild).toHaveClass('progresscircle--lg');
  });
});
