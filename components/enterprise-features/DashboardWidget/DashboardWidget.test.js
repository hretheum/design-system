import React from 'react';
import { render, screen } from '@testing-library/react';
import { DashboardWidget } from './DashboardWidget';

describe('DashboardWidget', () => {
  it('renders children correctly', () => {
    render(<DashboardWidget>Test Content</DashboardWidget>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<DashboardWidget variant="primary">Test</DashboardWidget>);
    expect(container.firstChild).toHaveClass('dashboardwidget--primary');
  });

  it('applies size class', () => {
    const { container } = render(<DashboardWidget size="lg">Test</DashboardWidget>);
    expect(container.firstChild).toHaveClass('dashboardwidget--lg');
  });
});
