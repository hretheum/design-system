import React from 'react';
import { render, screen } from '@testing-library/react';
import { Form } from './Form';

describe('Form', () => {
  it('renders children correctly', () => {
    render(<Form>Test Content</Form>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Form variant="primary">Test</Form>);
    expect(container.firstChild).toHaveClass('form--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Form size="lg">Test</Form>);
    expect(container.firstChild).toHaveClass('form--lg');
  });
});
