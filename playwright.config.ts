import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://app.somos.com',
    launchOptions: { devtools: process.env.PWDEBUG ? true : false },
    viewport: { width: 1920, height: 1080 },
    // trace: 'on-first-retry',
    trace: 'on'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      // one issue with this approach we have to make sure that we have WRITE access on the disc this tests are running on
      name: 'setup',
      use: { ...devices['Desktop Chrome'] },
      testMatch: 'tests/tfnr/setup/setup.spec.ts',
      testIgnore: ['tests/upp/login.spec.ts'],
    },
    {
      name: 'upp',
      use: { ...devices['Desktop Chrome'] },
      testMatch: 'tests/upp/login.spec.ts'
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/login.json'
      },
      testMatch: 'tests/tfnr/**/*.spec.ts',
      testIgnore: 'tests/tfnr/setup/setup.spec.ts',
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: '.auth/login.json'
      },
      testMatch: 'tests/tfnr/**/*.spec.ts',
      testIgnore: 'tests/tfnr/setup/setup.spec.ts',
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: '.auth/login.json'
      },
      testMatch: 'tests/tfnr/**/*.spec.ts',
      testIgnore: 'tests/tfnr/setup/setup.spec.ts',
      dependencies: ['setup'],
    },
  ]
});