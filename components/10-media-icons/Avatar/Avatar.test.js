import React from 'react';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders initials when no image provided', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders image when src provided', () => {
    render(<Avatar src="test.jpg" alt="Test Avatar" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'test.jpg');
    expect(img).toHaveAttribute('alt', 'Test Avatar');
  });

  it('applies size class correctly', () => {
    const { container } = render(<Avatar name="Test" size="lg" />);
    expect(container.firstChild).toHaveClass('avatar--lg');
  });

  it('applies variant class correctly', () => {
    const { container } = render(<Avatar name="Test" variant="square" />);
    expect(container.firstChild).toHaveClass('avatar--square');
  });

  it('shows status indicator when provided', () => {
    const { container } = render(<Avatar name="Test" status="online" />);
    expect(container.querySelector('.avatar__status--online')).toBeInTheDocument();
  });

  it('handles single name correctly', () => {
    render(<Avatar name="Alice" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('handles multiple names correctly', () => {
    render(<Avatar name="Alice Bob Charlie" />);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });
});
