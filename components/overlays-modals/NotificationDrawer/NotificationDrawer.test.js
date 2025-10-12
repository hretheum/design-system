import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotificationDrawer } from './NotificationDrawer';

describe('NotificationDrawer', () => {
  it('renders children correctly', () => {
    render(<NotificationDrawer>Test Content</NotificationDrawer>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<NotificationDrawer variant="primary">Test</NotificationDrawer>);
    expect(container.firstChild).toHaveClass('notificationdrawer--primary');
  });

  it('applies size class', () => {
    const { container } = render(<NotificationDrawer size="lg">Test</NotificationDrawer>);
    expect(container.firstChild).toHaveClass('notificationdrawer--lg');
  });
});
