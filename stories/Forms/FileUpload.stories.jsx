import React, { useState } from 'react';
import { FileUpload } from '../../components/02-forms-inputs/FileUpload/FileUpload';
import { action } from '@storybook/addon-actions';
import { within, userEvent, expect } from '@storybook/test';

export default {
  title: 'Forms/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Accessible drag-and-drop file upload component with validation, multiple file support, and comprehensive error handling.'
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
    accept: {
      control: 'text',
      description: 'Comma-separated list of accepted file types'
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection'
    },
    maxSize: {
      control: 'number',
      description: 'Maximum file size in bytes'
    },
    maxFiles: {
      control: 'number',
      description: 'Maximum number of files allowed'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the file upload'
    },
    dragAndDrop: {
      control: 'boolean',
      description: 'Enable drag and drop functionality'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the upload area'
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'compact'],
      description: 'Visual variant of the component'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the component'
    }
  }
};

const Template = (args) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileSelect = (files) => {
    setSelectedFiles(Array.isArray(files) ? files : [files]);
    setErrorMessage('');
    action('onFileSelect')(files);
  };

  const handleFileRemove = (fileId) => {
    setSelectedFiles(prev => prev.filter(f => f.id !== fileId));
    action('onFileRemove')(fileId);
  };

  const handleError = (error) => {
    setErrorMessage(error);
    action('onError')(error);
  };

  return (
    <div>
      <FileUpload
        {...args}
        onFileSelect={handleFileSelect}
        onFileRemove={handleFileRemove}
        onError={handleError}
      />
      {errorMessage && (
        <div style={{ color: 'red', marginTop: '8px', fontSize: '14px' }}>
          Error: {errorMessage}
        </div>
      )}
      {selectedFiles.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <h4>Selected Files:</h4>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={file.id || index}>
                {file.name || file.file?.name} ({file.size || file.file?.size} bytes)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Default Example
export const Default = Template.bind({});
Default.args = {
  placeholder: 'Drop files here or click to select'
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const dropzone = canvas.getByRole('button');
  
  // Test accessibility
  await expect(dropzone).toBeInTheDocument();
  await expect(dropzone).toHaveAttribute('aria-label');
  await expect(dropzone).toHaveAttribute('tabindex', '0');
};

// Multiple Files
export const MultipleFiles = Template.bind({});
MultipleFiles.args = {
  multiple: true,
  maxFiles: 5,
  placeholder: 'Select up to 5 files'
};
MultipleFiles.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const dropzone = canvas.getByRole('button');
  
  // Test keyboard interaction
  await userEvent.tab();
  await expect(dropzone).toHaveFocus();
  await userEvent.keyboard('{Enter}');
};

// File Type Restrictions
export const ImageOnly = Template.bind({});
ImageOnly.args = {
  accept: 'image/*',
  multiple: true,
  placeholder: 'Drop image files here'
};
ImageOnly.parameters = {
  docs: {
    description: {
      story: 'Accepts only image files with visual feedback for file type validation.'
    }
  }
};

// Size Limitations
export const SizeLimited = Template.bind({});
SizeLimited.args = {
  maxSize: 5 * 1024 * 1024, // 5MB
  multiple: true,
  placeholder: 'Max 5MB per file'
};
SizeLimited.parameters = {
  docs: {
    description: {
      story: 'Enforces maximum file size with clear error messaging.'
    }
  }
};

// Disabled State
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  placeholder: 'File upload is disabled'
};
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const dropzone = canvas.getByRole('button');
  
  // Test disabled state
  await expect(dropzone).toHaveAttribute('aria-disabled', 'true');
  await expect(dropzone).toHaveAttribute('tabindex', '-1');
};

// Compact Variant
export const Compact = Template.bind({});
Compact.args = {
  variant: 'compact',
  size: 'sm',
  placeholder: 'Compact upload'
};

// Bordered Variant
export const Bordered = Template.bind({});
Bordered.args = {
  variant: 'bordered',
  size: 'lg',
  placeholder: 'Bordered upload area'
};

// No Drag and Drop
export const NoDragDrop = Template.bind({});
NoDragDrop.args = {
  dragAndDrop: false,
  placeholder: 'Click to select files (no drag and drop)'
};
NoDragDrop.parameters = {
  docs: {
    description: {
      story: 'File upload with drag and drop disabled, click-only interaction.'
    }
  }
};

// Responsive Example
export const ResponsiveDemo = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
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
        padding: '16px'
      }}>
        <FileUpload
          multiple
          size={viewportSize === 'mobile' ? 'sm' : 'md'}
          variant={viewportSize === 'mobile' ? 'compact' : 'default'}
          placeholder={`Drop files here (${viewportSize} view)`}
          onFileSelect={setSelectedFiles}
        />
      </div>
      
      {selectedFiles.length > 0 && (
        <p style={{ marginTop: '8px' }}>
          {selectedFiles.length} file(s) selected
        </p>
      )}
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

// Error Handling Demo
export const ErrorHandling = () => {
  const [error, setError] = useState('');
  
  return (
    <div>
      <FileUpload
        accept=".txt"
        maxSize={1024} // 1KB limit for demo
        maxFiles={2}
        placeholder="Demo: Only .txt files, max 1KB, max 2 files"
        onError={setError}
        onFileSelect={() => setError('')}
      />
      {error && (
        <div style={{ 
          marginTop: '8px', 
          padding: '8px', 
          backgroundColor: '#fee', 
          border: '1px solid #fcc',
          borderRadius: '4px',
          color: '#c33'
        }}>
          {error}
        </div>
      )}
    </div>
  );
};
ErrorHandling.parameters = {
  docs: {
    description: {
      story: 'Try uploading invalid files to see error handling in action.'
    }
  }
};
