import React from 'react';
import { render, screen } from '@testing-library/react';
import { PageHeader } from './PageHeader';

describe('PageHeader', () => {
  it('renders children correctly', () => {
    render(<PageHeader>Test Content</PageHeader>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<PageHeader variant="primary">Test</PageHeader>);
    expect(container.firstChild).toHaveClass('pageheader--primary');
  });

  it('applies size class', () => {
    const { container } = render(<PageHeader size="lg">Test</PageHeader>);
    expect(container.firstChild).toHaveClass('pageheader--lg');
  });
});
