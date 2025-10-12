import React from 'react';
import { render, screen } from '@testing-library/react';
import { AvatarGroup } from './AvatarGroup';

describe('AvatarGroup', () => {
  it('renders children correctly', () => {
    render(<AvatarGroup>Test Content</AvatarGroup>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<AvatarGroup variant="primary">Test</AvatarGroup>);
    expect(container.firstChild).toHaveClass('avatargroup--primary');
  });

  it('applies size class', () => {
    const { container } = render(<AvatarGroup size="lg">Test</AvatarGroup>);
    expect(container.firstChild).toHaveClass('avatargroup--lg');
  });
});
