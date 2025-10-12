import React from 'react';
import { render, screen } from '@testing-library/react';
import { DualListSelector } from './DualListSelector';

describe('DualListSelector', () => {
  it('renders children correctly', () => {
    render(<DualListSelector>Test Content</DualListSelector>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<DualListSelector variant="primary">Test</DualListSelector>);
    expect(container.firstChild).toHaveClass('duallistselector--primary');
  });

  it('applies size class', () => {
    const { container } = render(<DualListSelector size="lg">Test</DualListSelector>);
    expect(container.firstChild).toHaveClass('duallistselector--lg');
  });
});
