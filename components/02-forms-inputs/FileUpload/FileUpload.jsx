import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * FileUpload Component - Accessible drag-and-drop file upload
 */
export const FileUpload = ({
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  disabled = false,
  dragAndDrop = true,
  onFileSelect,
  onFileRemove,
  onError,
  placeholder = 'Drop files here or click to select',
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);

  const classes = [
    'file-upload',
    `file-upload--${variant}`,
    `file-upload--${size}`,
    disabled && 'file-upload--disabled',
    isDragOver && 'file-upload--drag-over',
    files.length > 0 && 'file-upload--has-files',
    className
  ].filter(Boolean).join(' ');

  const validateFile = (file) => {
    const errors = [];
    
    if (maxSize && file.size > maxSize) {
      errors.push(`File size exceeds ${(maxSize / 1024 / 1024).toFixed(1)}MB limit`);
    }
    
    if (accept) {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        }
        return file.type.match(type.replace('*', '.*'));
      });
      
      if (!isAccepted) {
        errors.push(`File type not accepted. Accepted: ${accept}`);
      }
    }
    
    return errors;
  };

  const processFiles = (fileList) => {
    const newFiles = Array.from(fileList);
    
    if (maxFiles && files.length + newFiles.length > maxFiles) {
      onError?.(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const validFiles = [];
    const errors = [];

    newFiles.forEach(file => {
      const fileErrors = validateFile(file);
      if (fileErrors.length > 0) {
        errors.push(...fileErrors);
      } else {
        validFiles.push({
          file,
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          name: file.name,
          size: file.size,
          type: file.type
        });
      }
    });

    if (errors.length > 0) {
      onError?.(errors.join(', '));
    }

    if (validFiles.length > 0) {
      const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
      setFiles(updatedFiles);
      onFileSelect?.(multiple ? updatedFiles : validFiles[0]);
    }
  };

  const handleInputChange = (e) => {
    if (disabled) return;
    processFiles(e.target.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (disabled || !dragAndDrop) return;
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (disabled || !dragAndDrop) return;
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (disabled || !dragAndDrop) return;
    setIsDragOver(false);
    processFiles(e.dataTransfer.files);
  };

  const handleRemoveFile = (fileId) => {
    const updatedFiles = files.filter(f => f.id !== fileId);
    setFiles(updatedFiles);
    onFileRemove?.(fileId);
  };

  const handleClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={classes} {...props}>
      <div
        className="file-upload__dropzone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={placeholder}
        aria-disabled={disabled}
      >
        <input
          ref={inputRef}
          type="file"
          className="file-upload__input"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
          aria-hidden="true"
          tabIndex={-1}
        />
        
        <div className="file-upload__content">
          <div className="file-upload__icon" aria-hidden="true">
            📁
          </div>
          <div className="file-upload__text">
            {placeholder}
          </div>
          {accept && (
            <div className="file-upload__accepted-types">
              Accepted types: {accept}
            </div>
          )}
          {maxSize && (
            <div className="file-upload__max-size">
              Max size: {formatFileSize(maxSize)}
            </div>
          )}
        </div>
      </div>

      {files.length > 0 && (
        <div className="file-upload__files">
          <div className="file-upload__files-header">
            Selected Files ({files.length})
          </div>
          <ul className="file-upload__files-list" role="list">
            {files.map((fileData) => (
              <li key={fileData.id} className="file-upload__file-item">
                <div className="file-upload__file-info">
                  <span className="file-upload__file-name">
                    {fileData.name}
                  </span>
                  <span className="file-upload__file-size">
                    {formatFileSize(fileData.size)}
                  </span>
                </div>
                <button
                  type="button"
                  className="file-upload__remove-button"
                  onClick={() => handleRemoveFile(fileData.id)}
                  aria-label={`Remove ${fileData.name}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  maxSize: PropTypes.number,
  maxFiles: PropTypes.number,
  disabled: PropTypes.bool,
  dragAndDrop: PropTypes.bool,
  onFileSelect: PropTypes.func,
  onFileRemove: PropTypes.func,
  onError: PropTypes.func,
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'bordered', 'compact']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default FileUpload;
