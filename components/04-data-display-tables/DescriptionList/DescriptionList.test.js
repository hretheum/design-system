import React from 'react';
import { render, screen } from '@testing-library/react';
import { DescriptionList } from './DescriptionList';

describe('DescriptionList', () => {
  it('renders children correctly', () => {
    render(<DescriptionList>Test Content</DescriptionList>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<DescriptionList variant="primary">Test</DescriptionList>);
    expect(container.firstChild).toHaveClass('descriptionlist--primary');
  });

  it('applies size class', () => {
    const { container } = render(<DescriptionList size="lg">Test</DescriptionList>);
    expect(container.firstChild).toHaveClass('descriptionlist--lg');
  });
});
