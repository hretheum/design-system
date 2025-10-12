import React from 'react';
import { render, screen } from '@testing-library/react';
import { KanbanBoard } from './KanbanBoard';

describe('KanbanBoard', () => {
  it('renders children correctly', () => {
    render(<KanbanBoard>Test Content</KanbanBoard>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<KanbanBoard variant="primary">Test</KanbanBoard>);
    expect(container.firstChild).toHaveClass('kanbanboard--primary');
  });

  it('applies size class', () => {
    const { container } = render(<KanbanBoard size="lg">Test</KanbanBoard>);
    expect(container.firstChild).toHaveClass('kanbanboard--lg');
  });
});
