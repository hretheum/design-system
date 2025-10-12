import React from 'react';
import { render, screen } from '@testing-library/react';
import { Calendar } from './Calendar';

describe('Calendar', () => {
  it('renders children correctly', () => {
    render(<Calendar>Test Content</Calendar>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Calendar variant="primary">Test</Calendar>);
    expect(container.firstChild).toHaveClass('calendar--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Calendar size="lg">Test</Calendar>);
    expect(container.firstChild).toHaveClass('calendar--lg');
  });
});
