import React from 'react';
import { render, screen } from '@testing-library/react';
import { TransferList } from './TransferList';

describe('TransferList', () => {
  it('renders children correctly', () => {
    render(<TransferList>Test Content</TransferList>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<TransferList variant="primary">Test</TransferList>);
    expect(container.firstChild).toHaveClass('transferlist--primary');
  });

  it('applies size class', () => {
    const { container } = render(<TransferList size="lg">Test</TransferList>);
    expect(container.firstChild).toHaveClass('transferlist--lg');
  });
});
