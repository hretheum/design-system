import React from 'react';
import { render, screen } from '@testing-library/react';
import { Link } from './Link';

describe('Link', () => {
  it('renders children correctly', () => {
    render(<Link>Test Content</Link>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Link variant="primary">Test</Link>);
    expect(container.firstChild).toHaveClass('link--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Link size="lg">Test</Link>);
    expect(container.firstChild).toHaveClass('link--lg');
  });
});
