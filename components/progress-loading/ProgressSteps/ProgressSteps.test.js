import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressSteps } from './ProgressSteps';

describe('ProgressSteps', () => {
  it('renders children correctly', () => {
    render(<ProgressSteps>Test Content</ProgressSteps>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<ProgressSteps variant="primary">Test</ProgressSteps>);
    expect(container.firstChild).toHaveClass('progresssteps--primary');
  });

  it('applies size class', () => {
    const { container } = render(<ProgressSteps size="lg">Test</ProgressSteps>);
    expect(container.firstChild).toHaveClass('progresssteps--lg');
  });
});
