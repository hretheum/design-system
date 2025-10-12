import React from 'react';
import { render, screen } from '@testing-library/react';
import { Slider } from './Slider';

describe('Slider', () => {
  it('renders children correctly', () => {
    render(<Slider>Test Content</Slider>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Slider variant="primary">Test</Slider>);
    expect(container.firstChild).toHaveClass('slider--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Slider size="lg">Test</Slider>);
    expect(container.firstChild).toHaveClass('slider--lg');
  });
});
