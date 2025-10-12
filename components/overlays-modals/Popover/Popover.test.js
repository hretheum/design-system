import React from 'react';
import { render, screen } from '@testing-library/react';
import { Popover } from './Popover';

describe('Popover', () => {
  it('renders children correctly', () => {
    render(<Popover>Test Content</Popover>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Popover variant="primary">Test</Popover>);
    expect(container.firstChild).toHaveClass('popover--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Popover size="lg">Test</Popover>);
    expect(container.firstChild).toHaveClass('popover--lg');
  });
});
