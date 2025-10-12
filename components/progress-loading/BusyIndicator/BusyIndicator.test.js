import React from 'react';
import { render, screen } from '@testing-library/react';
import { BusyIndicator } from './BusyIndicator';

describe('BusyIndicator', () => {
  it('renders children correctly', () => {
    render(<BusyIndicator>Test Content</BusyIndicator>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<BusyIndicator variant="primary">Test</BusyIndicator>);
    expect(container.firstChild).toHaveClass('busyindicator--primary');
  });

  it('applies size class', () => {
    const { container } = render(<BusyIndicator size="lg">Test</BusyIndicator>);
    expect(container.firstChild).toHaveClass('busyindicator--lg');
  });
});
