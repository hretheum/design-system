import React from 'react';
import { render, screen } from '@testing-library/react';
import { Drawer } from './Drawer';

describe('Drawer', () => {
  it('renders children correctly', () => {
    render(<Drawer>Test Content</Drawer>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Drawer variant="primary">Test</Drawer>);
    expect(container.firstChild).toHaveClass('drawer--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Drawer size="lg">Test</Drawer>);
    expect(container.firstChild).toHaveClass('drawer--lg');
  });
});
