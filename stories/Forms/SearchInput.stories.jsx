import React, { useState, useEffect } from 'react';
import { SearchInput } from '../../components/02-forms-inputs/SearchInput/SearchInput';
import { action } from '@storybook/addon-actions';
import { within, userEvent, expect, waitFor } from '@storybook/test';

export default {
  title: 'Forms/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Accessible search input with autocomplete, debouncing, keyboard navigation, and customizable suggestions.'
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
    value: {
      control: 'text',
      description: 'Controlled input value'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the search input'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state'
    },
    showClearButton: {
      control: 'boolean',
      description: 'Show clear button when input has value'
    },
    showSuggestions: {
      control: 'boolean',
      description: 'Enable autocomplete suggestions'
    },
    debounceMs: {
      control: 'number',
      description: 'Debounce delay in milliseconds'
    },
    maxSuggestions: {
      control: 'number',
      description: 'Maximum number of suggestions to show'
    },
    variant: {
      control: 'select',
      options: ['default', 'contained', 'minimal'],
      description: 'Visual variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the component'
    }
  }
};

const Template = (args) => {
  const [query, setQuery] = useState(args.value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Mock search function
  const mockSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }
    
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const mockData = [
      'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry',
      'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon',
      'Mango', 'Orange', 'Papaya', 'Quince', 'Raspberry'
    ];
    
    const filtered = mockData.filter(item => 
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSuggestions(filtered);
    setLoading(false);
    action('onSearch')(searchTerm, filtered);
  };
  
  const handleChange = (value) => {
    setQuery(value);
    action('onChange')(value);
  };
  
  const handleSearch = (searchTerm) => {
    mockSearch(searchTerm);
    action('onSearch')(searchTerm);
  };
  
  const handleSuggestionSelect = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    action('onSuggestionSelect')(suggestion);
  };
  
  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    action('onClear')();
  };

  return (
    <div style={{ padding: '20px', minHeight: '200px' }}>
      <SearchInput
        {...args}
        value={query}
        onChange={handleChange}
        onSearch={handleSearch}
        onSuggestionSelect={handleSuggestionSelect}
        onClear={handleClear}
        suggestions={suggestions}
        loading={loading}
      />
      
      {query && (
        <p style={{ marginTop: '16px', color: '#6b7280' }}>
          Searching for: "{query}"
        </p>
      )}
    </div>
  );
};

// Default Search Input
export const Default = Template.bind({});
Default.args = {
  placeholder: 'Search fruits...',
  showSuggestions: true,
  showClearButton: true,
  debounceMs: 300
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const searchInput = canvas.getByRole('searchbox');
  
  // Test accessibility
  await expect(searchInput).toBeInTheDocument();
  await expect(searchInput).toHaveAttribute('aria-label');
  
  // Test typing
  await userEvent.type(searchInput, 'app');
  
  // Wait for debounce and suggestions
  await waitFor(() => {
    expect(searchInput).toHaveValue('app');
  });
};

// With Icons
export const WithIcons = Template.bind({});
WithIcons.args = {
  placeholder: 'Search with icons...',
  showSuggestions: true,
  showClearButton: true,
  leftIcon: '🔍',
  rightIcon: '⚙️'
};
WithIcons.parameters = {
  docs: {
    description: {
      story: 'Search input with custom left and right icons.'
    }
  }
};

// Minimal Variant
export const Minimal = Template.bind({});
Minimal.args = {
  placeholder: 'Minimal search...',
  variant: 'minimal',
  showSuggestions: false,
  showClearButton: true
};

// Contained Variant
export const Contained = Template.bind({});
Contained.args = {
  placeholder: 'Contained search...',
  variant: 'contained',
  size: 'lg',
  showSuggestions: true
};

// Loading State
export const LoadingState = Template.bind({});
LoadingState.args = {
  placeholder: 'Search with loading...',
  loading: true,
  value: 'searching...',
  showSuggestions: true
};

// Disabled State
export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'Disabled search...',
  disabled: true,
  value: 'Cannot edit'
};
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const searchInput = canvas.getByRole('searchbox');
  
  // Test disabled state
  await expect(searchInput).toBeDisabled();
  await expect(searchInput).toHaveAttribute('aria-disabled', 'true');
};

// Large Size
export const Large = Template.bind({});
Large.args = {
  placeholder: 'Large search input...',
  size: 'lg',
  showSuggestions: true,
  showClearButton: true
};

// Small Size
export const Small = Template.bind({});
Small.args = {
  placeholder: 'Small search...',
  size: 'sm',
  showSuggestions: true
};

// Advanced Search Demo
export const AdvancedSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState(['apple', 'banana', 'cherry']);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    sortBy: 'relevance'
  });
  
  const mockData = {
    fruits: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'],
    vegetables: ['Artichoke', 'Broccoli', 'Carrot', 'Spinach'],
    grains: ['Barley', 'Oats', 'Quinoa', 'Rice']
  };
  
  const performSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSuggestions(searchHistory.slice(0, 3));
      return;
    }
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 400));
    
    let searchData = [];
    if (filters.category === 'all') {
      searchData = Object.values(mockData).flat();
    } else {
      searchData = mockData[filters.category] || [];
    }
    
    const filtered = searchData.filter(item => 
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSuggestions(filtered.slice(0, 5));
    setLoading(false);
  };
  
  const handleSearch = (searchTerm) => {
    performSearch(searchTerm);
    if (searchTerm && !searchHistory.includes(searchTerm)) {
      setSearchHistory(prev => [searchTerm, ...prev.slice(0, 4)]);
    }
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h3>Advanced Search</h3>
      
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'center' }}>
        <select 
          value={filters.category} 
          onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
        >
          <option value="all">All Categories</option>
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
          <option value="grains">Grains</option>
        </select>
        
        <select 
          value={filters.sortBy} 
          onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
          style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
        >
          <option value="relevance">Relevance</option>
          <option value="alphabetical">A-Z</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>
      
      <SearchInput
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
        onSuggestionSelect={setQuery}
        suggestions={suggestions}
        loading={loading}
        placeholder="Search products..."
        showSuggestions={true}
        showClearButton={true}
        size="lg"
        aria-label="Product search with filters"
      />
      
      {searchHistory.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <h4 style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Recent Searches:</h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {searchHistory.map((term, index) => (
              <button
                key={index}
                onClick={() => setQuery(term)}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#f3f4f6',
                  border: '1px solid #d1d5db',
                  borderRadius: '12px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
AdvancedSearch.parameters = {
  docs: {
    description: {
      story: 'Advanced search with filters, search history, and categorized results.'
    }
  }
};

// Real-time Search Demo
export const RealTimeSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const searchDatabase = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const mockResults = [
      { id: 1, title: 'Apple MacBook Pro', category: 'Electronics', price: '$1299' },
      { id: 2, title: 'Apple iPhone 14', category: 'Electronics', price: '$799' },
      { id: 3, title: 'Apple Watch Series 8', category: 'Electronics', price: '$399' },
      { id: 4, title: 'Green Apple (Organic)', category: 'Food', price: '$2.99/lb' },
      { id: 5, title: 'Apple Juice', category: 'Beverages', price: '$3.49' }
    ].filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setResults(mockResults);
    setLoading(false);
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h3>Real-time Search Results</h3>
      
      <SearchInput
        value={query}
        onChange={setQuery}
        onSearch={searchDatabase}
        placeholder="Search products in real-time..."
        loading={loading}
        showClearButton={true}
        debounceMs={200}
        aria-label="Real-time product search"
      />
      
      {results.length > 0 && (
        <div style={{ marginTop: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
          <div style={{ padding: '12px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            <strong>Search Results ({results.length})</strong>
          </div>
          {results.map(result => (
            <div key={result.id} style={{ 
              padding: '12px', 
              borderBottom: '1px solid #f3f4f6',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>{result.title}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{result.category}</div>
              </div>
              <div style={{ fontWeight: 'bold', color: '#059669' }}>{result.price}</div>
            </div>
          ))}
        </div>
      )}
      
      {query && results.length === 0 && !loading && (
        <div style={{ 
          marginTop: '16px', 
          padding: '16px', 
          textAlign: 'center', 
          color: '#6b7280',
          border: '1px dashed #d1d5db',
          borderRadius: '8px'
        }}>
          No results found for "{query}"
        </div>
      )}
    </div>
  );
};
RealTimeSearch.parameters = {
  docs: {
    description: {
      story: 'Real-time search with live results display and loading states.'
    }
  }
};

// Responsive Demo
export const ResponsiveDemo = () => {
  const [query, setQuery] = useState('');
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
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder={`Search on ${viewportSize}...`}
          size={viewportSize === 'mobile' ? 'sm' : 'md'}
          variant={viewportSize === 'mobile' ? 'minimal' : 'default'}
          showSuggestions={viewportSize !== 'mobile'}
          showClearButton={true}
          aria-label={`Search input for ${viewportSize} viewport`}
        />
      </div>
    </div>
  );
};
ResponsiveDemo.parameters = {
  docs: {
    description: {
      story: 'Demonstrates responsive behavior across different viewport sizes.'
    }
  }
};

// Accessibility Demo
export const AccessibilityDemo = () => {
  const [query, setQuery] = useState('');
  const [announceText, setAnnounceText] = useState('');
  
  const handleSearch = (searchTerm) => {
    setAnnounceText(`Searching for ${searchTerm}`);
    setTimeout(() => {
      setAnnounceText(`Found 3 results for ${searchTerm}`);
    }, 500);
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <label id="search-label" style={{ fontWeight: 'bold' }}>
          Product Search:
        </label>
      </div>
      
      <SearchInput
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
        placeholder="Type to search products..."
        aria-labelledby="search-label"
        aria-describedby="search-description"
        showSuggestions={true}
        showClearButton={true}
      />
      
      <div id="search-description" style={{ marginTop: '8px', fontSize: '14px', color: '#6b7280' }}>
        Use Tab to navigate, type to search, arrow keys to navigate suggestions.
      </div>
      
      <div aria-live="polite" aria-atomic="true" style={{ 
        position: 'absolute', 
        left: '-10000px',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
      }}>
        {announceText}
      </div>
      
      {announceText && (
        <div style={{ marginTop: '16px', padding: '8px', backgroundColor: '#f0f9ff', borderRadius: '4px' }}>
          Screen reader announcement: "{announceText}"
        </div>
      )}
    </div>
  );
};
AccessibilityDemo.parameters = {
  docs: {
    description: {
      story: 'Demonstrates proper ARIA labeling and screen reader announcements.'
    }
  }
};
