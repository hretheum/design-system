import React from 'react';
import { render, screen } from '@testing-library/react';
import { Graphs } from './Graphs';

describe('Graphs', () => {
  it('renders children correctly', () => {
    render(<Graphs>Test Content</Graphs>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Graphs variant="primary">Test</Graphs>);
    expect(container.firstChild).toHaveClass('graphs--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Graphs size="lg">Test</Graphs>);
    expect(container.firstChild).toHaveClass('graphs--lg');
  });
});
