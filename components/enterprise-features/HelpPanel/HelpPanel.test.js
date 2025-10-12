import React from 'react';
import { render, screen } from '@testing-library/react';
import { HelpPanel } from './HelpPanel';

describe('HelpPanel', () => {
  it('renders children correctly', () => {
    render(<HelpPanel>Test Content</HelpPanel>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<HelpPanel variant="primary">Test</HelpPanel>);
    expect(container.firstChild).toHaveClass('helppanel--primary');
  });

  it('applies size class', () => {
    const { container } = render(<HelpPanel size="lg">Test</HelpPanel>);
    expect(container.firstChild).toHaveClass('helppanel--lg');
  });
});
