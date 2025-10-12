import React from 'react';
import { render, screen } from '@testing-library/react';
import { Grid } from './Grid';

describe('Grid', () => {
  it('renders children correctly', () => {
    render(<Grid>Test Content</Grid>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Grid variant="primary">Test</Grid>);
    expect(container.firstChild).toHaveClass('grid--primary');
  });

  it('applies size class', () => {
    const { container } = render(<Grid size="lg">Test</Grid>);
    expect(container.firstChild).toHaveClass('grid--lg');
  });
});
