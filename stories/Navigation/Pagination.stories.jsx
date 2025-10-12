import React, { useState } from 'react';

const Pagination = ({ currentPage = 1, totalPages = 10, onPageChange, size = 'md', showFirstLast = true, siblingCount = 1, ...props }) => {
  const sizes = {
    sm: { height: '32px', fontSize: '0.875rem', padding: '0 0.5rem', minWidth: '32px' },
    md: { height: '40px', fontSize: '1rem', padding: '0 0.75rem', minWidth: '40px' },
    lg: { height: '48px', fontSize: '1.125rem', padding: '0 1rem', minWidth: '48px' },
  };

  const sizeConfig = sizes[size];

  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const getPageNumbers = () => {
    const totalNumbers = siblingCount * 2 + 3; // siblings + current + first + last
    const totalBlocks = totalNumbers + 2; // + 2 ellipsis

    if (totalPages <= totalBlocks) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, 'dots', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [1, 'dots', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, 'dots', ...middleRange, 'dots', totalPages];
    }
  };

  const pages = getPageNumbers();

  const buttonStyle = (isActive, isDisabled) => ({
    ...sizeConfig,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: isActive ? 'var(--color-blue-600)' : 'transparent',
    color: isActive ? 'white' : isDisabled ? 'var(--content-disabled)' : 'var(--content-primary)',
    border: isActive ? 'none' : '1px solid var(--border-default)',
    borderRadius: 'var(--border-radius-md)',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    fontWeight: isActive ? 600 : 400,
    transition: 'all 200ms',
    outline: 'none',
  });

  return (
    <nav aria-label="Pagination" {...props}>
      <ul style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
        {showFirstLast && (
          <li>
            <button
              onClick={() => onPageChange?.(1)}
              disabled={currentPage === 1}
              aria-label="Go to first page"
              style={buttonStyle(false, currentPage === 1)}
              onFocus={(e) => {
                e.target.style.outline = '2px solid var(--focus-ring-color)';
                e.target.style.outlineOffset = '2px';
              }}
              onBlur={(e) => e.target.style.outline = 'none'}
              onMouseEnter={(e) => {
                if (currentPage !== 1) {
                  e.target.style.background = 'var(--surface-raised)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== 1) {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              ««
            </button>
          </li>
        )}

        <li>
          <button
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
            style={buttonStyle(false, currentPage === 1)}
            onFocus={(e) => {
              e.target.style.outline = '2px solid var(--focus-ring-color)';
              e.target.style.outlineOffset = '2px';
            }}
            onBlur={(e) => e.target.style.outline = 'none'}
            onMouseEnter={(e) => {
              if (currentPage !== 1) {
                e.target.style.background = 'var(--surface-raised)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== 1) {
                e.target.style.background = 'transparent';
              }
            }}
          >
            ‹
          </button>
        </li>

        {pages.map((page, index) => {
          if (page === 'dots') {
            return (
              <li key={`dots-${index}`}>
                <span style={{ padding: '0 0.5rem', color: 'var(--content-tertiary)' }}>
                  ...
                </span>
              </li>
            );
          }

          return (
            <li key={page}>
              <button
                onClick={() => onPageChange?.(page)}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
                style={buttonStyle(currentPage === page, false)}
                onFocus={(e) => {
                  e.target.style.outline = '2px solid var(--focus-ring-color)';
                  e.target.style.outlineOffset = '2px';
                }}
                onBlur={(e) => e.target.style.outline = 'none'}
                onMouseEnter={(e) => {
                  if (currentPage !== page) {
                    e.target.style.background = 'var(--surface-raised)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== page) {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                {page}
              </button>
            </li>
          );
        })}

        <li>
          <button
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
            style={buttonStyle(false, currentPage === totalPages)}
            onFocus={(e) => {
              e.target.style.outline = '2px solid var(--focus-ring-color)';
              e.target.style.outlineOffset = '2px';
            }}
            onBlur={(e) => e.target.style.outline = 'none'}
            onMouseEnter={(e) => {
              if (currentPage !== totalPages) {
                e.target.style.background = 'var(--surface-raised)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== totalPages) {
                e.target.style.background = 'transparent';
              }
            }}
          >
            ›
          </button>
        </li>

        {showFirstLast && (
          <li>
            <button
              onClick={() => onPageChange?.(totalPages)}
              disabled={currentPage === totalPages}
              aria-label="Go to last page"
              style={buttonStyle(false, currentPage === totalPages)}
              onFocus={(e) => {
                e.target.style.outline = '2px solid var(--focus-ring-color)';
                e.target.style.outlineOffset = '2px';
              }}
              onBlur={(e) => e.target.style.outline = 'none'}
              onMouseEnter={(e) => {
                if (currentPage !== totalPages) {
                  e.target.style.background = 'var(--surface-raised)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== totalPages) {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              »»
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: 'Pagination for navigating through pages. WCAG 2.1 compliant with keyboard navigation and ARIA labels.',
      },
    },
  },
  argTypes: {
    currentPage: { control: 'number' },
    totalPages: { control: 'number' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    showFirstLast: { control: 'boolean' },
    siblingCount: { control: 'number' },
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    currentPage: 5,
    totalPages: 10,
  },
};

export const FirstPage = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

export const LastPage = {
  args: {
    currentPage: 10,
    totalPages: 10,
  },
};

export const FewPages = {
  args: {
    currentPage: 2,
    totalPages: 5,
  },
};

export const ManyPages = {
  args: {
    currentPage: 15,
    totalPages: 50,
  },
};

export const Small = {
  args: {
    currentPage: 5,
    totalPages: 10,
    size: 'sm',
  },
};

export const Medium = {
  args: {
    currentPage: 5,
    totalPages: 10,
    size: 'md',
  },
};

export const Large = {
  args: {
    currentPage: 5,
    totalPages: 10,
    size: 'lg',
  },
};

export const WithoutFirstLast = {
  args: {
    currentPage: 5,
    totalPages: 10,
    showFirstLast: false,
  },
};

export const MoreSiblings = {
  args: {
    currentPage: 10,
    totalPages: 20,
    siblingCount: 2,
  },
};

export const Interactive = {
  render: () => {
    const [page, setPage] = useState(1);
    const totalPages = 20;

    return (
      <div>
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--surface-subdued)', borderRadius: '6px' }}>
          <p>Current Page: <strong>{page}</strong> of {totalPages}</p>
        </div>
      </div>
    );
  },
};

export const WithContent = {
  render: () => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    const allItems = Array.from({ length: 47 }, (_, i) => `Item ${i + 1}`);
    const totalPages = Math.ceil(allItems.length / itemsPerPage);
    
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = allItems.slice(startIndex, endIndex);

    return (
      <div>
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginTop: 0 }}>Items List</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {currentItems.map((item, index) => (
              <li
                key={index}
                style={{
                  padding: '0.75rem',
                  borderBottom: '1px solid var(--border-default)',
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--content-secondary)' }}>
            Showing {startIndex + 1}-{Math.min(endIndex, allItems.length)} of {allItems.length}
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    );
  },
};

export const TablePagination = {
  render: () => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = 247;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
      <div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-default)', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem' }}>ID</th>
              <th style={{ padding: '0.75rem' }}>Name</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
              <th style={{ padding: '0.75rem' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: itemsPerPage }, (_, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-default)' }}>
                <td style={{ padding: '0.75rem' }}>{(page - 1) * itemsPerPage + i + 1}</td>
                <td style={{ padding: '0.75rem' }}>User {(page - 1) * itemsPerPage + i + 1}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    background: '#dcfce7', 
                    color: '#166534',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}>
                    Active
                  </span>
                </td>
                <td style={{ padding: '0.75rem' }}>2024-01-{String(i + 1).padStart(2, '0')}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--content-secondary)' }}>
            {totalItems} total entries
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    );
  },
};
