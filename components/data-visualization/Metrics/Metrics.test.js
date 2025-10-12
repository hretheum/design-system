import React from 'react';
import { render, screen } from '@testing-library/react';
import { Metrics } from './Metrics';

describe('Metrics', () => {
  it('renders children correctly', () => {
    render(<Metrics>Test Content</Metrics>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Metrics variant="primary">Test</Metrics>);
    expect(container.firstChild).toHaveClass('metrics--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Metrics size="lg">Test</Metrics>);
    expect(container.firstChild).toHaveClass('metrics--lg');
  });
});
