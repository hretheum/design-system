import React from 'react';
import { render, screen } from '@testing-library/react';
import { LabelGroup } from './LabelGroup';

describe('LabelGroup', () => {
  it('renders children correctly', () => {
    render(<LabelGroup>Test Content</LabelGroup>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<LabelGroup variant="primary">Test</LabelGroup>);
    expect(container.firstChild).toHaveClass('labelgroup--primary');
  });

  it('applies size class', () => {
    const { container } = render(<LabelGroup size="lg">Test</LabelGroup>);
    expect(container.firstChild).toHaveClass('labelgroup--lg');
  });
});
