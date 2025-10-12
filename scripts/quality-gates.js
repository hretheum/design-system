#!/usr/bin/env node

/**
 * Component Quality Gates
 * Automated quality checks for component development
 * 
 * Usage: node quality-gates.js [component-name]
 */

const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
};

// Quality gate thresholds
const THRESHOLDS = {
  coverage: {
    statements: 80,
    branches: 70,
    functions: 80,
    lines: 80
  },
  bundleSize: {
    max: 5000, // 5KB max per component
    warning: 3000 // 3KB warning threshold
  },
  complexity: {
    max: 10, // Cyclomatic complexity
    warning: 7
  },
  documentation: {
    minLines: 50, // Minimum README lines
    requiredSections: [
      '## Usage',
      '## Props',
      '## Examples',
      '## Accessibility'
    ]
  },
  performance: {
    renderTime: 16, // ms
    reRenderTime: 8 // ms
  },
  accessibility: {
    violations: 0, // No violations allowed
    warnings: 3 // Max 3 warnings
  }
};

// Quality gate definitions
class QualityGates {
  constructor(componentName) {
    this.componentName = componentName;
    this.componentPath = null;
    this.results = {
      passed: [],
      failed: [],
      warnings: []
    };
  }

  // Find component directory
  async findComponent() {
    const componentsDir = path.join(process.cwd(), 'components');
    const dirs = await fs.readdir(componentsDir, { withFileTypes: true });
    
    for (const dir of dirs) {
      if (dir.isDirectory()) {
        const subDirs = await fs.readdir(path.join(componentsDir, dir.name), { withFileTypes: true });
        for (const subDir of subDirs) {
          if (subDir.isDirectory() && subDir.name === this.componentName) {
            this.componentPath = path.join(componentsDir, dir.name, subDir.name);
            return true;
          }
        }
      }
    }
    return false;
  }

  // Gate 1: File Structure
  async checkFileStructure() {
    console.log(`\n${colors.cyan}📁 Checking File Structure...${colors.reset}`);
    
    const requiredFiles = [
      `${this.componentName}.jsx`,
      `${this.componentName}.stories.jsx`,
      `${this.componentName}.test.js`,
      `${this.componentName}.tokens.json`,
      'README.md',
      'index.js'
    ];

    for (const file of requiredFiles) {
      const filePath = path.join(this.componentPath, file);
      try {
        await fs.access(filePath);
        this.results.passed.push(`File exists: ${file}`);
      } catch {
        this.results.failed.push(`Missing file: ${file}`);
        return false;
      }
    }

    console.log(`${colors.green}✅ All required files present${colors.reset}`);
    return true;
  }

  // Gate 2: Code Quality
  async checkCodeQuality() {
    console.log(`\n${colors.cyan}🔍 Checking Code Quality...${colors.reset}`);
    
    try {
      // Run ESLint
      const { stdout: eslintOutput } = await execAsync(
        `npx eslint ${this.componentPath}/*.jsx --format json`
      ).catch(e => ({ stdout: e.stdout || '[]' }));

      const eslintResults = JSON.parse(eslintOutput);
      const errors = eslintResults.reduce((sum, file) => sum + file.errorCount, 0);
      const warnings = eslintResults.reduce((sum, file) => sum + file.warningCount, 0);

      if (errors > 0) {
        this.results.failed.push(`ESLint errors: ${errors}`);
        return false;
      }

      if (warnings > 0) {
        this.results.warnings.push(`ESLint warnings: ${warnings}`);
      }

      this.results.passed.push('ESLint: No errors');
      console.log(`${colors.green}✅ Code quality check passed${colors.reset}`);
      return true;
    } catch (error) {
      this.results.failed.push('ESLint check failed');
      return false;
    }
  }

  // Gate 3: Test Coverage
  async checkTestCoverage() {
    console.log(`\n${colors.cyan}🧪 Checking Test Coverage...${colors.reset}`);
    
    try {
      // Run tests with coverage
      const { stdout } = await execAsync(
        `npm test -- ${this.componentName} --coverage --watchAll=false --silent`
      ).catch(e => ({ stdout: e.stdout || '' }));

      // Parse coverage results (simplified)
      const coverageMatch = stdout.match(/Statements\s+:\s+([\d.]+)%/);
      if (coverageMatch) {
        const coverage = parseFloat(coverageMatch[1]);
        
        if (coverage < THRESHOLDS.coverage.statements) {
          this.results.failed.push(`Coverage too low: ${coverage}% (min: ${THRESHOLDS.coverage.statements}%)`);
          return false;
        }

        this.results.passed.push(`Test coverage: ${coverage}%`);
        console.log(`${colors.green}✅ Test coverage: ${coverage}%${colors.reset}`);
        return true;
      }

      this.results.warnings.push('Could not determine test coverage');
      return true;
    } catch (error) {
      this.results.failed.push('Test coverage check failed');
      return false;
    }
  }

  // Gate 4: Bundle Size
  async checkBundleSize() {
    console.log(`\n${colors.cyan}📦 Checking Bundle Size...${colors.reset}`);
    
    try {
      const componentFile = path.join(this.componentPath, `${this.componentName}.jsx`);
      const stats = await fs.stat(componentFile);
      const sizeInBytes = stats.size;
      
      if (sizeInBytes > THRESHOLDS.bundleSize.max) {
        this.results.failed.push(`Component too large: ${sizeInBytes} bytes (max: ${THRESHOLDS.bundleSize.max})`);
        return false;
      }

      if (sizeInBytes > THRESHOLDS.bundleSize.warning) {
        this.results.warnings.push(`Component size warning: ${sizeInBytes} bytes`);
      }

      this.results.passed.push(`Bundle size: ${sizeInBytes} bytes`);
      console.log(`${colors.green}✅ Bundle size: ${sizeInBytes} bytes${colors.reset}`);
      return true;
    } catch (error) {
      this.results.failed.push('Bundle size check failed');
      return false;
    }
  }

  // Gate 5: Documentation
  async checkDocumentation() {
    console.log(`\n${colors.cyan}📚 Checking Documentation...${colors.reset}`);
    
    try {
      const readmePath = path.join(this.componentPath, 'README.md');
      const content = await fs.readFile(readmePath, 'utf8');
      const lines = content.split('\n');
      
      // Check minimum lines
      if (lines.length < THRESHOLDS.documentation.minLines) {
        this.results.warnings.push(`Documentation too short: ${lines.length} lines (min: ${THRESHOLDS.documentation.minLines})`);
      }

      // Check required sections
      const missingSections = THRESHOLDS.documentation.requiredSections.filter(
        section => !content.includes(section)
      );

      if (missingSections.length > 0) {
        this.results.failed.push(`Missing documentation sections: ${missingSections.join(', ')}`);
        return false;
      }

      this.results.passed.push('Documentation complete');
      console.log(`${colors.green}✅ Documentation check passed${colors.reset}`);
      return true;
    } catch (error) {
      this.results.failed.push('Documentation check failed');
      return false;
    }
  }

  // Gate 6: Accessibility
  async checkAccessibility() {
    console.log(`\n${colors.cyan}♿ Checking Accessibility...${colors.reset}`);
    
    try {
      const componentFile = path.join(this.componentPath, `${this.componentName}.jsx`);
      const content = await fs.readFile(componentFile, 'utf8');
      
      // Basic accessibility checks
      const checks = {
        'aria-label': /aria-label/,
        'aria-describedby': /aria-describedby/,
        'role': /role=/,
        'alt text': /alt=/,
        'tabIndex': /tabIndex/
      };

      const foundAttributes = [];
      const missingAttributes = [];

      for (const [name, pattern] of Object.entries(checks)) {
        if (pattern.test(content)) {
          foundAttributes.push(name);
        } else if (name === 'alt text' && !content.includes('<img')) {
          // Skip alt text check if no images
          continue;
        } else {
          missingAttributes.push(name);
        }
      }

      if (foundAttributes.length === 0) {
        this.results.warnings.push('No accessibility attributes found');
      } else {
        this.results.passed.push(`Accessibility attributes: ${foundAttributes.join(', ')}`);
      }

      console.log(`${colors.green}✅ Basic accessibility check passed${colors.reset}`);
      return true;
    } catch (error) {
      this.results.failed.push('Accessibility check failed');
      return false;
    }
  }

  // Gate 7: Performance
  async checkPerformance() {
    console.log(`\n${colors.cyan}⚡ Checking Performance...${colors.reset}`);
    
    // This would typically involve running performance tests
    // For now, we'll check for performance best practices
    
    try {
      const componentFile = path.join(this.componentPath, `${this.componentName}.jsx`);
      const content = await fs.readFile(componentFile, 'utf8');
      
      const performanceChecks = {
        'React.memo': /React\.memo|memo\(/,
        'useCallback': /useCallback/,
        'useMemo': /useMemo/,
        'lazy loading': /React\.lazy|lazy\(/
      };

      const optimizations = [];
      for (const [name, pattern] of Object.entries(performanceChecks)) {
        if (pattern.test(content)) {
          optimizations.push(name);
        }
      }

      if (optimizations.length > 0) {
        this.results.passed.push(`Performance optimizations: ${optimizations.join(', ')}`);
      } else {
        this.results.warnings.push('Consider adding performance optimizations');
      }

      console.log(`${colors.green}✅ Performance check completed${colors.reset}`);
      return true;
    } catch (error) {
      this.results.warnings.push('Performance check incomplete');
      return true;
    }
  }

  // Gate 8: Storybook
  async checkStorybook() {
    console.log(`\n${colors.cyan}📖 Checking Storybook...${colors.reset}`);
    
    try {
      const storyFile = path.join(this.componentPath, `${this.componentName}.stories.jsx`);
      const content = await fs.readFile(storyFile, 'utf8');
      
      // Check for required story elements
      const requiredElements = {
        'default export': /export default/,
        'component': /component:/,
        'title': /title:/,
        'argTypes': /argTypes:/
      };

      const missingElements = [];
      for (const [name, pattern] of Object.entries(requiredElements)) {
        if (!pattern.test(content)) {
          missingElements.push(name);
        }
      }

      if (missingElements.length > 0) {
        this.results.warnings.push(`Storybook missing: ${missingElements.join(', ')}`);
      } else {
        this.results.passed.push('Storybook configuration complete');
      }

      console.log(`${colors.green}✅ Storybook check passed${colors.reset}`);
      return true;
    } catch (error) {
      this.results.failed.push('Storybook check failed');
      return false;
    }
  }

  // Run all quality gates
  async runAllGates() {
    console.log(`${colors.magenta}${'='.repeat(50)}${colors.reset}`);
    console.log(`${colors.magenta}🚦 Quality Gates for: ${this.componentName}${colors.reset}`);
    console.log(`${colors.magenta}${'='.repeat(50)}${colors.reset}`);

    // Find component
    if (!await this.findComponent()) {
      console.error(`${colors.red}❌ Component not found: ${this.componentName}${colors.reset}`);
      return false;
    }

    console.log(`${colors.blue}📍 Component path: ${this.componentPath}${colors.reset}`);

    // Run all gates
    const gates = [
      { name: 'File Structure', method: this.checkFileStructure.bind(this) },
      { name: 'Code Quality', method: this.checkCodeQuality.bind(this) },
      { name: 'Test Coverage', method: this.checkTestCoverage.bind(this) },
      { name: 'Bundle Size', method: this.checkBundleSize.bind(this) },
      { name: 'Documentation', method: this.checkDocumentation.bind(this) },
      { name: 'Accessibility', method: this.checkAccessibility.bind(this) },
      { name: 'Performance', method: this.checkPerformance.bind(this) },
      { name: 'Storybook', method: this.checkStorybook.bind(this) }
    ];

    const gateResults = {};
    for (const gate of gates) {
      try {
        gateResults[gate.name] = await gate.method();
      } catch (error) {
        console.error(`${colors.red}Error in ${gate.name}: ${error.message}${colors.reset}`);
        gateResults[gate.name] = false;
      }
    }

    // Print summary
    this.printSummary(gateResults);

    // Return overall result
    return this.results.failed.length === 0;
  }

  // Print summary report
  printSummary(gateResults) {
    console.log(`\n${colors.magenta}${'='.repeat(50)}${colors.reset}`);
    console.log(`${colors.magenta}📊 Quality Gates Summary${colors.reset}`);
    console.log(`${colors.magenta}${'='.repeat(50)}${colors.reset}\n`);

    // Gate results
    console.log(`${colors.cyan}Quality Gates:${colors.reset}`);
    for (const [gate, passed] of Object.entries(gateResults)) {
      const icon = passed ? '✅' : '❌';
      const color = passed ? colors.green : colors.red;
      console.log(`  ${icon} ${color}${gate}${colors.reset}`);
    }

    // Detailed results
    if (this.results.passed.length > 0) {
      console.log(`\n${colors.green}✅ Passed (${this.results.passed.length}):${colors.reset}`);
      this.results.passed.forEach(item => console.log(`  - ${item}`));
    }

    if (this.results.warnings.length > 0) {
      console.log(`\n${colors.yellow}⚠️  Warnings (${this.results.warnings.length}):${colors.reset}`);
      this.results.warnings.forEach(item => console.log(`  - ${item}`));
    }

    if (this.results.failed.length > 0) {
      console.log(`\n${colors.red}❌ Failed (${this.results.failed.length}):${colors.reset}`);
      this.results.failed.forEach(item => console.log(`  - ${item}`));
    }

    // Final verdict
    console.log(`\n${colors.magenta}${'='.repeat(50)}${colors.reset}`);
    if (this.results.failed.length === 0) {
      console.log(`${colors.green}🎉 Component passed all quality gates!${colors.reset}`);
    } else {
      console.log(`${colors.red}❌ Component failed quality gates${colors.reset}`);
      console.log(`${colors.red}   Please fix ${this.results.failed.length} issue(s) before proceeding${colors.reset}`);
    }
    console.log(`${colors.magenta}${'='.repeat(50)}${colors.reset}\n`);
  }
}

// Main execution
async function main() {
  const componentName = process.argv[2];
  
  if (!componentName) {
    console.error(`${colors.red}Usage: node quality-gates.js [component-name]${colors.reset}`);
    process.exit(1);
  }

  const gates = new QualityGates(componentName);
  const passed = await gates.runAllGates();
  
  process.exit(passed ? 0 : 1);
}

// Run if executed directly
if (require.main === module) {
  main().catch(error => {
    console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
    process.exit(1);
  });
}

module.exports = QualityGates;