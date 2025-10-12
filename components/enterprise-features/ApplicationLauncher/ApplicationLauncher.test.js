import React from 'react';
import { render, screen } from '@testing-library/react';
import { ApplicationLauncher } from './ApplicationLauncher';

describe('ApplicationLauncher', () => {
  it('renders children correctly', () => {
    render(<ApplicationLauncher>Test Content</ApplicationLauncher>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<ApplicationLauncher variant="primary">Test</ApplicationLauncher>);
    expect(container.firstChild).toHaveClass('applicationlauncher--primary');
  });

  it('applies size class', () => {
    const { container } = render(<ApplicationLauncher size="lg">Test</ApplicationLauncher>);
    expect(container.firstChild).toHaveClass('applicationlauncher--lg');
  });
});
