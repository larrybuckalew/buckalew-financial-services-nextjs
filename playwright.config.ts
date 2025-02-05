<<<<<<< HEAD
import { defineConfig, devices } from '@playwright/test';
=======
import { defineConfig } from '@playwright/test';
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
<<<<<<< HEAD
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    baseURL: 'http://localhost:3000',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    }
  ],
});
=======
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
});
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b
