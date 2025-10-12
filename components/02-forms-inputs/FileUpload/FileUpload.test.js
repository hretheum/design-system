import React from 'react';
import { render, screen } from '@testing-library/react';
import { FileUpload } from './FileUpload';

describe('FileUpload', () => {
  it('renders children correctly', () => {
    render(<FileUpload>Test Content</FileUpload>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<FileUpload variant="primary">Test</FileUpload>);
    expect(container.firstChild).toHaveClass('fileupload--primary');
  });

  it('applies size class', () => {
    const { container } = render(<FileUpload size="lg">Test</FileUpload>);
    expect(container.firstChild).toHaveClass('fileupload--lg');
  });
});
