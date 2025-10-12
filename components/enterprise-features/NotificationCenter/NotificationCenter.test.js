import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotificationCenter } from './NotificationCenter';

describe('NotificationCenter', () => {
  it('renders children correctly', () => {
    render(<NotificationCenter>Test Content</NotificationCenter>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<NotificationCenter variant="primary">Test</NotificationCenter>);
    expect(container.firstChild).toHaveClass('notificationcenter--primary');
  });

  it('applies size class', () => {
    const { container } = render(<NotificationCenter size="lg">Test</NotificationCenter>);
    expect(container.firstChild).toHaveClass('notificationcenter--lg');
  });
});
