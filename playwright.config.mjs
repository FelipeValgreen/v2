import { defineConfig } from "@playwright/test";

const port = 3211;
const externalBase = process.env.RINON_PLAYWRIGHT_BASE_URL?.replace(/\/$/, "") || "";
const localBase = `http://127.0.0.1:${port}`;
const navigationTimeout = externalBase ? 45000 : 30000;

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  retries: 0,
  workers: 1,
  reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
  use: {
    baseURL: externalBase || localBase,
    viewport: { width: 1440, height: 1000 },
    navigationTimeout,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  ...(externalBase ? {} : {
    webServer: {
      command: `npm run start -- -p ${port}`,
      url: localBase,
      reuseExistingServer: false,
      timeout: 60000,
      env: {
        RINON_INDEXABLE: "false",
        RINON_LEAD_WRITE_ENABLED: "false",
        RINON_PRODUCTION_TRACKING_ENABLED: "false"
      }
    }
  })
});
