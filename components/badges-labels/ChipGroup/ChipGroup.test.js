import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChipGroup } from './ChipGroup';

describe('ChipGroup', () => {
  it('renders children correctly', () => {
    render(<ChipGroup>Test Content</ChipGroup>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<ChipGroup variant="primary">Test</ChipGroup>);
    expect(container.firstChild).toHaveClass('chipgroup--primary');
  });

  it('applies size class', () => {
    const { container } = render(<ChipGroup size="lg">Test</ChipGroup>);
    expect(container.firstChild).toHaveClass('chipgroup--lg');
  });
});
