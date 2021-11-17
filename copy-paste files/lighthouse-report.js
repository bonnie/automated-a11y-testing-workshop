const writeLighthouseA11yReport = (report) => {
  // don't create a report if there were no violations
  if (report.artifacts.Accessibility.violations.length === 0) return;

  const reportString = report.artifacts.Accessibility.violations.reduce(
    (result, violation, vIndex) => {
      let vReport = "==============================================\n";
      vReport += `Issue ${vIndex + 1}\n`;
      vReport += `${violation.id}\n`;
      vReport += `impact: ${violation.impact}\n`;
      vReport += `tags: ${violation.tags}\n`;
      vReport += violation.nodes.reduce((nodeReport, node, nodeIndex) => {
        let n = `\tNode ${nodeIndex + 1}\n`;
        n += `\t\ttarget: ${node.target}\n`;
        n += `\t\tfailureSummary: ${node.failureSummary.replaceAll(
          "\n",
          "\n\t\t\t"
        )}\n`;
        n += `\t\tsnippet: ${node.node.snippet}\n`;
        n += `\t\tlabel: ${node.node.nodeLabel.replaceAll("\n", "\n\t\t\t")}\n`;
        return nodeReport + n;
      }, "");
      vReport += "\n";
      return result + vReport;
    },
    ""
  );

  const dateString = new Date().toISOString();
  const fileName = `cypress/reports/lighthouse-a11y-report-${dateString}`;

  fs.writeFile(fileName, reportString, (err) => {
    if (err) {
      console.err("--- ERROR: could not write lighthouse report:", err);
    } else {
      console.log("--- INFO: wrote report to", fileName);
    }
  });
};
