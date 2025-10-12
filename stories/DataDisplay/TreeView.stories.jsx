import React, { useState } from 'react';
import { TreeView } from '../../components/04-data-display-tables/TreeView/TreeView';
import { action } from '@storybook/addon-actions';

export default {
  title: 'DataDisplay/TreeView',
  component: TreeView,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Hierarchical tree view with expand/collapse, selection, and keyboard navigation.'
      }
    }
  }
};

export const Default = () => {
  const [expandedNodes, setExpandedNodes] = useState(['root', 'folder1']);
  const [selectedNode, setSelectedNode] = useState(null);
  
  const treeData = {
    id: 'root',
    label: 'Documents',
    icon: '📁',
    children: [
      {
        id: 'folder1',
        label: 'Projects',
        icon: '📁',
        children: [
          { id: 'file1', label: 'Project A.doc', icon: '📄' },
          { id: 'file2', label: 'Project B.pdf', icon: '📋' }
        ]
      },
      {
        id: 'folder2',
        label: 'Images',
        icon: '📁',
        children: [
          { id: 'img1', label: 'photo1.jpg', icon: '🇫️' },
          { id: 'img2', label: 'photo2.png', icon: '🇫️' }
        ]
      },
      { id: 'file3', label: 'readme.txt', icon: '📄' }
    ]
  };
  
  return (
    <TreeView
      data={treeData}
      expandedNodes={expandedNodes}
      selectedNode={selectedNode}
      onNodeExpand={setExpandedNodes}
      onNodeSelect={setSelectedNode}
      onNodeClick={action('nodeClick')}
    />
  );
};

export const OrganizationChart = () => {
  const [expandedNodes, setExpandedNodes] = useState(['ceo', 'engineering', 'sales']);
  
  const orgData = {
    id: 'ceo',
    label: 'CEO - John Smith',
    icon: '👑',
    children: [
      {
        id: 'engineering',
        label: 'Engineering - Jane Doe',
        icon: '👷',
        children: [
          { id: 'frontend', label: 'Frontend Team (5)', icon: '💻' },
          { id: 'backend', label: 'Backend Team (8)', icon: '⚙️' },
          { id: 'mobile', label: 'Mobile Team (3)', icon: '📱' }
        ]
      },
      {
        id: 'sales',
        label: 'Sales - Bob Johnson',
        icon: '📈',
        children: [
          { id: 'inside-sales', label: 'Inside Sales (4)', icon: '📞' },
          { id: 'field-sales', label: 'Field Sales (6)', icon: '🚗' }
        ]
      },
      {
        id: 'marketing',
        label: 'Marketing - Alice Wilson',
        icon: '📢',
        children: [
          { id: 'digital', label: 'Digital Marketing (3)', icon: '📱' },
          { id: 'content', label: 'Content Team (2)', icon: '✍️' }
        ]
      }
    ]
  };
  
  return (
    <TreeView
      data={orgData}
      expandedNodes={expandedNodes}
      onNodeExpand={setExpandedNodes}
      onNodeClick={action('orgNodeClick')}
      variant="organization"
    />
  );
};

export const FileSystem = () => {
  const [expandedNodes, setExpandedNodes] = useState(['src']);
  const [selectedNodes, setSelectedNodes] = useState([]);
  
  const fileSystemData = {
    id: 'project',
    label: 'my-app',
    icon: '📁',
    children: [
      {
        id: 'src',
        label: 'src',
        icon: '📁',
        children: [
          {
            id: 'components',
            label: 'components',
            icon: '📁',
            children: [
              { id: 'Button.jsx', label: 'Button.jsx', icon: '⚛️' },
              { id: 'Card.jsx', label: 'Card.jsx', icon: '⚛️' }
            ]
          },
          { id: 'App.jsx', label: 'App.jsx', icon: '⚛️' },
          { id: 'index.js', label: 'index.js', icon: '🐸' }
        ]
      },
      {
        id: 'public',
        label: 'public',
        icon: '📁',
        children: [
          { id: 'index.html', label: 'index.html', icon: '🌐' },
          { id: 'favicon.ico', label: 'favicon.ico', icon: '🇫️' }
        ]
      },
      { id: 'package.json', label: 'package.json', icon: '📦' },
      { id: 'README.md', label: 'README.md', icon: '📄' }
    ]
  };
  
  return (
    <TreeView
      data={fileSystemData}
      expandedNodes={expandedNodes}
      selectedNodes={selectedNodes}
      onNodeExpand={setExpandedNodes}
      onNodeSelect={setSelectedNodes}
      multiSelect
      showCheckboxes
      onNodeClick={action('fileClick')}
    />
  );
};

export const WithSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedNodes, setExpandedNodes] = useState([]);
  
  const libraryData = {
    id: 'library',
    label: 'Library Catalog',
    icon: '📚',
    children: [
      {
        id: 'fiction',
        label: 'Fiction',
        icon: '📁',
        children: [
          { id: 'book1', label: 'To Kill a Mockingbird', icon: '📖', author: 'Harper Lee' },
          { id: 'book2', label: '1984', icon: '📖', author: 'George Orwell' },
          { id: 'book3', label: 'Pride and Prejudice', icon: '📖', author: 'Jane Austen' }
        ]
      },
      {
        id: 'nonfiction',
        label: 'Non-Fiction',
        icon: '📁',
        children: [
          { id: 'book4', label: 'Sapiens', icon: '📖', author: 'Yuval Noah Harari' },
          { id: 'book5', label: 'Educated', icon: '📖', author: 'Tara Westover' }
        ]
      },
      {
        id: 'science',
        label: 'Science',
        icon: '📁',
        children: [
          { id: 'book6', label: 'A Brief History of Time', icon: '📖', author: 'Stephen Hawking' },
          { id: 'book7', label: 'The Selfish Gene', icon: '📖', author: 'Richard Dawkins' }
        ]
      }
    ]
  };
  
  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px'
          }}
        />
      </div>
      
      <TreeView
        data={libraryData}
        expandedNodes={expandedNodes}
        onNodeExpand={setExpandedNodes}
        searchTerm={searchTerm}
        renderNode={(node) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{node.icon}</span>
            <span>{node.label}</span>
            {node.author && (
              <span style={{ fontSize: '12px', color: '#6b7280' }}>by {node.author}</span>
            )}
          </div>
        )}
        onNodeClick={action('bookClick')}
      />
    </div>
  );
};

export const LazyLoading = () => {
  const [expandedNodes, setExpandedNodes] = useState([]);
  const [loadingNodes, setLoadingNodes] = useState([]);
  
  const generateChildren = (parentId, count = 5) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `${parentId}-child-${i + 1}`,
      label: `Item ${i + 1}`,
      icon: '📄',
      hasChildren: Math.random() > 0.7
    }));
  };
  
  const rootData = {
    id: 'root',
    label: 'Dynamic Tree',
    icon: '📁',
    hasChildren: true
  };
  
  const handleNodeExpand = async (nodeId) => {
    if (!expandedNodes.includes(nodeId)) {
      setLoadingNodes(prev => [...prev, nodeId]);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setExpandedNodes(prev => [...prev, nodeId]);
      setLoadingNodes(prev => prev.filter(id => id !== nodeId));
      
      action('lazyLoad')(nodeId);
    }
  };
  
  return (
    <TreeView
      data={rootData}
      expandedNodes={expandedNodes}
      loadingNodes={loadingNodes}
      onNodeExpand={handleNodeExpand}
      lazyLoad
      generateChildren={generateChildren}
      onNodeClick={action('lazyNodeClick')}
    />
  );
};
