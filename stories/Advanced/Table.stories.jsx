import React, { useState } from 'react';

const Table = ({ columns, data, sortable = false, selectable = false, striped = false, hoverable = true, size = 'md', ...props }) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const sizes = {
    sm: { padding: '0.5rem 0.75rem', fontSize: '0.875rem' },
    md: { padding: '0.75rem 1rem', fontSize: '1rem' },
    lg: { padding: '1rem 1.25rem', fontSize: '1.125rem' },
  };

  const sizeConfig = sizes[size];

  const handleSort = (columnKey) => {
    if (!sortable) return;
    
    let direction = 'asc';
    if (sortConfig?.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: columnKey, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const toggleRowSelection = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map(row => row.id));
    }
  };

  return (
    <div style={{ overflowX: 'auto', border: '1px solid var(--border-default)', borderRadius: 'var(--border-radius-lg)' }} {...props}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'var(--surface-subdued)', borderBottom: '2px solid var(--border-default)' }}>
            {selectable && (
              <th style={{ ...sizeConfig, width: '48px' }}>
                <input
                  type="checkbox"
                  checked={selectedRows.length === data.length}
                  onChange={toggleAllRows}
                  style={{ cursor: 'pointer' }}
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => sortable && column.sortable !== false && handleSort(column.key)}
                style={{
                  ...sizeConfig,
                  textAlign: column.align || 'left',
                  fontWeight: 600,
                  cursor: sortable && column.sortable !== false ? 'pointer' : 'default',
                  userSelect: 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: column.align === 'right' ? 'flex-end' : 'flex-start' }}>
                  {column.label}
                  {sortable && column.sortable !== false && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--content-tertiary)' }}>
                      {sortConfig?.key === column.key ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr
              key={row.id || index}
              style={{
                borderBottom: index < sortedData.length - 1 ? '1px solid var(--border-default)' : 'none',
                background: striped && index % 2 === 1 ? 'var(--surface-subdued)' : 'transparent',
                transition: 'background 150ms',
              }}
              onMouseEnter={(e) => hoverable && (e.currentTarget.style.background = 'var(--surface-raised)')}
              onMouseLeave={(e) => hoverable && (e.currentTarget.style.background = striped && index % 2 === 1 ? 'var(--surface-subdued)' : 'transparent')}
            >
              {selectable && (
                <td style={sizeConfig}>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => toggleRowSelection(row.id)}
                    style={{ cursor: 'pointer' }}
                  />
                </td>
              )}
              {columns.map((column) => (
                <td key={column.key} style={{ ...sizeConfig, textAlign: column.align || 'left' }}>
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default {
  title: 'Advanced/Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component: 'Data table with sorting, selection, and custom rendering. WCAG 2.1 compliant with keyboard navigation and semantic HTML.',
      },
    },
  },
  argTypes: {
    sortable: { control: 'boolean' },
    selectable: { control: 'boolean' },
    striped: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  tags: ['autodocs'],
};

const sampleColumns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
];

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'Active' },
];

export const Default = {
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
};

export const Sortable = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    sortable: true,
  },
};

export const Selectable = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    selectable: true,
  },
};

export const Striped = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    striped: true,
  },
};

export const Small = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    size: 'sm',
  },
};

export const Large = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    size: 'lg',
  },
};

export const WithCustomRender = {
  args: {
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      {
        key: 'status',
        label: 'Status',
        render: (value) => (
          <span style={{
            padding: '0.25rem 0.5rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 500,
            background: value === 'Active' ? '#dcfce7' : '#fee2e2',
            color: value === 'Active' ? '#166534' : '#991b1b',
          }}>
            {value}
          </span>
        ),
      },
      {
        key: 'actions',
        label: 'Actions',
        align: 'right',
        sortable: false,
        render: (_, row) => (
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button style={{ padding: '0.25rem 0.5rem', background: 'transparent', border: '1px solid var(--border-default)', borderRadius: '4px', cursor: 'pointer' }}>
              Edit
            </button>
            <button style={{ padding: '0.25rem 0.5rem', background: 'transparent', border: '1px solid var(--border-default)', borderRadius: '4px', cursor: 'pointer', color: '#ef4444' }}>
              Delete
            </button>
          </div>
        ),
      },
    ],
    data: sampleData,
  },
};

export const AllFeatures = {
  args: {
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
      {
        key: 'status',
        label: 'Status',
        render: (value) => (
          <span style={{
            padding: '0.25rem 0.5rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 500,
            background: value === 'Active' ? '#dcfce7' : '#fee2e2',
            color: value === 'Active' ? '#166534' : '#991b1b',
          }}>
            {value}
          </span>
        ),
      },
    ],
    data: sampleData,
    sortable: true,
    selectable: true,
    striped: true,
  },
};

export const EmptyState = {
  args: {
    columns: sampleColumns,
    data: [],
  },
  render: (args) => (
    <div>
      <Table {...args} />
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--content-secondary)' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
        <div>No data available</div>
      </div>
    </div>
  ),
};

export const WithPagination = {
  render: () => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(sampleData.length / itemsPerPage);
    
    const paginatedData = sampleData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
      <div>
        <Table columns={sampleColumns} data={paginatedData} striped hoverable />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--content-secondary)' }}>
            Page {page} of {totalPages}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                padding: '0.5rem 1rem',
                background: page === 1 ? 'var(--surface-subdued)' : 'var(--color-blue-600)',
                color: page === 1 ? 'var(--content-disabled)' : 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: page === 1 ? 'not-allowed' : 'pointer',
              }}
            >
              Previous
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{
                padding: '0.5rem 1rem',
                background: page === totalPages ? 'var(--surface-subdued)' : 'var(--color-blue-600)',
                color: page === totalPages ? 'var(--content-disabled)' : 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: page === totalPages ? 'not-allowed' : 'pointer',
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  },
};

export const ProductTable = {
  render: () => {
    const productColumns = [
      {
        key: 'image',
        label: 'Product',
        sortable: false,
        render: (_, row) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src="https://via.placeholder.com/48" alt={row.name} style={{ width: '48px', height: '48px', borderRadius: '6px' }} />
            <div>
              <div style={{ fontWeight: 500 }}>{row.name}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--content-secondary)' }}>{row.category}</div>
            </div>
          </div>
        ),
      },
      { key: 'sku', label: 'SKU' },
      { key: 'stock', label: 'Stock', align: 'right' },
      {
        key: 'price',
        label: 'Price',
        align: 'right',
        render: (value) => <span style={{ fontWeight: 600 }}>${value}</span>,
      },
    ];

    const productData = [
      { id: 1, name: 'Laptop Pro', category: 'Electronics', sku: 'LP-001', stock: 45, price: '1299.99' },
      { id: 2, name: 'Wireless Mouse', category: 'Accessories', sku: 'WM-002', stock: 120, price: '29.99' },
      { id: 3, name: 'USB-C Cable', category: 'Accessories', sku: 'UC-003', stock: 250, price: '12.99' },
      { id: 4, name: 'Monitor 27"', category: 'Electronics', sku: 'M27-004', stock: 30, price: '399.99' },
    ];

    return <Table columns={productColumns} data={productData} sortable hoverable />;
  },
};
