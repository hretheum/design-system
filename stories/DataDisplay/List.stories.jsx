import React, { useState } from 'react';
import { List } from '../../components/04-data-display-tables/List/List';
import { action } from '@storybook/addon-actions';

export default {
  title: 'DataDisplay/List',
  component: List,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Flexible list component with various layouts, selection, and interactive features.'
      }
    }
  }
};

export const Default = () => {
  const items = [
    { id: 1, title: 'First Item', description: 'This is the first item in the list' },
    { id: 2, title: 'Second Item', description: 'This is the second item in the list' },
    { id: 3, title: 'Third Item', description: 'This is the third item in the list' }
  ];
  
  return (
    <List
      items={items}
      renderItem={(item) => (
        <div>
          <h4>{item.title}</h4>
          <p>{item.description}</p>
        </div>
      )}
      onItemClick={action('itemClick')}
    />
  );
};

export const WithSelection = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  
  const items = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
    { id: 3, name: 'Carol Davis', email: 'carol@example.com', role: 'Editor' },
    { id: 4, name: 'David Wilson', email: 'david@example.com', role: 'User' }
  ];
  
  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <strong>Selected: {selectedItems.length} items</strong>
      </div>
      <List
        items={items}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
        renderItem={(item) => (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0 }}>{item.name}</h4>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>{item.email}</p>
            </div>
            <span style={{ 
              padding: '4px 8px', 
              backgroundColor: item.role === 'Admin' ? '#dbeafe' : '#f3f4f6',
              borderRadius: '12px',
              fontSize: '12px'
            }}>
              {item.role}
            </span>
          </div>
        )}
      />
    </div>
  );
};

export const CardLayout = () => {
  const products = [
    { id: 1, name: 'MacBook Pro', price: '$1,299', category: 'Laptops', image: '💻' },
    { id: 2, name: 'iPhone 14', price: '$799', category: 'Phones', image: '📱' },
    { id: 3, name: 'iPad Air', price: '$599', category: 'Tablets', image: '📱' },
    { id: 4, name: 'Apple Watch', price: '$399', category: 'Wearables', image: '⌚' }
  ];
  
  return (
    <List
      items={products}
      variant="grid"
      columns={2}
      renderItem={(item) => (
        <div style={{
          padding: '16px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: 'white',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>{item.image}</div>
          <h3 style={{ margin: '0 0 4px 0' }}>{item.name}</h3>
          <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontSize: '14px' }}>{item.category}</p>
          <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#059669' }}>{item.price}</p>
        </div>
      )}
      onItemClick={action('productClick')}
    />
  );
};

export const WithActions = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New message', description: 'You have received a new message from John', time: '2 minutes ago', unread: true },
    { id: 2, title: 'System update', description: 'System maintenance scheduled for tonight', time: '1 hour ago', unread: true },
    { id: 3, title: 'Payment received', description: 'Payment of $100 has been processed', time: '3 hours ago', unread: false },
    { id: 4, title: 'Welcome!', description: 'Welcome to our platform', time: '1 day ago', unread: false }
  ]);
  
  const markAsRead = (id) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, unread: false } : notif
    ));
  };
  
  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };
  
  return (
    <List
      items={notifications}
      renderItem={(item) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h4 style={{ margin: 0 }}>{item.title}</h4>
              {item.unread && (
                <span style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#3b82f6',
                  borderRadius: '50%'
                }} />
              )}
            </div>
            <p style={{ margin: '4px 0', color: '#6b7280' }}>{item.description}</p>
            <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>{item.time}</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {item.unread && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  markAsRead(item.id);
                }}
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Mark Read
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNotification(item.id);
              }}
              style={{
                padding: '4px 8px',
                fontSize: '12px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    />
  );
};

export const VirtualizedList = () => {
  const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `This is the description for item ${i + 1}`,
    value: Math.floor(Math.random() * 1000)
  }));
  
  return (
    <div style={{ height: '400px' }}>
      <List
        items={items}
        virtualized
        itemHeight={80}
        renderItem={(item) => (
          <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
            <h4 style={{ margin: '0 0 4px 0' }}>{item.title}</h4>
            <p style={{ margin: '0 0 4px 0', color: '#6b7280' }}>{item.description}</p>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Value: {item.value}</p>
          </div>
        )}
        onItemClick={action('virtualizedItemClick')}
      />
    </div>
  );
};
