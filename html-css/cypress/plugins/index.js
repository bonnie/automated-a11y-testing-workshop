const { lighthouse, prepareAudit } = require("cypress-audit");
const lighthouseReport = require("./lighthouse-report");

module.exports = (on, config) => {
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on("task", {
    lighthouse: lighthouse(lighthouseReport), // calling the function is important
    // pa11y: pa11y(), // calling the function is important
  });
};
