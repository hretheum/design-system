#!/usr/bin/env node

/**
 * Token Validation Script
 * Validates W3C Design Token Format compliance for Figma compatibility
 */

const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk').default || require('chalk');

const TOKEN_FILES = [
  'primitives.json',
  'semantic.json', 
  'functional.json',
  'component.json',
  'accessibility.json',
  'theme.json'
];

async function validateTokens() {
  console.log(chalk.blue('🔍 Validating design tokens for Figma compatibility...\n'));
  
  let allValid = true;
  const issues = [];
  
  for (const file of TOKEN_FILES) {
    const filePath = path.join(process.cwd(), file);
    
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const tokens = JSON.parse(content);
      
      console.log(chalk.gray(`Checking ${file}...`));
      
      const fileIssues = validateTokenStructure(tokens, file, '');
      
      if (fileIssues.length > 0) {
        allValid = false;
        issues.push({ file, issues: fileIssues });
        console.log(chalk.red(`  ❌ Found ${fileIssues.length} issues`));
      } else {
        console.log(chalk.green(`  ✅ Valid`));
      }
      
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(chalk.yellow(`  ⚠️  File not found: ${file}`));
      } else {
        console.log(chalk.red(`  ❌ Error reading ${file}: ${error.message}`));
        allValid = false;
      }
    }
  }
  
  console.log('\n' + chalk.blue('═'.repeat(60)));
  
  if (allValid) {
    console.log(chalk.green('\n✅ All token files are valid for Figma!\n'));
  } else {
    console.log(chalk.red('\n❌ Token validation failed!\n'));
    
    for (const { file, issues: fileIssues } of issues) {
      console.log(chalk.yellow(`\n${file}:`));
      for (const issue of fileIssues) {
        console.log(chalk.red(`  • ${issue}`));
      }
    }
    
    console.log(chalk.cyan('\n📚 W3C Design Token Format Requirements:'));
    console.log('  1. Each token must have "value" and "type" properties');
    console.log('  2. Type must be one of: color, dimension, number, string, fontFamily, fontWeight, duration, cubicBezier');
    console.log('  3. References must use {token.path} syntax');
    console.log('  4. No circular references allowed\n');
    
    process.exit(1);
  }
}

function validateTokenStructure(obj, file, path) {
  const issues = [];
  const validTypes = ['color', 'dimension', 'number', 'string', 'fontFamily', 'fontWeight', 'duration', 'cubicBezier'];
  
  function traverse(node, currentPath) {
    for (const key in node) {
      if (key.startsWith('$') || key.startsWith('_')) continue; // Skip meta fields
      
      const value = node[key];
      const fullPath = currentPath ? `${currentPath}.${key}` : key;
      
      if (value && typeof value === 'object') {
        // Check if this is a token (has 'value' property)
        if ('value' in value) {
          // Validate token structure
          if (!value.type) {
            issues.push(`Token "${fullPath}" is missing "type" property`);
          } else if (!validTypes.includes(value.type)) {
            issues.push(`Token "${fullPath}" has invalid type "${value.type}"`);
          }
          
          // Validate reference syntax
          if (typeof value.value === 'string' && value.value.includes('{')) {
            const referenceRegex = /^\{[a-zA-Z0-9._-]+\}$/;
            if (!referenceRegex.test(value.value)) {
              issues.push(`Token "${fullPath}" has invalid reference syntax: "${value.value}"`);
            }
          }
        } else {
          // Continue traversing nested objects
          traverse(value, fullPath);
        }
      }
    }
  }
  
  traverse(obj, '');
  return issues;
}

// Run validation
validateTokens().catch(error => {
  console.error(chalk.red('Unexpected error:'), error);
  process.exit(1);
});