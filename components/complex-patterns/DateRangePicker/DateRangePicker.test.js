import React from 'react';
import { render, screen } from '@testing-library/react';
import { DateRangePicker } from './DateRangePicker';

describe('DateRangePicker', () => {
  it('renders children correctly', () => {
    render(<DateRangePicker>Test Content</DateRangePicker>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<DateRangePicker variant="primary">Test</DateRangePicker>);
    expect(container.firstChild).toHaveClass('daterangepicker--primary');
  });

  it('applies size class', () => {
    const { container } = render(<DateRangePicker size="lg">Test</DateRangePicker>);
    expect(container.firstChild).toHaveClass('daterangepicker--lg');
  });
});
