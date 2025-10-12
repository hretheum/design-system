#!/usr/bin/env node

/**
 * Fix invalid token types to comply with W3C Design Token Format
 */

const fs = require('fs').promises;
const path = require('path');

const TOKEN_FILES = [
  'primitives.json',
  'semantic.json',
  'functional.json',
  'component.json',
  'accessibility.json',
  'theme.json'
];

// Map invalid types to valid W3C types
const TYPE_MAPPING = {
  'shadow': 'string',     // Box shadows as strings
  'gradient': 'string',   // Gradients as strings
  'other': 'string',      // Generic other types as strings
  'object': 'string'      // Objects as serialized strings
};

async function fixTokenTypes() {
  console.log('🔧 Fixing token types for W3C compliance...\n');
  
  let totalFixed = 0;
  
  for (const file of TOKEN_FILES) {
    const filePath = path.join(process.cwd(), file);
    
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const tokens = JSON.parse(content);
      
      console.log(`Processing ${file}...`);
      
      const fixed = fixTypes(tokens);
      
      if (fixed > 0) {
        // Write fixed tokens back
        await fs.writeFile(filePath, JSON.stringify(tokens, null, 2));
        console.log(`  ✅ Fixed ${fixed} token types`);
        totalFixed += fixed;
      } else {
        console.log(`  ✓ No fixes needed`);
      }
      
    } catch (error) {
      console.error(`  ❌ Error processing ${file}: ${error.message}`);
    }
  }
  
  console.log(`\n✨ Total token types fixed: ${totalFixed}`);
}

function fixTypes(obj, path = '') {
  let fixedCount = 0;
  
  for (const key in obj) {
    if (key.startsWith('$') || key.startsWith('_')) continue;
    
    const value = obj[key];
    const fullPath = path ? `${path}.${key}` : key;
    
    if (value && typeof value === 'object') {
      // Check if this is a token
      if ('type' in value && 'value' in value) {
        // Check if type needs fixing
        if (TYPE_MAPPING[value.type]) {
          console.log(`    Fixing: ${fullPath} (${value.type} → ${TYPE_MAPPING[value.type]})`);
          value.type = TYPE_MAPPING[value.type];
          fixedCount++;
        }
      } else {
        // Recurse into nested objects
        fixedCount += fixTypes(value, fullPath);
      }
    }
  }
  
  return fixedCount;
}

// Run the fix
fixTokenTypes().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});