import React, { useState } from 'react';
import { Sidebar } from '../../components/03-navigation-wayfinding/Sidebar/Sidebar';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Collapsible sidebar navigation with nested items and responsive behavior.'
      }
    }
  }
};

export const Default = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📈', href: '/dashboard' },
    { id: 'users', label: 'Users', icon: '👥', href: '/users' },
    { id: 'products', label: 'Products', icon: '💾', href: '/products' },
    { id: 'orders', label: 'Orders', icon: '📄', href: '/orders' },
    { id: 'settings', label: 'Settings', icon: '⚙️', href: '/settings' }
  ];
  
  return (
    <div style={{ display: 'flex', height: '600px' }}>
      <Sidebar
        items={menuItems}
        activeItem={activeItem}
        collapsed={collapsed}
        onItemClick={setActiveItem}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />
      <div style={{ flex: 1, padding: '24px', backgroundColor: '#f8fafc' }}>
        <h2>Main Content Area</h2>
        <p>Active page: <strong>{activeItem}</strong></p>
      </div>
    </div>
  );
};

export const WithNestedItems = () => {
  const [activeItem, setActiveItem] = useState('overview');
  const [expandedSections, setExpandedSections] = useState(['analytics']);
  
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: '📈',
      children: [
        { id: 'traffic', label: 'Traffic' },
        { id: 'conversions', label: 'Conversions' },
        { id: 'revenue', label: 'Revenue' }
      ]
    },
    {
      id: 'content',
      label: 'Content',
      icon: '📝',
      children: [
        { id: 'posts', label: 'Posts' },
        { id: 'pages', label: 'Pages' },
        { id: 'media', label: 'Media' }
      ]
    },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];
  
  return (
    <div style={{ display: 'flex', height: '600px' }}>
      <Sidebar
        items={menuItems}
        activeItem={activeItem}
        expandedSections={expandedSections}
        onItemClick={setActiveItem}
        onSectionToggle={(sectionId) => {
          setExpandedSections(prev => 
            prev.includes(sectionId)
              ? prev.filter(id => id !== sectionId)
              : [...prev, sectionId]
          );
        }}
      />
      <div style={{ flex: 1, padding: '24px', backgroundColor: '#f8fafc' }}>
        <h2>Content Management</h2>
        <p>Active section: <strong>{activeItem}</strong></p>
      </div>
    </div>
  );
};

export const Collapsed = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  
  return (
    <div style={{ display: 'flex', height: '600px' }}>
      <Sidebar
        items={[
          { id: 'dashboard', label: 'Dashboard', icon: '📈' },
          { id: 'users', label: 'Users', icon: '👥' },
          { id: 'products', label: 'Products', icon: '💾' },
          { id: 'orders', label: 'Orders', icon: '📄' }
        ]}
        activeItem={activeItem}
        collapsed={true}
        onItemClick={setActiveItem}
      />
      <div style={{ flex: 1, padding: '24px', backgroundColor: '#f8fafc' }}>
        <h2>Collapsed Sidebar Demo</h2>
        <p>Hover over sidebar items to see tooltips</p>
      </div>
    </div>
  );
};
