const { lighthouse, pa11y, prepareAudit } = require("cypress-audit");
const writeLighthouseA11yReport = require("./lighthouse-report");

module.exports = (on, config) => {
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on("task", {
    lighthouse: lighthouse(writeLighthouseA11yReport),
  });
};
