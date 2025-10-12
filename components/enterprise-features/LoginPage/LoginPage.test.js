import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoginPage } from './LoginPage';

describe('LoginPage', () => {
  it('renders children correctly', () => {
    render(<LoginPage>Test Content</LoginPage>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<LoginPage variant="primary">Test</LoginPage>);
    expect(container.firstChild).toHaveClass('loginpage--primary');
  });

  it('applies size class', () => {
    const { container } = render(<LoginPage size="lg">Test</LoginPage>);
    expect(container.firstChild).toHaveClass('loginpage--lg');
  });
});
