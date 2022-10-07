import { PlaywrightTestConfig} from '@playwright/test';

const config: PlaywrightTestConfig = {
  
  testDir: './tests',

  workers: 5,
  // retries: 1,
  fullyParallel: true,

  timeout: 30 * 1000,
  
  expect: {
    timeout: 5000
  },
  
  reporter: 'html',
  
  use: {
    baseURL : "https://dev85236.service-now.com",
    extraHTTPHeaders : {
      "Authorization" : "Basic YWRtaW46bVR4MyRKZlJ3OVIh"
    }
  }
}

export default config;
