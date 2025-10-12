import React from 'react';
import { DescriptionList } from '../../components/04-data-display-tables/DescriptionList/DescriptionList';
import { action } from '@storybook/addon-actions';

export default {
  title: 'DataDisplay/DescriptionList',
  component: DescriptionList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Semantic description list for displaying key-value pairs with flexible layouts.'
      }
    }
  }
};

export const Default = () => {
  const items = [
    { term: 'Name', description: 'John Doe' },
    { term: 'Email', description: 'john.doe@example.com' },
    { term: 'Phone', description: '+1 (555) 123-4567' },
    { term: 'Address', description: '123 Main St, Anytown, ST 12345' }
  ];
  
  return <DescriptionList items={items} />;
};

export const Horizontal = () => {
  const productInfo = [
    { term: 'Product Name', description: 'MacBook Pro 16"' },
    { term: 'SKU', description: 'MBP16-2023-001' },
    { term: 'Price', description: '$2,399.00' },
    { term: 'Availability', description: 'In Stock' },
    { term: 'Warranty', description: '1 Year Limited Warranty' },
    { term: 'Shipping', description: 'Free shipping on orders over $99' }
  ];
  
  return <DescriptionList items={productInfo} orientation="horizontal" />;
};

export const WithRichContent = () => {
  const userProfile = [
    {
      term: 'Profile Picture',
      description: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#3b82f6',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            JD
          </div>
          <div>
            <div style={{ fontWeight: 'bold' }}>John Doe</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Software Engineer</div>
          </div>
        </div>
      )
    },
    {
      term: 'Contact',
      description: (
        <div>
          <div style={{ marginBottom: '4px' }}>
            <strong>Email:</strong> <a href="mailto:john@example.com">john@example.com</a>
          </div>
          <div>
            <strong>Phone:</strong> <a href="tel:+15551234567">+1 (555) 123-4567</a>
          </div>
        </div>
      )
    },
    {
      term: 'Skills',
      description: (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {['React', 'TypeScript', 'Node.js', 'Python'].map(skill => (
            <span
              key={skill}
              style={{
                padding: '4px 8px',
                backgroundColor: '#e0f2fe',
                borderRadius: '12px',
                fontSize: '12px',
                color: '#0369a1'
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      )
    },
    {
      term: 'Status',
      description: (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 12px',
          backgroundColor: '#dcfce7',
          borderRadius: '16px',
          fontSize: '14px',
          color: '#166534'
        }}>
          <span style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%' }} />
          Active
        </span>
      )
    }
  ];
  
  return <DescriptionList items={userProfile} spacing="lg" />;
};

export const SystemInformation = () => {
  const systemInfo = [
    { term: 'Operating System', description: 'macOS Ventura 13.4' },
    { term: 'Processor', description: 'Apple M2 Pro (10-core CPU, 16-core GPU)' },
    { term: 'Memory', description: '16 GB Unified Memory' },
    { term: 'Storage', description: '512 GB SSD Storage' },
    { term: 'Graphics', description: '16-core GPU' },
    { term: 'Display', description: '16.2-inch Liquid Retina XDR display' },
    { term: 'Battery', description: 'Up to 22 hours video playback' },
    { term: 'Connectivity', description: 'Wi-Fi 6E, Bluetooth 5.3, Thunderbolt 4' }
  ];
  
  return (
    <div style={{ maxWidth: '600px' }}>
      <h3 style={{ marginBottom: '20px' }}>System Specifications</h3>
      <DescriptionList
        items={systemInfo}
        orientation="horizontal"
        variant="bordered"
      />
    </div>
  );
};

export const OrderDetails = () => {
  const orderInfo = [
    { term: 'Order Number', description: '#ORD-2023-001234' },
    { term: 'Order Date', description: 'June 15, 2023 at 2:30 PM' },
    {
      term: 'Customer',
      description: (
        <div>
          <div>Sarah Johnson</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>sarah.johnson@email.com</div>
        </div>
      )
    },
    {
      term: 'Shipping Address',
      description: (
        <div>
          <div>456 Oak Avenue</div>
          <div>Suite 789</div>
          <div>San Francisco, CA 94102</div>
          <div>United States</div>
        </div>
      )
    },
    {
      term: 'Items',
      description: (
        <div>
          <div style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>MacBook Pro 16" (Space Gray)</span>
              <span>1x $2,399.00</span>
            </div>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Magic Mouse</span>
              <span>1x $79.00</span>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '8px', fontWeight: 'bold' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total</span>
              <span>$2,478.00</span>
            </div>
          </div>
        </div>
      )
    },
    {
      term: 'Payment Method',
      description: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>💳</span>
          <span>Visa ending in 4567</span>
        </div>
      )
    },
    {
      term: 'Status',
      description: (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 12px',
          backgroundColor: '#fef3c7',
          borderRadius: '16px',
          fontSize: '14px',
          color: '#92400e'
        }}>
          <span style={{ width: '8px', height: '8px', backgroundColor: '#f59e0b', borderRadius: '50%' }} />
          Processing
        </span>
      )
    }
  ];
  
  return (
    <div style={{ maxWidth: '700px' }}>
      <h3 style={{ marginBottom: '20px' }}>Order Details</h3>
      <DescriptionList items={orderInfo} spacing="lg" />;
    </div>
  );
};

export const APIEndpoint = () => {
  const apiInfo = [
    { term: 'Endpoint', description: '/api/v1/users/{id}' },
    { term: 'Method', description: 'GET' },
    {
      term: 'Description',
      description: 'Retrieve detailed information about a specific user by their ID'
    },
    {
      term: 'Parameters',
      description: (
        <div>
          <div style={{ marginBottom: '8px' }}>
            <code style={{ backgroundColor: '#f3f4f6', padding: '2px 4px', borderRadius: '4px' }}>id</code>
            <span style={{ marginLeft: '8px', fontSize: '14px', color: '#6b7280' }}>(required) User ID</span>
          </div>
        </div>
      )
    },
    {
      term: 'Response',
      description: (
        <pre style={{
          backgroundColor: '#f8fafc',
          padding: '12px',
          borderRadius: '6px',
          fontSize: '12px',
          overflow: 'auto',
          margin: 0
        }}>
{`{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2023-01-15T10:30:00Z"
}`}
        </pre>
      )
    },
    {
      term: 'Status Codes',
      description: (
        <div>
          <div style={{ marginBottom: '4px' }}>
            <span style={{ fontWeight: 'bold', color: '#059669' }}>200</span>
            <span style={{ marginLeft: '8px' }}>Success</span>
          </div>
          <div style={{ marginBottom: '4px' }}>
            <span style={{ fontWeight: 'bold', color: '#dc2626' }}>404</span>
            <span style={{ marginLeft: '8px' }}>User not found</span>
          </div>
          <div>
            <span style={{ fontWeight: 'bold', color: '#dc2626' }}>500</span>
            <span style={{ marginLeft: '8px' }}>Internal server error</span>
          </div>
        </div>
      )
    }
  ];
  
  return (
    <div style={{ maxWidth: '800px' }}>
      <h3 style={{ marginBottom: '20px' }}>API Documentation</h3>
      <DescriptionList items={apiInfo} orientation="horizontal" />;
    </div>
  );
};

export const ResponsiveLayout = () => {
  const deviceInfo = [
    { term: 'Device Model', description: 'iPhone 14 Pro' },
    { term: 'Screen Size', description: '6.1 inches' },
    { term: 'Resolution', description: '2556 x 1179 pixels' },
    { term: 'Storage', description: '256 GB' },
    { term: 'Camera', description: '48MP Main, 12MP Ultra Wide, 12MP Telephoto' },
    { term: 'Battery Life', description: 'Up to 23 hours video playback' }
  ];
  
  return (
    <div>
      <h3 style={{ marginBottom: '20px' }}>Device Specifications</h3>
      <DescriptionList
        items={deviceInfo}
        responsive
        breakpoint="md"
      />
      <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px', fontSize: '14px' }}>
        <strong>Note:</strong> This layout automatically switches between horizontal and vertical 
        orientations based on screen size. Resize your browser to see the effect.
      </div>
    </div>
  );
};
