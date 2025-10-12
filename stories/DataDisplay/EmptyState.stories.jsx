import React, { useState } from 'react';
import { EmptyState } from '../../components/04-data-display-tables/EmptyState/EmptyState';
import { Button } from '../../components/01-actions-controls/Button/Button';
import { action } from '@storybook/addon-actions';

export default {
  title: 'DataDisplay/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Empty state component for displaying when there is no content with helpful guidance and actions.'
      }
    }
  }
};

export const Default = () => (
  <EmptyState
    icon="📁"
    title="No files yet"
    description="Get started by uploading your first file"
    action={
      <Button onClick={action('upload')}>Upload File</Button>
    }
  />
);

export const NoSearchResults = () => (
  <EmptyState
    icon="🔍"
    title="No search results"
    description="We couldn't find anything matching your search. Try adjusting your search terms."
    action={
      <Button variant="secondary" onClick={action('clearSearch')}>
        Clear Search
      </Button>
    }
  />
);

export const NoNotifications = () => (
  <EmptyState
    icon="🔔"
    title="You're all caught up!"
    description="No new notifications at the moment. We'll let you know when something important happens."
    variant="success"
  />
);

export const NetworkError = () => (
  <EmptyState
    icon="🚫"
    title="Connection failed"
    description="Unable to connect to the server. Please check your internet connection and try again."
    variant="error"
    actions={
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button onClick={action('retry')}>Try Again</Button>
        <Button variant="secondary" onClick={action('goOffline')}>Go Offline</Button>
      </div>
    }
  />
);

export const EmptyCart = () => (
  <EmptyState
    icon="🛍️"
    title="Your cart is empty"
    description="Looks like you haven't added anything to your cart yet. Start shopping to fill it up!"
    action={
      <Button onClick={action('startShopping')}>Start Shopping</Button>
    }
    variant="default"
  />
);

export const InboxEmpty = () => {
  const [showCelebration, setShowCelebration] = useState(false);
  
  return (
    <EmptyState
      icon={showCelebration ? "🎉" : "📧"}
      title={showCelebration ? "Inbox Zero achieved!" : "Inbox is empty"}
      description={
        showCelebration 
          ? "Congratulations! You've successfully cleared your inbox. Take a moment to celebrate this achievement!"
          : "No new messages. You've read everything!"
      }
      variant={showCelebration ? "success" : "default"}
      action={
        <Button 
          onClick={() => {
            setShowCelebration(!showCelebration);
            action('toggleCelebration')();
          }}
          variant={showCelebration ? "secondary" : "primary"}
        >
          {showCelebration ? "Back to Normal" : "Celebrate 🎉"}
        </Button>
      }
    />
  );
};

export const AccessDenied = () => (
  <EmptyState
    icon="🔐"
    title="Access denied"
    description="You don't have permission to view this content. Contact your administrator if you believe this is an error."
    variant="warning"
    actions={
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button onClick={action('requestAccess')}>Request Access</Button>
        <Button variant="secondary" onClick={action('goBack')}>Go Back</Button>
      </div>
    }
  />
);

export const FirstTimeUser = () => (
  <EmptyState
    icon="👋"
    title="Welcome to our platform!"
    description="Let's get you started with a quick tour of the main features and capabilities."
    variant="info"
    actions={
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button onClick={action('startTour')}>Start Tour</Button>
        <Button variant="secondary" onClick={action('skipTour')}>Skip for Now</Button>
      </div>
    }
  />
);

export const UnderConstruction = () => (
  <EmptyState
    icon="🚧"
    title="Coming soon"
    description="This feature is currently under development. We're working hard to bring it to you soon!"
    variant="info"
    action={
      <Button onClick={action('getNotified')}>Get Notified</Button>
    }
  />
);

export const DataLoading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasData(Math.random() > 0.5);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <EmptyState
        icon="⏳"
        title="Loading data..."
        description="Please wait while we fetch your information."
        variant="loading"
      />
    );
  }
  
  if (hasData) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>🎉 Data loaded successfully!</h2>
        <p>Your content would appear here.</p>
        <Button onClick={() => {
          setIsLoading(true);
          setHasData(false);
        }}>
          Reload Demo
        </Button>
      </div>
    );
  }
  
  return (
    <EmptyState
      icon="📋"
      title="No data available"
      description="There's no data to display at the moment. Try refreshing or check back later."
      action={
        <Button onClick={() => {
          setIsLoading(true);
          setHasData(false);
        }}>
          Refresh
        </Button>
      }
    />
  );
};

export const FilteredResults = () => {
  const [hasFilters, setHasFilters] = useState(true);
  
  return (
    <div>
      <div style={{ 
        marginBottom: '24px', 
        padding: '16px', 
        backgroundColor: '#f8fafc', 
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>Active filters: {hasFilters ? '3 filters applied' : 'No filters'}</span>
        <Button 
          variant="secondary" 
          size="sm"
          onClick={() => setHasFilters(!hasFilters)}
        >
          {hasFilters ? 'Clear Filters' : 'Apply Filters'}
        </Button>
      </div>
      
      {hasFilters && (
        <EmptyState
          icon="🗺️"
          title="No results match your filters"
          description="Try removing some filters to see more results, or adjust your search criteria."
          actions={
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button onClick={() => {
                setHasFilters(false);
                action('clearFilters')();
              }}>
                Clear All Filters
              </Button>
              <Button variant="secondary" onClick={action('adjustFilters')}>
                Adjust Filters
              </Button>
            </div>
          }
        />
      )}
      
      {!hasFilters && (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h3>📈 Results would appear here</h3>
          <p>This represents a normal state with data when no filters are applied.</p>
        </div>
      )}
    </div>
  );
};

export const OfflineMode = () => (
  <EmptyState
    icon="📵"
    title="You're offline"
    description="Check your internet connection. Some features may not be available while offline."
    variant="warning"
    actions={
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button onClick={action('retry')}>Try Again</Button>
        <Button variant="secondary" onClick={action('workOffline')}>Work Offline</Button>
      </div>
    }
  />
);

export const CustomIllustration = () => (
  <EmptyState
    illustration={
      <div style={{
        width: '120px',
        height: '120px',
        backgroundColor: '#e0f2fe',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '48px',
        marginBottom: '16px'
      }}>
        🎨
      </div>
    }
    title="Create your first design"
    description="Start creating beautiful designs with our powerful tools and templates."
    action={
      <Button onClick={action('createDesign')}>Create Design</Button>
    }
  />
);

export const ResponsiveEmptyState = () => {
  const [viewportSize, setViewportSize] = useState('desktop');
  
  return (
    <div>
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
        borderRadius: '8px',
        minHeight: '400px'
      }}>
        <EmptyState
          icon="📱"
          title={viewportSize === 'mobile' ? 'No items' : 'No items found'}
          description={
            viewportSize === 'mobile' 
              ? 'Add your first item to get started.'
              : 'You haven\'t added any items yet. Get started by creating your first item.'
          }
          action={
            <Button 
              size={viewportSize === 'mobile' ? 'sm' : 'md'}
              onClick={action('addItem')}
            >
              {viewportSize === 'mobile' ? 'Add Item' : 'Add Your First Item'}
            </Button>
          }
          compact={viewportSize === 'mobile'}
        />
      </div>
    </div>
  );
};
