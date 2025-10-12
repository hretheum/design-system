import React from 'react';
import { render, screen } from '@testing-library/react';
import { Panel } from './Panel';

describe('Panel', () => {
  it('renders children correctly', () => {
    render(<Panel>Test Content</Panel>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Panel variant="primary">Test</Panel>);
    expect(container.firstChild).toHaveClass('panel--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Panel size="lg">Test</Panel>);
    expect(container.firstChild).toHaveClass('panel--lg');
  });
});
