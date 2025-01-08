import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  use: {
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    video: 'off',
    trace: 'retain-on-failure',
    headless: false,
  },
});
