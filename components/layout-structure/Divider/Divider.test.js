import React from 'react';
import { render, screen } from '@testing-library/react';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders children correctly', () => {
    render(<Divider>Test Content</Divider>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Divider variant="primary">Test</Divider>);
    expect(container.firstChild).toHaveClass('divider--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Divider size="lg">Test</Divider>);
    expect(container.firstChild).toHaveClass('divider--lg');
  });
});
