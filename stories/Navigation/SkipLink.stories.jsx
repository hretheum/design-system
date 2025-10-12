import React from 'react';
import { SkipLink } from '../../components/03-navigation-wayfinding/SkipLink/SkipLink';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Navigation/SkipLink',
  component: SkipLink,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Accessibility skip link for keyboard navigation to main content areas.'
      }
    }
  }
};

export const Default = () => (
  <div>
    <SkipLink href="#main-content" onClick={action('skipToMain')}>
      Skip to main content
    </SkipLink>
    
    <nav style={{ padding: '16px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
      <p>Navigation area (press Tab to see skip link)</p>
    </nav>
    
    <main id="main-content" style={{ padding: '24px' }}>
      <h1>Main Content</h1>
      <p>This is the main content area that users can skip to.</p>
    </main>
  </div>
);

export const MultipleSkipLinks = () => (
  <div>
    <SkipLink href="#main-content">Skip to main content</SkipLink>
    <SkipLink href="#navigation">Skip to navigation</SkipLink>
    <SkipLink href="#footer">Skip to footer</SkipLink>
    
    <header style={{ padding: '16px', backgroundColor: '#1f2937', color: 'white' }}>
      <h1>Site Header</h1>
    </header>
    
    <nav id="navigation" style={{ padding: '16px', backgroundColor: '#f8fafc' }}>
      <h2>Navigation</h2>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
    
    <main id="main-content" style={{ padding: '24px', minHeight: '400px' }}>
      <h1>Main Content</h1>
      <p>Press Tab repeatedly to navigate through skip links.</p>
    </main>
    
    <footer id="footer" style={{ padding: '16px', backgroundColor: '#f3f4f6' }}>
      <p>Footer content</p>
    </footer>
  </div>
);

export const AccessibilityDemo = () => (
  <div>
    <div style={{ padding: '16px', backgroundColor: '#e0f2fe', border: '1px solid #0284c7', borderRadius: '8px', marginBottom: '16px' }}>
      <h3>Accessibility Instructions</h3>
      <p><strong>To test skip links:</strong></p>
      <ol>
        <li>Click in this story area to focus it</li>
        <li>Press Tab to navigate through focusable elements</li>
        <li>Skip links will appear when focused</li>
        <li>Press Enter on a skip link to jump to that section</li>
      </ol>
    </div>
    
    <SkipLink href="#content1">Skip to Section 1</SkipLink>
    <SkipLink href="#content2">Skip to Section 2</SkipLink>
    <SkipLink href="#content3">Skip to Section 3</SkipLink>
    
    <div style={{ padding: '16px', backgroundColor: '#f8fafc', marginBottom: '16px' }}>
      <p>Some content before the sections...</p>
      <button>Focusable Button 1</button>
      <button>Focusable Button 2</button>
    </div>
    
    <section id="content1" style={{ padding: '16px', marginBottom: '16px', backgroundColor: '#fef3c7', borderRadius: '8px' }}>
      <h2>Section 1</h2>
      <p>This is the first section content.</p>
    </section>
    
    <section id="content2" style={{ padding: '16px', marginBottom: '16px', backgroundColor: '#dbeafe', borderRadius: '8px' }}>
      <h2>Section 2</h2>
      <p>This is the second section content.</p>
    </section>
    
    <section id="content3" style={{ padding: '16px', backgroundColor: '#dcfce7', borderRadius: '8px' }}>
      <h2>Section 3</h2>
      <p>This is the third section content.</p>
    </section>
  </div>
);
