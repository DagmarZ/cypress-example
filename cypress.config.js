const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'jv114f',
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 30000,
  reporter: 'mochawesome',
  "env": {
    "url": 'https://rahulshettyacademy.com',
  },
  retries: {
    runMode: 1,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
    specPattern: 'cypress/integration/examples/*.js'
  },
});
