import React from 'react';
import { render, screen } from '@testing-library/react';
import { FocusTrap } from './FocusTrap';

describe('FocusTrap', () => {
  it('renders children correctly', () => {
    render(<FocusTrap>Test Content</FocusTrap>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<FocusTrap variant="primary">Test</FocusTrap>);
    expect(container.firstChild).toHaveClass('focustrap--primary');
  });

  it('applies size class', () => {
    const { container } = render(<FocusTrap size="lg">Test</FocusTrap>);
    expect(container.firstChild).toHaveClass('focustrap--lg');
  });
});
