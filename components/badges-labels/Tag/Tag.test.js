import React from 'react';
import { render, screen } from '@testing-library/react';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders children correctly', () => {
    render(<Tag>Test Content</Tag>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Tag variant="primary">Test</Tag>);
    expect(container.firstChild).toHaveClass('tag--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Tag size="lg">Test</Tag>);
    expect(container.firstChild).toHaveClass('tag--lg');
  });
});
