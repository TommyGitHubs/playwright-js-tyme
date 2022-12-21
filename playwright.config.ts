import type { PlaywrightTestConfig } from '@playwright/test';
import { testConfig } from './testConfig';

const ENV = process.env.ENV;

if (!ENV || ![`dev`,`uat`].includes(ENV)) {
  console.log(`Please provide a correct environment value. Example "npx cross-env ENV=dev"`);
  process.exit();
}

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 920000,
  retries: 0,
  reporter: 'html',

  projects: [
    {
      name: 'Chrome',
      use: {
        browserName: `chromium`,
        channel: `chrome`,
        baseURL: testConfig[process.env.ENV],
        headless: true,

        screenshot: `on`,
        video: `on`,
        trace: `retain-on-failure`

      },
    },

    {
      name: 'Firefox',
      use: {
        browserName: `firefox`,
        baseURL: testConfig[process.env.ENV],
        headless: true,

        screenshot: `on`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
      },
    }
  ],
};

export default config;
