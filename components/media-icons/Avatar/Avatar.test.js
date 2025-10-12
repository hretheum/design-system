import React from 'react';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders children correctly', () => {
    render(<Avatar>Test Content</Avatar>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Avatar variant="primary">Test</Avatar>);
    expect(container.firstChild).toHaveClass('avatar--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Avatar size="lg">Test</Avatar>);
    expect(container.firstChild).toHaveClass('avatar--lg');
  });
});
