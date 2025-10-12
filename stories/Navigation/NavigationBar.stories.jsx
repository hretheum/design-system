import React, { useState } from 'react';
import { NavigationBar } from '../../components/03-navigation-wayfinding/NavigationBar/NavigationBar';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Navigation/NavigationBar',
  component: NavigationBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Main navigation bar with responsive design, dropdowns, and accessibility features.'
      }
    }
  }
};

export const Default = () => {
  const [activeItem, setActiveItem] = useState('home');
  
  const navigationItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'products', label: 'Products', href: '/products' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ];
  
  return (
    <NavigationBar
      brand="Company"
      items={navigationItems}
      activeItem={activeItem}
      onItemClick={(id) => {
        setActiveItem(id);
        action('navigate')(id);
      }}
    />
  );
};

export const WithDropdowns = () => {
  const [activeItem, setActiveItem] = useState('home');
  
  const navigationItems = [
    { id: 'home', label: 'Home', href: '/' },
    {
      id: 'products',
      label: 'Products',
      dropdown: [
        { id: 'web-apps', label: 'Web Applications' },
        { id: 'mobile-apps', label: 'Mobile Apps' },
        { id: 'apis', label: 'APIs' }
      ]
    },
    {
      id: 'solutions',
      label: 'Solutions',
      dropdown: [
        { id: 'enterprise', label: 'Enterprise' },
        { id: 'small-business', label: 'Small Business' },
        { id: 'developers', label: 'Developers' }
      ]
    },
    { id: 'pricing', label: 'Pricing', href: '/pricing' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ];
  
  return (
    <NavigationBar
      brand="TechCorp"
      items={navigationItems}
      activeItem={activeItem}
      onItemClick={setActiveItem}
      userMenu={[
        { id: 'profile', label: 'Profile' },
        { id: 'settings', label: 'Settings' },
        { id: 'logout', label: 'Sign Out' }
      ]}
      userName="John Doe"
    />
  );
};

export const Mobile = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div style={{ width: '375px', border: '1px solid #e5e7eb' }}>
      <NavigationBar
        brand="MobileApp"
        items={[
          { id: 'home', label: 'Home' },
          { id: 'discover', label: 'Discover' },
          { id: 'favorites', label: 'Favorites' },
          { id: 'profile', label: 'Profile' }
        ]}
        variant="mobile"
        mobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={setIsMobileMenuOpen}
      />
    </div>
  );
};
