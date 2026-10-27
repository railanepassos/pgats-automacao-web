const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    video: false,
    screenshotOnRunFailure: true,
    // Em CI o site é mais lento e instável; localmente (cypress open) não repete.
    retries: { runMode: 2, openMode: 0 },
    // Bloqueia anúncios que cobrem botões e deixam o teste instável.
    blockHosts: [
      '*.googlesyndication.com',
      '*.doubleclick.net',
      '*.googleadservices.com',
      '*.adtrafficquality.google',
      '*.google-analytics.com',
    ],
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportPageTitle: 'PGATS - Automação Web - Automation Exercise',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
});
