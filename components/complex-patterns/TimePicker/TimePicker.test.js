import React from 'react';
import { render, screen } from '@testing-library/react';
import { TimePicker } from './TimePicker';

describe('TimePicker', () => {
  it('renders children correctly', () => {
    render(<TimePicker>Test Content</TimePicker>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<TimePicker variant="primary">Test</TimePicker>);
    expect(container.firstChild).toHaveClass('timepicker--primary');
  });

  it('applies size class', () => {
    const { container } = render(<TimePicker size="lg">Test</TimePicker>);
    expect(container.firstChild).toHaveClass('timepicker--lg');
  });
});
