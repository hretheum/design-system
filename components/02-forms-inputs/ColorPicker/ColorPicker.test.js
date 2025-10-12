import React from 'react';
import { render, screen } from '@testing-library/react';
import { ColorPicker } from './ColorPicker';

describe('ColorPicker', () => {
  it('renders children correctly', () => {
    render(<ColorPicker>Test Content</ColorPicker>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<ColorPicker variant="primary">Test</ColorPicker>);
    expect(container.firstChild).toHaveClass('colorpicker--primary');
  });

  it('applies size class', () => {
    const { container } = render(<ColorPicker size="lg">Test</ColorPicker>);
    expect(container.firstChild).toHaveClass('colorpicker--lg');
  });
});
