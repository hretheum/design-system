/**
 * Test Runner Configuration for Storybook
 * 
 * This file configures the test-runner behavior for interaction tests.
 * Tests are run using Playwright and can be executed locally or in CI/CD.
 * 
 * Run tests:
 *   npm run test:storybook
 * 
 * Run tests in CI:
 *   npm run test:storybook:ci
 */

const { getStoryContext } = require('@storybook/test-runner');

module.exports = {
  // Optional: Add custom setup before all tests
  async preVisit(page) {
    // Example: Set viewport size
    await page.setViewportSize({ width: 1280, height: 720 });
  },

  // Optional: Add custom logic after each story
  async postVisit(page, context) {
    // Example: Check for console errors
    const browserLogs = await page.evaluate(() => {
      return window.console.errors || [];
    });

    if (browserLogs.length > 0) {
      console.warn(`Console errors in story ${context.id}:`, browserLogs);
    }
  },

  // Optional: Custom tags to filter tests
  tags: {
    include: [],
    exclude: ['skip-test'],
  },
};
