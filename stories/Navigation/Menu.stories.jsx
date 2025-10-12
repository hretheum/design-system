import React, { useState } from 'react';
import { Menu } from '../../components/03-navigation-wayfinding/Menu/Menu';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Navigation/Menu',
  component: Menu,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Flexible menu component with keyboard navigation, icons, and separators.'
      }
    }
  }
};

export const Default = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  
  const menuItems = [
    { id: 'new', label: 'New File', icon: '📄', shortcut: 'Ctrl+N' },
    { id: 'open', label: 'Open', icon: '📁', shortcut: 'Ctrl+O' },
    { id: 'save', label: 'Save', icon: '💾', shortcut: 'Ctrl+S' },
    { type: 'separator' },
    { id: 'print', label: 'Print', icon: '🖨️', shortcut: 'Ctrl+P' },
    { type: 'separator' },
    { id: 'exit', label: 'Exit', shortcut: 'Alt+F4' }
  ];
  
  return (
    <Menu
      items={menuItems}
      selectedItem={selectedItem}
      onItemSelect={(item) => {
        setSelectedItem(item.id);
        action('menuSelect')(item);
      }}
    />
  );
};

export const ContextMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const contextItems = [
    { id: 'cut', label: 'Cut', icon: '✂️', shortcut: 'Ctrl+X' },
    { id: 'copy', label: 'Copy', icon: '📋', shortcut: 'Ctrl+C' },
    { id: 'paste', label: 'Paste', icon: '📎', shortcut: 'Ctrl+V' },
    { type: 'separator' },
    { id: 'select-all', label: 'Select All', shortcut: 'Ctrl+A' },
    { type: 'separator' },
    { id: 'properties', label: 'Properties' }
  ];
  
  return (
    <div
      style={{
        width: '400px',
        height: '300px',
        backgroundColor: '#f8fafc',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: 'context-menu'
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setPosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
      }}
      onClick={() => setIsVisible(false)}
    >
      Right-click anywhere to show context menu
      
      {isVisible && (
        <Menu
          items={contextItems}
          position={position}
          onItemSelect={(item) => {
            action('contextMenuSelect')(item);
            setIsVisible(false);
          }}
          onClose={() => setIsVisible(false)}
        />
      )}
    </div>
  );
};

export const NestedMenu = () => {
  const menuItems = [
    { id: 'file', label: 'File' },
    {
      id: 'edit',
      label: 'Edit',
      submenu: [
        { id: 'undo', label: 'Undo', shortcut: 'Ctrl+Z' },
        { id: 'redo', label: 'Redo', shortcut: 'Ctrl+Y' },
        { type: 'separator' },
        { id: 'cut', label: 'Cut', shortcut: 'Ctrl+X' },
        { id: 'copy', label: 'Copy', shortcut: 'Ctrl+C' },
        { id: 'paste', label: 'Paste', shortcut: 'Ctrl+V' }
      ]
    },
    {
      id: 'view',
      label: 'View',
      submenu: [
        { id: 'zoom-in', label: 'Zoom In', shortcut: 'Ctrl++' },
        { id: 'zoom-out', label: 'Zoom Out', shortcut: 'Ctrl+-' },
        { id: 'reset-zoom', label: 'Reset Zoom', shortcut: 'Ctrl+0' },
        { type: 'separator' },
        { id: 'fullscreen', label: 'Full Screen', shortcut: 'F11' }
      ]
    },
    { id: 'help', label: 'Help' }
  ];
  
  return (
    <Menu
      items={menuItems}
      variant="horizontal"
      onItemSelect={action('nestedMenuSelect')}
    />
  );
};

export const IconMenu = () => {
  const iconItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'favorites', label: 'Favorites', icon: '❤️' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { type: 'separator' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'logout', label: 'Logout', icon: '🚪' }
  ];
  
  return (
    <Menu
      items={iconItems}
      showIcons={true}
      onItemSelect={action('iconMenuSelect')}
    />
  );
};
