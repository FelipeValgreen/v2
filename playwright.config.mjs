import { defineConfig } from "@playwright/test";

const port = 3211;

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  retries: 0,
  workers: 1,
  reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    viewport: { width: 1440, height: 1000 },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: `npm run start -- -p ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    timeout: 60000,
    env: {
      RINON_INDEXABLE: "false",
      RINON_LEAD_WRITE_ENABLED: "false",
      RINON_PRODUCTION_TRACKING_ENABLED: "false"
    }
  }
});
