import React, { useState } from 'react';
import { Link } from '../../components/01-actions-controls/Link/Link';
import { action } from '@storybook/addon-actions';
import { within, userEvent, expect } from '@storybook/test';

export default {
  title: 'Actions/Link',
  component: Link,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Accessible link component with multiple variants, states, and external link handling.'
      }
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true
          }
        ]
      }
    }
  },
  argTypes: {
    href: {
      control: 'text',
      description: 'Link destination'
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'neutral', 'danger'],
      description: 'Visual variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the link'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the link'
    },
    external: {
      control: 'boolean',
      description: 'Mark as external link (opens in new tab)'
    },
    underline: {
      control: 'select',
      options: ['none', 'hover', 'always'],
      description: 'Underline behavior'
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Link target'
    }
  }
};

const Template = (args) => {
  const handleClick = (event) => {
    if (args.href === '#' || args.disabled) {
      event.preventDefault();
    }
    action('onClick')(event);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Link {...args} onClick={handleClick}>
        {args.children || 'Sample Link'}
      </Link>
      
      <div style={{ marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>
        Click events are logged in the Actions panel
      </div>
    </div>
  );
};

// Default Link
export const Default = Template.bind({});
Default.args = {
  href: 'https://example.com',
  children: 'Default Link'
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const link = canvas.getByRole('link');
  
  // Test accessibility
  await expect(link).toBeInTheDocument();
  await expect(link).toHaveAttribute('href', 'https://example.com');
  
  // Test interaction
  await userEvent.hover(link);
  await userEvent.unhover(link);
};

// Primary Variant
export const Primary = Template.bind({});
Primary.args = {
  href: '#',
  variant: 'primary',
  children: 'Primary Link'
};

// Secondary Variant
export const Secondary = Template.bind({});
Secondary.args = {
  href: '#',
  variant: 'secondary',
  children: 'Secondary Link'
};

// Danger Variant
export const Danger = Template.bind({});
Danger.args = {
  href: '#',
  variant: 'danger',
  children: 'Delete Account'
};
Danger.parameters = {
  docs: {
    description: {
      story: 'Danger variant for destructive actions.'
    }
  }
};

// External Link
export const External = Template.bind({});
External.args = {
  href: 'https://example.com',
  external: true,
  children: 'Visit External Site'
};
External.parameters = {
  docs: {
    description: {
      story: 'External link with automatic target="_blank" and security attributes.'
    }
  }
};
External.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const link = canvas.getByRole('link');
  
  // Test external link attributes
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
};

// Different Sizes
export const Small = Template.bind({});
Small.args = {
  href: '#',
  size: 'sm',
  children: 'Small Link'
};

export const Medium = Template.bind({});
Medium.args = {
  href: '#',
  size: 'md',
  children: 'Medium Link'
};

export const Large = Template.bind({});
Large.args = {
  href: '#',
  size: 'lg',
  children: 'Large Link'
};

// Disabled State
export const Disabled = Template.bind({});
Disabled.args = {
  href: '#',
  disabled: true,
  children: 'Disabled Link'
};
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const link = canvas.getByRole('link');
  
  // Test disabled state
  await expect(link).toHaveAttribute('aria-disabled', 'true');
  await userEvent.click(link); // Should not navigate
};

// Underline Variants
export const NoUnderline = Template.bind({});
NoUnderline.args = {
  href: '#',
  underline: 'none',
  children: 'No Underline'
};

export const UnderlineOnHover = Template.bind({});
UnderlineOnHover.args = {
  href: '#',
  underline: 'hover',
  children: 'Underline on Hover'
};

export const AlwaysUnderline = Template.bind({});
AlwaysUnderline.args = {
  href: '#',
  underline: 'always',
  children: 'Always Underlined'
};

// Navigation Examples
export const NavigationLinks = () => {
  const [currentPath, setCurrentPath] = useState('/home');
  
  const navigation = [
    { href: '/home', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ];
  
  const handleNavigation = (href, event) => {
    event.preventDefault();
    setCurrentPath(href);
    action('navigate')(href);
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h3>Main Navigation</h3>
      <nav style={{ marginTop: '16px' }}>
        <ul style={{ 
          display: 'flex', 
          gap: '24px', 
          listStyle: 'none', 
          padding: 0, 
          margin: 0 
        }}>
          {navigation.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                variant={currentPath === href ? 'primary' : 'neutral'}
                onClick={(e) => handleNavigation(href, e)}
                aria-current={currentPath === href ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
        <strong>Current Page:</strong> {currentPath}
      </div>
    </div>
  );
};
NavigationLinks.parameters = {
  docs: {
    description: {
      story: 'Navigation links with active state indication.'
    }
  }
};

// Breadcrumb Links
export const BreadcrumbLinks = () => {
  const breadcrumbs = [
    { href: '/', label: 'Home' },
    { href: '/category', label: 'Electronics' },
    { href: '/category/laptops', label: 'Laptops' },
    { href: '/product/macbook-pro', label: 'MacBook Pro', current: true }
  ];
  
  return (
    <div style={{ padding: '20px' }}>
      <nav aria-label="Breadcrumb">
        <ol style={{ 
          display: 'flex', 
          alignItems: 'center',
          listStyle: 'none', 
          padding: 0, 
          margin: 0,
          gap: '8px'
        }}>
          {breadcrumbs.map(({ href, label, current }, index) => (
            <li key={href} style={{ display: 'flex', alignItems: 'center' }}>
              {index > 0 && (
                <span style={{ margin: '0 8px', color: '#6b7280' }}>›</span>
              )}
              {current ? (
                <span style={{ color: '#6b7280', fontWeight: 'bold' }} aria-current="page">
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  variant="neutral"
                  size="sm"
                  underline="hover"
                  onClick={(e) => {
                    e.preventDefault();
                    action('breadcrumbClick')(href, label);
                  }}
                >
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};
BreadcrumbLinks.parameters = {
  docs: {
    description: {
      story: 'Breadcrumb navigation with proper semantic markup.'
    }
  }
};

// Card Links
export const CardLinks = () => {
  const cards = [
    {
      title: 'Getting Started',
      description: 'Learn the basics and set up your first project.',
      href: '/docs/getting-started',
      icon: '🚀'
    },
    {
      title: 'Components',
      description: 'Explore our comprehensive component library.',
      href: '/docs/components',
      icon: '🧱'
    },
    {
      title: 'Examples',
      description: 'See real-world examples and implementations.',
      href: '/docs/examples',
      icon: '💡'
    }
  ];
  
  return (
    <div style={{ padding: '20px' }}>
      <h3>Documentation Links</h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
        marginTop: '16px'
      }}>
        {cards.map(({ title, description, href, icon }) => (
          <Link
            key={href}
            href={href}
            underline="none"
            onClick={(e) => {
              e.preventDefault();
              action('cardClick')(href, title);
            }}
            style={{
              display: 'block',
              padding: '20px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              backgroundColor: 'white',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
              color: 'inherit'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>{icon}</div>
            <h4 style={{ margin: '0 0 8px 0', color: '#1f2937' }}>{title}</h4>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
CardLinks.parameters = {
  docs: {
    description: {
      story: 'Card-style links for featured content areas.'
    }
  }
};

// Link States Demo
export const LinkStates = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h3>Link States</h3>
      
      <div style={{ display: 'grid', gap: '24px', marginTop: '16px' }}>
        <div>
          <h4>Default State</h4>
          <Link href="#" onClick={(e) => e.preventDefault()}>Normal link</Link>
        </div>
        
        <div>
          <h4>Hover State</h4>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Hover over the link below</p>
          <Link href="#" onClick={(e) => e.preventDefault()}>Hover me</Link>
        </div>
        
        <div>
          <h4>Focus State</h4>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Tab to focus the link</p>
          <Link href="#" onClick={(e) => e.preventDefault()}>Focus me with Tab</Link>
        </div>
        
        <div>
          <h4>Active State</h4>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Click and hold</p>
          <Link href="#" onClick={(e) => e.preventDefault()}>Click and hold me</Link>
        </div>
        
        <div>
          <h4>Visited State</h4>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Browser-dependent</p>
          <Link href="#visited" onClick={(e) => e.preventDefault()}>Visited link</Link>
        </div>
        
        <div>
          <h4>Disabled State</h4>
          <Link href="#" disabled onClick={(e) => e.preventDefault()}>Disabled link</Link>
        </div>
      </div>
    </div>
  );
};
LinkStates.parameters = {
  docs: {
    description: {
      story: 'Demonstrates all possible link states and interactions.'
    }
  }
};

// Social Links
export const SocialLinks = () => {
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com', icon: '🐙' },
    { name: 'Twitter', href: 'https://twitter.com', icon: '🐦' },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: '💼' },
    { name: 'Discord', href: 'https://discord.com', icon: '💬' }
  ];
  
  return (
    <div style={{ padding: '20px' }}>
      <h3>Social Media Links</h3>
      
      <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
        {socialLinks.map(({ name, href, icon }) => (
          <Link
            key={name}
            href={href}
            external
            underline="none"
            onClick={(e) => {
              e.preventDefault();
              action('socialClick')(name, href);
            }}
            aria-label={`Visit our ${name} page`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              backgroundColor: 'white',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f8fafc';
              e.currentTarget.style.borderColor = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          >
            <span style={{ fontSize: '20px' }}>{icon}</span>
            <span>{name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
SocialLinks.parameters = {
  docs: {
    description: {
      story: 'Social media links with icons and hover effects.'
    }
  }
};

// Responsive Demo
export const ResponsiveDemo = () => {
  const [viewportSize, setViewportSize] = useState('desktop');
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <label>Viewport Size: </label>
        <select 
          value={viewportSize} 
          onChange={(e) => setViewportSize(e.target.value)}
        >
          <option value="mobile">Mobile</option>
          <option value="tablet">Tablet</option>
          <option value="desktop">Desktop</option>
        </select>
      </div>
      
      <div style={{ 
        width: viewportSize === 'mobile' ? '320px' : 
               viewportSize === 'tablet' ? '768px' : '100%',
        border: '1px dashed #ccc',
        padding: '16px'
      }}>
        <h4>Responsive Navigation</h4>
        <nav style={{ marginTop: '12px' }}>
          {viewportSize === 'mobile' ? (
            // Mobile: Stacked layout
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link href="#" size="sm" onClick={(e) => e.preventDefault()}>Home</Link>
              <Link href="#" size="sm" onClick={(e) => e.preventDefault()}>Products</Link>
              <Link href="#" size="sm" onClick={(e) => e.preventDefault()}>About</Link>
              <Link href="#" size="sm" onClick={(e) => e.preventDefault()}>Contact</Link>
            </div>
          ) : (
            // Tablet/Desktop: Horizontal layout
            <div style={{ display: 'flex', gap: viewportSize === 'tablet' ? '16px' : '24px' }}>
              <Link href="#" size={viewportSize === 'tablet' ? 'sm' : 'md'} onClick={(e) => e.preventDefault()}>Home</Link>
              <Link href="#" size={viewportSize === 'tablet' ? 'sm' : 'md'} onClick={(e) => e.preventDefault()}>Products</Link>
              <Link href="#" size={viewportSize === 'tablet' ? 'sm' : 'md'} onClick={(e) => e.preventDefault()}>About</Link>
              <Link href="#" size={viewportSize === 'tablet' ? 'sm' : 'md'} onClick={(e) => e.preventDefault()}>Contact</Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};
ResponsiveDemo.parameters = {
  docs: {
    description: {
      story: 'Demonstrates responsive link layouts across different viewport sizes.'
    }
  }
};

// Accessibility Demo
export const AccessibilityDemo = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h3>Accessibility Features</h3>
      
      <div style={{ display: 'grid', gap: '24px', marginTop: '16px' }}>
        <div>
          <h4>Descriptive Link Text</h4>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
            Good: Descriptive text that explains the destination
          </p>
          <Link href="#" onClick={(e) => e.preventDefault()}>
            Download the complete user guide (PDF, 2.3MB)
          </Link>
          
          <p style={{ fontSize: '14px', color: '#dc2626', marginTop: '12px', marginBottom: '8px' }}>
            Bad: Generic text that doesn't explain the purpose
          </p>
          <Link href="#" onClick={(e) => e.preventDefault()}>
            Click here
          </Link>
        </div>
        
        <div>
          <h4>External Link Indication</h4>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
            External links should be clearly marked and include security attributes
          </p>
          <Link 
            href="https://example.com" 
            external
            onClick={(e) => e.preventDefault()}
          >
            Visit Example.com (opens in new tab)
          </Link>
        </div>
        
        <div>
          <h4>Skip Links</h4>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
            Skip links help keyboard users navigate quickly
          </p>
          <Link 
            href="#main-content"
            style={{ 
              position: 'absolute',
              left: '-9999px',
              zIndex: 999
            }}
            onFocus={(e) => {
              e.target.style.position = 'static';
              e.target.style.left = 'auto';
            }}
            onBlur={(e) => {
              e.target.style.position = 'absolute';
              e.target.style.left = '-9999px';
            }}
            onClick={(e) => e.preventDefault()}
          >
            Skip to main content
          </Link>
          <p style={{ fontSize: '12px', fontStyle: 'italic', color: '#6b7280' }}>
            Press Tab to see the skip link
          </p>
        </div>
        
        <div>
          <h4>Download Links</h4>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
            File download links should indicate file type and size
          </p>
          <Link 
            href="#"
            onClick={(e) => e.preventDefault()}
            aria-describedby="download-description"
          >
            Annual Report 2023
          </Link>
          <div id="download-description" style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
            PDF document, 1.2 MB
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '32px', padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
        <h4>Accessibility Best Practices:</h4>
        <ul style={{ fontSize: '14px', color: '#1e40af', marginTop: '8px' }}>
          <li>Use descriptive link text that makes sense out of context</li>
          <li>Indicate external links and their behavior</li>
          <li>Provide skip links for keyboard navigation</li>
          <li>Include file type and size for downloads</li>
          <li>Ensure sufficient color contrast (4.5:1 minimum)</li>
          <li>Support keyboard navigation and focus indicators</li>
          <li>Use semantic HTML and ARIA attributes when needed</li>
        </ul>
      </div>
    </div>
  );
};
AccessibilityDemo.parameters = {
  docs: {
    description: {
      story: 'Demonstrates accessibility best practices for links.'
    }
  }
};
