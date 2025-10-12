#!/usr/bin/env node

/**
 * Accessibility Token Validator
 * Validates that all accessibility requirements are met in the design system
 */

const fs = require('fs');
const path = require('path');

function loadTokens(filename) {
  const filePath = path.join(__dirname, '..', filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function validateTouchTargets(component) {
  const tests = [];
  const minMobile = 44;
  const minDesktop = 24;
  
  if (component.accessible?.button?.minHeight?.mobile) {
    const mobileHeight = parseInt(component.accessible.button.minHeight.mobile.value);
    tests.push({
      name: 'Button mobile touch target',
      pass: mobileHeight >= minMobile,
      actual: mobileHeight,
      required: minMobile,
      wcag: '2.5.5 Level AAA'
    });
  }
  
  if (component.accessible?.button?.minHeight?.desktop) {
    const desktopHeight = parseInt(component.accessible.button.minHeight.desktop.value);
    tests.push({
      name: 'Button desktop target',
      pass: desktopHeight >= minDesktop,
      actual: desktopHeight,
      required: minDesktop,
      wcag: '2.5.5 Level AA'
    });
  }
  
  return tests;
}

function validateFocusIndicators(accessibility) {
  const tests = [];
  const minWidth = 2;
  
  if (accessibility.focus?.visible?.outline?.width) {
    const width = parseInt(accessibility.focus.visible.outline.width.value);
    tests.push({
      name: 'Focus outline width',
      pass: width >= minWidth,
      actual: width,
      required: minWidth,
      wcag: '2.4.7 Level AA'
    });
  }
  
  return tests;
}

function validateTextSizes(accessibility) {
  const tests = [];
  const minSize = 16;
  
  if (accessibility.text?.size?.minimum) {
    const size = parseInt(accessibility.text.size.minimum.value);
    tests.push({
      name: 'Minimum text size',
      pass: size >= minSize,
      actual: size,
      required: minSize,
      wcag: '1.4.4 Level AA'
    });
  }
  
  return tests;
}

function runValidation() {
  console.log('\n♿ Accessibility Token Validator\n');
  console.log('━'.repeat(80));
  
  const component = loadTokens('component.json');
  const accessibility = loadTokens('accessibility.json');
  
  const allTests = [
    ...validateTouchTargets(component),
    ...validateFocusIndicators(accessibility),
    ...validateTextSizes(accessibility)
  ];
  
  let passed = 0;
  let failed = 0;
  
  allTests.forEach(test => {
    const icon = test.pass ? '✅' : '❌';
    const status = test.pass ? 'PASS' : 'FAIL';
    
    console.log(`${icon} ${test.name} (${test.wcag})`);
    console.log(`   Actual: ${test.actual}px | Required: ${test.required}px | ${status}`);
    console.log('');
    
    if (test.pass) {
      passed++;
    } else {
      failed++;
    }
  });
  
  console.log('━'.repeat(80));
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${allTests.length} tests\n`);
  
  if (failed > 0) {
    console.log('❌ Some accessibility requirements not met!\n');
    process.exit(1);
  }
  
  console.log('✅ All accessibility requirements met!\n');
  process.exit(0);
}

runValidation();
