#!/usr/bin/env node

/**
 * Token Reference Audit Script
 * Validates all token references across layers to ensure consistency
 */

const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk').default || require('chalk');

// Define layer hierarchy - each layer can only reference layers listed
const LAYER_HIERARCHY = {
  'primitives.json': [], // Base layer - no references allowed
  'semantic.json': ['primitives.json'],
  'functional.json': ['primitives.json', 'semantic.json'],
  'component.json': ['primitives.json', 'semantic.json', 'functional.json'],
  'accessibility.json': ['primitives.json', 'semantic.json'],
  'theme.json': ['primitives.json', 'semantic.json', 'functional.json', 'component.json', 'accessibility.json']
};

async function auditTokenReferences() {
  console.log(chalk.blue('🔍 Starting Token Reference Audit...\n'));
  
  const errors = [];
  const warnings = [];
  const stats = {
    totalTokens: 0,
    totalReferences: 0,
    checkedReferences: 0,
    circularReferences: [],
    hierarchyViolations: []
  };
  
  try {
    // Load all token files
    const tokens = {};
    const tokenMap = new Map(); // Flat map of all tokens for quick lookup
    
    console.log(chalk.gray('Loading token files...'));
    for (const file of Object.keys(LAYER_HIERARCHY)) {
      const filePath = path.join(process.cwd(), file);
      try {
        const content = await fs.readFile(filePath, 'utf8');
        tokens[file] = JSON.parse(content);
        
        // Build token map
        buildTokenMap(tokens[file], file.replace('.json', ''), tokenMap);
        
        console.log(chalk.gray(`  ✓ Loaded ${file}`));
      } catch (error) {
        console.log(chalk.yellow(`  ⚠ Skipped ${file} (not found)`));
      }
    }
    
    stats.totalTokens = tokenMap.size;
    console.log(chalk.cyan(`\nFound ${stats.totalTokens} total tokens\n`));
    
    // Check each file's references
    console.log(chalk.gray('Checking references...'));
    for (const [file, allowedLayers] of Object.entries(LAYER_HIERARCHY)) {
      if (!tokens[file]) continue;
      
      const allowedTokens = {};
      // Build allowed tokens map from allowed layers
      for (const allowedFile of allowedLayers) {
        if (tokens[allowedFile]) {
          Object.assign(allowedTokens, flattenTokens(tokens[allowedFile]));
        }
      }
      
      // Also include tokens from the same file (but check for circular refs)
      const sameFileTokens = flattenTokens(tokens[file]);
      
      const fileErrors = checkFileReferences(
        tokens[file],
        file,
        allowedTokens,
        sameFileTokens,
        allowedLayers,
        stats
      );
      
      errors.push(...fileErrors);
      
      if (fileErrors.length === 0) {
        console.log(chalk.green(`  ✅ ${file} - No errors`));
      } else {
        console.log(chalk.red(`  ❌ ${file} - ${fileErrors.length} errors`));
      }
    }
    
    // Check for circular references
    console.log(chalk.gray('\nChecking for circular references...'));
    const circularRefs = detectCircularReferences(tokens);
    stats.circularReferences = circularRefs;
    
    if (circularRefs.length > 0) {
      circularRefs.forEach(circle => {
        errors.push({
          type: 'circular',
          file: circle.file,
          message: `Circular reference detected: ${circle.chain.join(' → ')}`
        });
      });
      console.log(chalk.red(`  ❌ Found ${circularRefs.length} circular references`));
    } else {
      console.log(chalk.green(`  ✅ No circular references found`));
    }
    
    // Generate detailed report
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalTokens: stats.totalTokens,
        totalReferences: stats.totalReferences,
        checkedReferences: stats.checkedReferences,
        totalErrors: errors.length,
        totalWarnings: warnings.length
      },
      errors: errors,
      warnings: warnings,
      circularReferences: stats.circularReferences,
      hierarchyViolations: stats.hierarchyViolations
    };
    
    // Save report
    await fs.writeFile(
      'token-audit-report.json',
      JSON.stringify(report, null, 2)
    );
    
    // Display summary
    console.log('\n' + chalk.blue('═'.repeat(60)));
    console.log(chalk.blue('\n📊 Audit Summary\n'));
    
    console.log(`Total Tokens: ${chalk.cyan(stats.totalTokens)}`);
    console.log(`Total References: ${chalk.cyan(stats.totalReferences)}`);
    console.log(`Checked References: ${chalk.cyan(stats.checkedReferences)}`);
    console.log(`Errors Found: ${errors.length > 0 ? chalk.red(errors.length) : chalk.green(0)}`);
    console.log(`Warnings: ${warnings.length > 0 ? chalk.yellow(warnings.length) : chalk.green(0)}`);
    
    if (errors.length > 0) {
      console.log(chalk.red('\n❌ Audit Failed!\n'));
      console.log(chalk.yellow('Top issues:'));
      
      const errorsByType = {};
      errors.forEach(error => {
        const type = error.type || 'reference';
        errorsByType[type] = (errorsByType[type] || 0) + 1;
      });
      
      Object.entries(errorsByType).forEach(([type, count]) => {
        console.log(`  • ${type}: ${chalk.red(count)} errors`);
      });
      
      console.log(chalk.gray('\nFirst 5 errors:'));
      errors.slice(0, 5).forEach(error => {
        console.log(chalk.red(`  ❌ ${error.file}: ${error.message}`));
      });
      
      console.log(chalk.cyan('\n📄 Full report saved to: token-audit-report.json'));
      process.exit(1);
    } else {
      console.log(chalk.green('\n✅ All token references are valid!\n'));
    }
    
  } catch (error) {
    console.error(chalk.red('\n❌ Audit failed with error:'), error);
    process.exit(1);
  }
}

function buildTokenMap(obj, prefix, map, path = '') {
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$') || key.startsWith('_')) continue;
    
    const fullPath = path ? `${path}.${key}` : key;
    
    if (value && typeof value === 'object') {
      if ('value' in value) {
        map.set(fullPath, { file: prefix, value: value.value });
      } else {
        buildTokenMap(value, prefix, map, fullPath);
      }
    }
  }
}

function flattenTokens(obj, path = '') {
  const result = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$') || key.startsWith('_')) continue;
    
    const fullPath = path ? `${path}.${key}` : key;
    
    if (value && typeof value === 'object') {
      if ('value' in value) {
        result[fullPath] = value;
      } else {
        Object.assign(result, flattenTokens(value, fullPath));
      }
    }
  }
  
  return result;
}

function checkFileReferences(tokens, fileName, allowedTokens, sameFileTokens, allowedFiles, stats) {
  const errors = [];
  
  function checkReferences(obj, path = '') {
    for (const [key, value] of Object.entries(obj)) {
      if (key.startsWith('$') || key.startsWith('_')) continue;
      
      const fullPath = path ? `${path}.${key}` : key;
      
      if (value && typeof value === 'object') {
        if (value.value && typeof value.value === 'string') {
          // Check for references
          const matches = value.value.match(/\{([^}]+)\}/g);
          if (matches) {
            stats.totalReferences += matches.length;
            
            matches.forEach(ref => {
              const refPath = ref.slice(1, -1);
              stats.checkedReferences++;
              
              // Check if it's a self-reference (potential circular)
              if (sameFileTokens[refPath] && sameFileTokens[refPath] === value) {
                errors.push({
                  type: 'circular',
                  file: fileName,
                  token: fullPath,
                  reference: refPath,
                  message: `Circular self-reference: ${fullPath} → ${ref}`
                });
                return;
              }
              
              // Check if reference exists in allowed layers
              if (!allowedTokens[refPath] && !sameFileTokens[refPath]) {
                // Check if it might be in a non-allowed layer
                const isInNonAllowedLayer = checkIfInNonAllowedLayer(refPath, fileName);
                
                if (isInNonAllowedLayer) {
                  errors.push({
                    type: 'hierarchy',
                    file: fileName,
                    token: fullPath,
                    reference: refPath,
                    message: `Hierarchy violation: ${fileName} cannot reference ${refPath}`
                  });
                  stats.hierarchyViolations.push({ file: fileName, token: fullPath, reference: refPath });
                } else {
                  errors.push({
                    type: 'missing',
                    file: fileName,
                    token: fullPath,
                    reference: refPath,
                    message: `Reference not found: ${ref}`
                  });
                }
              }
            });
          }
        } else {
          checkReferences(value, fullPath);
        }
      }
    }
  }
  
  checkReferences(tokens);
  return errors;
}

function checkIfInNonAllowedLayer(refPath, currentFile) {
  // This is a simplified check - in reality, you'd need to check all token files
  // to see if the reference exists in a non-allowed layer
  const commonPrefixes = {
    'primitives.json': ['color', 'spacing', 'fontSize', 'fontFamily', 'duration', 'easing'],
    'semantic.json': ['brand', 'content', 'surface', 'feedback', 'interactive'],
    'functional.json': ['button', 'input', 'card', 'navigation', 'modal'],
    'component.json': ['button', 'link', 'form', 'table', 'wizard'],
    'accessibility.json': ['contrast', 'focus', 'targetSize', 'motion']
  };
  
  const prefix = refPath.split('.')[0];
  
  for (const [file, prefixes] of Object.entries(commonPrefixes)) {
    if (file !== currentFile && prefixes.includes(prefix)) {
      return true;
    }
  }
  
  return false;
}

function detectCircularReferences(tokens) {
  const circularRefs = [];
  
  // Build dependency graph
  const dependencies = {};
  
  for (const [file, fileTokens] of Object.entries(tokens)) {
    if (!fileTokens) continue;
    
    const flatTokens = flattenTokens(fileTokens);
    
    for (const [tokenPath, token] of Object.entries(flatTokens)) {
      if (token.value && typeof token.value === 'string') {
        const matches = token.value.match(/\{([^}]+)\}/g);
        if (matches) {
          dependencies[tokenPath] = matches.map(ref => ref.slice(1, -1));
        }
      }
    }
  }
  
  // Check for cycles using DFS
  const visited = new Set();
  const recursionStack = new Set();
  
  function hasCycle(node, path = []) {
    if (recursionStack.has(node)) {
      const cycleStart = path.indexOf(node);
      const cycle = [...path.slice(cycleStart), node];
      circularRefs.push({
        file: 'multiple',
        chain: cycle
      });
      return true;
    }
    
    if (visited.has(node)) {
      return false;
    }
    
    visited.add(node);
    recursionStack.add(node);
    
    const deps = dependencies[node] || [];
    for (const dep of deps) {
      if (hasCycle(dep, [...path, node])) {
        return true;
      }
    }
    
    recursionStack.delete(node);
    return false;
  }
  
  for (const token of Object.keys(dependencies)) {
    if (!visited.has(token)) {
      hasCycle(token);
    }
  }
  
  return circularRefs;
}

// Run the audit
auditTokenReferences();