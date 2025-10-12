import React from 'react';
import { render, screen } from '@testing-library/react';
import { ButtonGroup } from './ButtonGroup';

describe('ButtonGroup', () => {
  it('renders children correctly', () => {
    render(<ButtonGroup>Test Content</ButtonGroup>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<ButtonGroup variant="primary">Test</ButtonGroup>);
    expect(container.firstChild).toHaveClass('buttongroup--primary');
  });

  it('applies size class', () => {
    const { container } = render(<ButtonGroup size="lg">Test</ButtonGroup>);
    expect(container.firstChild).toHaveClass('buttongroup--lg');
  });
});
