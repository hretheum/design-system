#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const COMMANDS = {
  'test': 'npx playwright test',
  'test:headed': 'npx playwright test --headed',
  'test:debug': 'npx playwright test --debug',
  'test:ui': 'npx playwright test --ui',
  'update': 'npx playwright test --update-snapshots',
  'update:component': (component) => `npx playwright test --update-snapshots --grep="${component}"`,
  'report': 'npx playwright show-report',
  'install': 'npx playwright install',
};

async function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    console.log(chalk.blue(`🚀 Running: ${command} ${args.join(' ')}`));
    
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      cwd: process.cwd()
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
    
    child.on('error', (error) => {
      reject(error);
    });
  });
}

async function ensureStorybookBuild() {
  const storybookPath = path.join(process.cwd(), 'storybook-static');
  
  if (!fs.existsSync(storybookPath)) {
    console.log(chalk.yellow('📦 Building Storybook for visual tests...'));
    await runCommand('npm', ['run', 'build-storybook']);
    console.log(chalk.green('✅ Storybook build complete'));
  } else {
    console.log(chalk.green('✅ Storybook build already exists'));
  }
}

async function generateReport() {
  const resultsPath = path.join(process.cwd(), 'test-results');
  const reportPath = path.join(resultsPath, 'visual-test-report.json');
  
  if (fs.existsSync(reportPath)) {
    const results = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    
    console.log('\n' + chalk.bold('📊 Visual Test Results Summary:'));
    console.log(`Total Tests: ${results.stats.total}`);
    console.log(`Passed: ${chalk.green(results.stats.passed)}`);
    console.log(`Failed: ${chalk.red(results.stats.failed)}`);
    console.log(`Skipped: ${chalk.yellow(results.stats.skipped)}`);
    
    if (results.stats.failed > 0) {
      console.log('\n' + chalk.red('❌ Failed Tests:'));
      results.failures.forEach(failure => {
        console.log(`  - ${failure.test}`);
      });
    }
    
    console.log(`\n📈 View detailed report: ${chalk.blue('npx playwright show-report')}`);
  }
}

async function main() {
  const action = process.argv[2] || 'test';
  const componentFilter = process.argv[3];
  
  try {
    // Ensure Playwright is installed
    if (!fs.existsSync(path.join(process.cwd(), 'node_modules', '@playwright'))) {
      console.log(chalk.yellow('📦 Installing Playwright...'));
      await runCommand('npm', ['install', '@playwright/test']);
      await runCommand('npx', ['playwright', 'install']);
    }
    
    switch (action) {
      case 'test':
      case 'run':
        await ensureStorybookBuild();
        await runCommand('npx', ['playwright', 'test']);
        await generateReport();
        break;
        
      case 'headed':
      case 'debug':
        await ensureStorybookBuild();
        await runCommand('npx', ['playwright', 'test', '--headed']);
        break;
        
      case 'ui':
        await ensureStorybookBuild();
        await runCommand('npx', ['playwright', 'test', '--ui']);
        break;
        
      case 'update':
      case 'update-snapshots':
        await ensureStorybookBuild();
        if (componentFilter) {
          await runCommand('npx', ['playwright', 'test', '--update-snapshots', '--grep', componentFilter]);
        } else {
          await runCommand('npx', ['playwright', 'test', '--update-snapshots']);
        }
        break;
        
      case 'report':
        await runCommand('npx', ['playwright', 'show-report']);
        break;
        
      case 'install':
        await runCommand('npx', ['playwright', 'install']);
        break;
        
      case 'clean':
        console.log(chalk.yellow('🧹 Cleaning test results...'));
        const dirs = ['test-results', 'playwright-report'];
        dirs.forEach(dir => {
          const dirPath = path.join(process.cwd(), dir);
          if (fs.existsSync(dirPath)) {
            fs.rmSync(dirPath, { recursive: true, force: true });
            console.log(`Removed ${dir}`);
          }
        });
        console.log(chalk.green('✅ Cleanup complete'));
        break;
        
      case 'help':
      default:
        console.log(chalk.bold('\n📸 Visual Testing Commands:\n'));
        console.log('test             - Run all visual tests');
        console.log('headed           - Run tests with browser UI');
        console.log('ui               - Run tests with Playwright UI');
        console.log('update           - Update all visual snapshots');
        console.log('update <filter>  - Update snapshots for specific component');
        console.log('report           - Show test report');
        console.log('install          - Install Playwright browsers');
        console.log('clean            - Clean test results');
        console.log('help             - Show this help');
        console.log('\nExamples:');
        console.log('npm run visual:test');
        console.log('npm run visual:update Button');
        console.log('npm run visual:headed');
        break;
    }
    
  } catch (error) {
    console.error(chalk.red(`❌ Error: ${error.message}`));
    process.exit(1);
  }
}

main();