import React from 'react';

const Breadcrumb = ({ items, separator = '/', size = 'md', ...props }) => {
  const sizes = {
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
  };

  return (
    <nav aria-label="Breadcrumb" {...props}>
      <ol style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        fontSize: sizes[size],
      }}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    item.onClick?.(item);
                  }}
                  style={{
                    color: 'var(--color-blue-600)',
                    textDecoration: 'none',
                    transition: 'color 200ms',
                  }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                  onFocus={(e) => {
                    e.target.style.outline = '2px solid var(--focus-ring-color)';
                    e.target.style.outlineOffset = '2px';
                  }}
                  onBlur={(e) => {
                    e.target.style.outline = 'none';
                  }}
                >
                  {item.icon && <span style={{ marginRight: '0.25rem' }}>{item.icon}</span>}
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  style={{
                    color: isLast ? 'var(--content-primary)' : 'var(--content-secondary)',
                    fontWeight: isLast ? 600 : 400,
                  }}
                >
                  {item.icon && <span style={{ marginRight: '0.25rem' }}>{item.icon}</span>}
                  {item.label}
                </span>
              )}
              
              {!isLast && (
                <span
                  aria-hidden="true"
                  style={{
                    color: 'var(--content-tertiary)',
                    userSelect: 'none',
                  }}
                >
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default {
  title: 'Navigation & Wayfinding/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    category: '03-navigation-wayfinding',
    docs: {
      description: {
        component: 'Breadcrumb navigation for showing current location. WCAG 2.1 compliant with semantic HTML and ARIA labels.',
      },
    },
  },
  argTypes: {
    separator: { control: 'text', description: 'Separator character' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  tags: ['autodocs'],
};

const sampleItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Laptops' },
];

export const Default = {
  args: {
    items: sampleItems,
  },
};

export const WithSlash = {
  args: {
    items: sampleItems,
    separator: '/',
  },
};

export const WithChevron = {
  args: {
    items: sampleItems,
    separator: '›',
  },
};

export const WithArrow = {
  args: {
    items: sampleItems,
    separator: '→',
  },
};

export const Small = {
  args: {
    items: sampleItems,
    size: 'sm',
  },
};

export const Medium = {
  args: {
    items: sampleItems,
    size: 'md',
  },
};

export const Large = {
  args: {
    items: sampleItems,
    size: 'lg',
  },
};

export const WithIcons = {
  args: {
    items: [
      { label: 'Home', icon: '🏠', href: '/' },
      { label: 'Documents', icon: '📁', href: '/documents' },
      { label: 'Projects', icon: '📊', href: '/documents/projects' },
      { label: 'Q4 Report', icon: '📄' },
    ],
  },
};

export const TwoLevels = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Current Page' },
    ],
  },
};

export const DeepNesting = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Level 1', href: '/level1' },
      { label: 'Level 2', href: '/level1/level2' },
      { label: 'Level 3', href: '/level1/level2/level3' },
      { label: 'Level 4', href: '/level1/level2/level3/level4' },
      { label: 'Current Page' },
    ],
  },
};

export const Interactive = {
  render: () => {
    const [currentPath, setCurrentPath] = React.useState('Current Page');
    
    const items = [
      { label: 'Home', href: '/', onClick: () => setCurrentPath('Home') },
      { label: 'Products', href: '/products', onClick: () => setCurrentPath('Products') },
      { label: 'Electronics', href: '/products/electronics', onClick: () => setCurrentPath('Electronics') },
      { label: currentPath },
    ];

    return (
      <div>
        <Breadcrumb items={items} />
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--surface-subdued)', borderRadius: '6px' }}>
          <h3 style={{ marginTop: 0 }}>{currentPath}</h3>
          <p>Click any breadcrumb link to navigate (simulated)</p>
        </div>
      </div>
    );
  },
};

export const FileSystem = {
  render: () => {
    const items = [
      { label: 'My Computer', icon: '💻', href: '/' },
      { label: 'Documents', icon: '📁', href: '/documents' },
      { label: 'Work', icon: '💼', href: '/documents/work' },
      { label: 'Projects', icon: '📊', href: '/documents/work/projects' },
      { label: 'report.pdf', icon: '📄' },
    ];

    return <Breadcrumb items={items} separator="/" />;
  },
};

export const ECommerce = {
  render: () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Men', href: '/men' },
      { label: 'Clothing', href: '/men/clothing' },
      { label: 'T-Shirts', href: '/men/clothing/tshirts' },
      { label: 'Classic Cotton T-Shirt' },
    ];

    return <Breadcrumb items={items} separator="›" />;
  },
};

export const Documentation = {
  render: () => {
    const items = [
      { label: 'Docs', icon: '📚', href: '/docs' },
      { label: 'Components', href: '/docs/components' },
      { label: 'Navigation', href: '/docs/components/navigation' },
      { label: 'Breadcrumb' },
    ];

    return <Breadcrumb items={items} />;
  },
};

export const Responsive = {
  render: () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Very Long Category Name', href: '/category' },
      { label: 'Another Long Subcategory', href: '/category/subcategory' },
      { label: 'Even Longer Product Name' },
    ];

    return (
      <div style={{ maxWidth: '400px', border: '1px dashed var(--border-default)', padding: '1rem' }}>
        <p style={{ marginTop: 0, fontSize: '0.875rem', color: 'var(--content-secondary)' }}>
          Container width: 400px (shows wrapping)
        </p>
        <Breadcrumb items={items} />
      </div>
    );
  },
};
