import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  it('renders children correctly', () => {
    render(<UserProfile>Test Content</UserProfile>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<UserProfile variant="primary">Test</UserProfile>);
    expect(container.firstChild).toHaveClass('userprofile--primary');
  });

  it('applies size class', () => {
    const { container } = render(<UserProfile size="lg">Test</UserProfile>);
    expect(container.firstChild).toHaveClass('userprofile--lg');
  });
});
