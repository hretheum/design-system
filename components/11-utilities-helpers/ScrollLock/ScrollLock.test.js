import React from 'react';
import { render, screen } from '@testing-library/react';
import { ScrollLock } from './ScrollLock';

describe('ScrollLock', () => {
  it('renders children correctly', () => {
    render(<ScrollLock>Test Content</ScrollLock>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<ScrollLock variant="primary">Test</ScrollLock>);
    expect(container.firstChild).toHaveClass('scrolllock--primary');
  });

  it('applies size class', () => {
    const { container } = render(<ScrollLock size="lg">Test</ScrollLock>);
    expect(container.firstChild).toHaveClass('scrolllock--lg');
  });
});
