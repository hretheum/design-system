import React from 'react';
import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders children correctly', () => {
    render(<Icon>Test Content</Icon>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Icon variant="primary">Test</Icon>);
    expect(container.firstChild).toHaveClass('icon--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Icon size="lg">Test</Icon>);
    expect(container.firstChild).toHaveClass('icon--lg');
  });
});
