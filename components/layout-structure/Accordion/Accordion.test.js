import React from 'react';
import { render, screen } from '@testing-library/react';
import { Accordion } from './Accordion';

describe('Accordion', () => {
  it('renders children correctly', () => {
    render(<Accordion>Test Content</Accordion>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Accordion variant="primary">Test</Accordion>);
    expect(container.firstChild).toHaveClass('accordion--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Accordion size="lg">Test</Accordion>);
    expect(container.firstChild).toHaveClass('accordion--lg');
  });
});
