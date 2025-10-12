import React from 'react';
import { render, screen } from '@testing-library/react';
import { Timeline } from './Timeline';

describe('Timeline', () => {
  it('renders children correctly', () => {
    render(<Timeline>Test Content</Timeline>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Timeline variant="primary">Test</Timeline>);
    expect(container.firstChild).toHaveClass('timeline--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Timeline size="lg">Test</Timeline>);
    expect(container.firstChild).toHaveClass('timeline--lg');
  });
});
