import React from 'react';
import { render, screen } from '@testing-library/react';
import { RichTextEditor } from './RichTextEditor';

describe('RichTextEditor', () => {
  it('renders children correctly', () => {
    render(<RichTextEditor>Test Content</RichTextEditor>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<RichTextEditor variant="primary">Test</RichTextEditor>);
    expect(container.firstChild).toHaveClass('richtexteditor--primary');
  });

  it('applies size class', () => {
    const { container } = render(<RichTextEditor size="lg">Test</RichTextEditor>);
    expect(container.firstChild).toHaveClass('richtexteditor--lg');
  });
});
