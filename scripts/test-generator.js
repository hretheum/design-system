#!/usr/bin/env node

/**
 * Test script for component generator
 * Creates an Avatar component automatically
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🧪 Testing component generator with Avatar component...\n');

// Input data for the Avatar component
const inputs = [
  'Avatar\n',                          // Component name
  'User representation component\n',    // Description  
  'Display user profile image or initials\n', // Purpose
  '\x1B\x5B\x42'.repeat(9) + '\n',    // Arrow down 9 times to Media & Icons, then enter
  '\n',                                // Confirm category
  ' \n',                               // Select all sizes (space to toggle all, then enter)
  '\x1B\x5B\x41 \x1B\x5B\x41 \x1B\x5B\x41 \n', // Deselect some states
  'circle,square,status\n',           // Variants
  'y\n',                               // Has icon support
  'y\n',                               // Is accessible
  'y\n'                                // Has tests
];

const generator = spawn('node', [path.join(__dirname, 'generate-component.js')], {
  stdio: ['pipe', 'inherit', 'inherit']
});

let inputIndex = 0;

// Send inputs one by one with delay
function sendNextInput() {
  if (inputIndex < inputs.length) {
    setTimeout(() => {
      generator.stdin.write(inputs[inputIndex]);
      inputIndex++;
      sendNextInput();
    }, 200);
  }
}

generator.on('spawn', () => {
  console.log('Generator started, sending automated inputs...\n');
  sendNextInput();
});

generator.on('exit', (code) => {
  if (code === 0) {
    console.log('\n✅ Test completed successfully!');
    console.log('Check components/10-media-icons/Avatar/ for generated files');
  } else {
    console.log('\n❌ Test failed with code:', code);
  }
});