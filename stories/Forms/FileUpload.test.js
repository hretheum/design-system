/**
 * Interaction tests for FileUpload component
 */

import { expect } from '@storybook/test';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { testUtils } from '../../tests/interaction/test-utils';

export const FileUploadTests = {
  /**
   * Test basic file upload functionality
   */
  async testBasicFileUpload(canvasElement) {
    const canvas = within(canvasElement);
    const dropzone = canvas.getByTestId('file-upload-dropzone');
    
    // Test dropzone exists
    await expect(dropzone).toBeInTheDocument();
    await expect(dropzone).toHaveAttribute('role', 'button');
    
    // Test file input exists but is hidden
    const fileInput = canvas.getByLabelText(/choose files/i);
    await expect(fileInput).toBeInTheDocument();
    await expect(fileInput).toHaveAttribute('type', 'file');
  },

  /**
   * Test file selection
   */
  async testFileSelection(canvasElement) {
    const canvas = within(canvasElement);
    const fileInput = canvas.getByLabelText(/choose files/i);
    
    // Create mock file
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
    
    // Upload file
    await userEvent.upload(fileInput, file);
    
    // Check file appears in preview
    await waitFor(() => {
      const fileName = canvas.getByText('test.txt');
      expect(fileName).toBeInTheDocument();
    });
    
    // Check file size is displayed
    const fileSize = canvas.getByText(/11 B/i);
    await expect(fileSize).toBeInTheDocument();
  },

  /**
   * Test multiple file selection
   */
  async testMultipleFiles(canvasElement) {
    const canvas = within(canvasElement);
    const fileInput = canvas.getByLabelText(/choose files/i);
    
    // Check multiple attribute
    await expect(fileInput).toHaveAttribute('multiple');
    
    // Upload multiple files
    const files = [
      new File(['content1'], 'file1.txt', { type: 'text/plain' }),
      new File(['content2'], 'file2.txt', { type: 'text/plain' }),
      new File(['content3'], 'file3.txt', { type: 'text/plain' })
    ];
    
    await userEvent.upload(fileInput, files);
    
    // Check all files appear
    await waitFor(() => {
      expect(canvas.getByText('file1.txt')).toBeInTheDocument();
      expect(canvas.getByText('file2.txt')).toBeInTheDocument();
      expect(canvas.getByText('file3.txt')).toBeInTheDocument();
    });
  },

  /**
   * Test drag and drop
   */
  async testDragAndDrop(canvasElement) {
    const canvas = within(canvasElement);
    const dropzone = canvas.getByTestId('file-upload-dropzone');
    
    // Create mock file
    const file = new File(['drag content'], 'dragged.txt', { type: 'text/plain' });
    const dataTransfer = {
      files: [file],
      items: [{ kind: 'file', getAsFile: () => file }],
      types: ['Files']
    };
    
    // Simulate drag enter
    const dragEnterEvent = new DragEvent('dragenter', { dataTransfer, bubbles: true });
    dropzone.dispatchEvent(dragEnterEvent);
    
    // Check dropzone active state
    await expect(dropzone).toHaveClass('dropzone--active');
    
    // Simulate drop
    const dropEvent = new DragEvent('drop', { dataTransfer, bubbles: true });
    dropzone.dispatchEvent(dropEvent);
    
    // Check file is added
    await waitFor(() => {
      const fileName = canvas.getByText('dragged.txt');
      expect(fileName).toBeInTheDocument();
    });
    
    // Check dropzone returns to normal state
    await expect(dropzone).not.toHaveClass('dropzone--active');
  },

  /**
   * Test file type restrictions
   */
  async testFileTypeRestrictions(canvasElement) {
    const canvas = within(canvasElement);
    const fileInput = canvas.getByLabelText(/choose files/i);
    
    // Check accept attribute
    await expect(fileInput).toHaveAttribute('accept', 'image/*');
    
    // Try to upload invalid file type
    const invalidFile = new File(['text'], 'document.txt', { type: 'text/plain' });
    await userEvent.upload(fileInput, invalidFile);
    
    // Check for error message
    await waitFor(() => {
      const error = canvas.getByRole('alert');
      expect(error).toHaveTextContent(/invalid file type/i);
    });
    
    // Upload valid file type
    const validFile = new File(['image'], 'photo.jpg', { type: 'image/jpeg' });
    await userEvent.upload(fileInput, validFile);
    
    // Check file is accepted
    await waitFor(() => {
      const fileName = canvas.getByText('photo.jpg');
      expect(fileName).toBeInTheDocument();
    });
  },

  /**
   * Test file size restrictions
   */
  async testFileSizeRestrictions(canvasElement) {
    const canvas = within(canvasElement);
    const fileInput = canvas.getByLabelText(/choose files/i);
    
    // Create large file (over 5MB limit)
    const largeContent = new Array(6 * 1024 * 1024).join('a');
    const largeFile = new File([largeContent], 'large.txt', { type: 'text/plain' });
    
    await userEvent.upload(fileInput, largeFile);
    
    // Check for error message
    await waitFor(() => {
      const error = canvas.getByRole('alert');
      expect(error).toHaveTextContent(/file too large/i);
    });
  },

  /**
   * Test file removal
   */
  async testFileRemoval(canvasElement) {
    const canvas = within(canvasElement);
    const fileInput = canvas.getByLabelText(/choose files/i);
    
    // Upload file
    const file = new File(['content'], 'removable.txt', { type: 'text/plain' });
    await userEvent.upload(fileInput, file);
    
    // Wait for file to appear
    await waitFor(() => {
      expect(canvas.getByText('removable.txt')).toBeInTheDocument();
    });
    
    // Click remove button
    const removeButton = canvas.getByRole('button', { name: /remove removable.txt/i });
    await userEvent.click(removeButton);
    
    // Check file is removed
    await waitFor(() => {
      expect(canvas.queryByText('removable.txt')).not.toBeInTheDocument();
    });
  },

  /**
   * Test upload progress
   */
  async testUploadProgress(canvasElement) {
    const canvas = within(canvasElement);
    const uploadButton = canvas.getByRole('button', { name: /upload/i });
    
    // Upload file first
    const fileInput = canvas.getByLabelText(/choose files/i);
    const file = new File(['content'], 'upload.txt', { type: 'text/plain' });
    await userEvent.upload(fileInput, file);
    
    // Click upload button
    await userEvent.click(uploadButton);
    
    // Check for progress bar
    await waitFor(() => {
      const progressBar = canvas.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveAttribute('aria-valuenow');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    });
  },

  /**
   * Test disabled state
   */
  async testDisabledState(canvasElement) {
    const canvas = within(canvasElement);
    const fileInput = canvas.getByTestId('disabled-file-input');
    const dropzone = canvas.getByTestId('disabled-dropzone');
    
    // Check input is disabled
    await expect(fileInput).toBeDisabled();
    
    // Check dropzone is disabled
    await expect(dropzone).toHaveAttribute('aria-disabled', 'true');
    await expect(dropzone).toHaveClass('dropzone--disabled');
    
    // Try to upload - should not work
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    await userEvent.upload(fileInput, file);
    
    // File should not appear
    await expect(canvas.queryByText('test.txt')).not.toBeInTheDocument();
  },

  /**
   * Test accessibility
   */
  async testAccessibility(canvasElement) {
    const canvas = within(canvasElement);
    const dropzone = canvas.getByTestId('file-upload-dropzone');
    const fileInput = canvas.getByLabelText(/choose files/i);
    
    // Test dropzone accessibility
    await expect(dropzone).toHaveAttribute('role', 'button');
    await expect(dropzone).toHaveAttribute('tabindex', '0');
    await expect(dropzone).toHaveAttribute('aria-label');
    
    // Test keyboard activation
    dropzone.focus();
    await expect(dropzone).toHaveFocus();
    
    await userEvent.keyboard('{Enter}');
    // Should trigger file input click
    
    // Test screen reader announcements
    const status = canvas.getByRole('status');
    await expect(status).toBeInTheDocument();
  }
};

// Export individual test functions
export const testBasicFileUpload = FileUploadTests.testBasicFileUpload;
export const testFileSelection = FileUploadTests.testFileSelection;
export const testMultipleFiles = FileUploadTests.testMultipleFiles;
export const testDragAndDrop = FileUploadTests.testDragAndDrop;
export const testFileTypeRestrictions = FileUploadTests.testFileTypeRestrictions;
export const testFileSizeRestrictions = FileUploadTests.testFileSizeRestrictions;
export const testFileRemoval = FileUploadTests.testFileRemoval;
export const testUploadProgress = FileUploadTests.testUploadProgress;
export const testDisabledState = FileUploadTests.testDisabledState;
export const testAccessibility = FileUploadTests.testAccessibility;