#!/usr/bin/env node

/**
 * WCAG Contrast Ratio Checker
 * Tests all color combinations in the design system for WCAG compliance
 */

const fs = require('fs');
const path = require('path');

// Color pairs to test
const testPairs = [
  // Light mode text
  { fg: 'neutral.900', bg: 'neutral.0', context: 'Light mode primary text', level: 'AAA' },
  { fg: 'neutral.600', bg: 'neutral.0', context: 'Light mode secondary text', level: 'AA' },
  { fg: 'neutral.500', bg: 'neutral.0', context: 'Light mode tertiary text', level: 'AA' },
  
  // Dark mode text
  { fg: 'neutral.50', bg: 'neutral.900', context: 'Dark mode primary text', level: 'AAA' },
  { fg: 'neutral.300', bg: 'neutral.900', context: 'Dark mode secondary text', level: 'AA' },
  
  // Interactive elements
  { fg: 'blue.600', bg: 'neutral.0', context: 'Primary button (light)', level: 'AA' },
  { fg: 'blue.400', bg: 'neutral.900', context: 'Primary button (dark)', level: 'AA' },
  
  // Feedback colors
  { fg: 'red.500', bg: 'neutral.0', context: 'Error state', level: 'AA' },
  { fg: 'green.500', bg: 'neutral.0', context: 'Success state', level: 'AA' },
  { fg: 'amber.500', bg: 'neutral.0', context: 'Warning state', level: 'AA' },
  { fg: 'blue.500', bg: 'neutral.0', context: 'Info state', level: 'AA' }
];

/**
 * Convert hex to RGB
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Calculate relative luminance
 */
function getLuminance(rgb) {
  const { r, g, b } = rgb;
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio
 */
function getContrastRatio(color1, color2) {
  const lum1 = getLuminance(hexToRgb(color1));
  const lum2 = getLuminance(hexToRgb(color2));
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check WCAG compliance
 */
function checkWCAG(ratio, level = 'AA', largeText = false) {
  const requirements = {
    'AA': largeText ? 3.0 : 4.5,
    'AAA': largeText ? 4.5 : 7.0
  };
  return ratio >= requirements[level];
}

/**
 * Get color value from tokens
 */
function getColorValue(colorPath, tokens) {
  const parts = colorPath.split('.');
  let value = tokens;
  
  for (const part of parts) {
    if (!value[part]) return null;
    value = value[part];
  }
  
  return value.value || value;
}

/**
 * Main test function
 */
function runContrastTests() {
  console.log('\n🎨 WCAG Contrast Ratio Checker\n');
  console.log('━'.repeat(80));
  
  // Load tokens
  const primitivesPath = path.join(__dirname, '..', 'primitives.json');
  const primitives = JSON.parse(fs.readFileSync(primitivesPath, 'utf8'));
  
  let passed = 0;
  let failed = 0;
  const failures = [];
  
  testPairs.forEach(test => {
    const fgColor = getColorValue(test.fg, primitives);
    const bgColor = getColorValue(test.bg, primitives);
    
    if (!fgColor || !bgColor) {
      console.log(`⚠️  Skipping ${test.context} - color not found`);
      return;
    }
    
    const ratio = getContrastRatio(fgColor, bgColor);
    const passes = checkWCAG(ratio, test.level);
    const icon = passes ? '✅' : '❌';
    const status = passes ? 'PASS' : 'FAIL';
    
    console.log(`${icon} ${test.context}`);
    console.log(`   ${test.fg} (${fgColor}) on ${test.bg} (${bgColor})`);
    console.log(`   Ratio: ${ratio.toFixed(2)}:1 | Required: ${test.level === 'AAA' ? '7.0' : '4.5'}:1 | ${status}`);
    console.log('');
    
    if (passes) {
      passed++;
    } else {
      failed++;
      failures.push({
        context: test.context,
        ratio: ratio.toFixed(2),
        required: test.level === 'AAA' ? '7.0' : '4.5',
        fg: test.fg,
        bg: test.bg
      });
    }
  });
  
  console.log('━'.repeat(80));
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${testPairs.length} tests\n`);
  
  if (failures.length > 0) {
    console.log('❌ Failed Tests:\n');
    failures.forEach(f => {
      console.log(`   • ${f.context}`);
      console.log(`     ${f.fg} on ${f.bg}: ${f.ratio}:1 (need ${f.required}:1)`);
    });
    console.log('');
    process.exit(1);
  }
  
  console.log('✅ All contrast tests passed!\n');
  process.exit(0);
}

// Run tests
runContrastTests();
