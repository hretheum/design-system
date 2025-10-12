import React from 'react';
import { render, screen } from '@testing-library/react';
import { Gauges } from './Gauges';

describe('Gauges', () => {
  it('renders children correctly', () => {
    render(<Gauges>Test Content</Gauges>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Gauges variant="primary">Test</Gauges>);
    expect(container.firstChild).toHaveClass('gauges--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Gauges size="lg">Test</Gauges>);
    expect(container.firstChild).toHaveClass('gauges--lg');
  });
});
