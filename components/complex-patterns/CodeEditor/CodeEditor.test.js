import React from 'react';
import { render, screen } from '@testing-library/react';
import { CodeEditor } from './CodeEditor';

describe('CodeEditor', () => {
  it('renders children correctly', () => {
    render(<CodeEditor>Test Content</CodeEditor>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<CodeEditor variant="primary">Test</CodeEditor>);
    expect(container.firstChild).toHaveClass('codeeditor--primary');
  });

  it('applies size class', () => {
    const { container } = render(<CodeEditor size="lg">Test</CodeEditor>);
    expect(container.firstChild).toHaveClass('codeeditor--lg');
  });
});
