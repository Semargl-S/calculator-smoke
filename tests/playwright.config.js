const { defineConfig } = require('@playwright/test');
const path = require('path');

// Ensure locally-bundled system libs are found by the browser process.
const localLib = path.join(__dirname, 'lib');
process.env.LD_LIBRARY_PATH = `${localLib}:${process.env.LD_LIBRARY_PATH || ''}`;

module.exports = defineConfig({
  testDir: '.',
  use: {
    headless: true,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
