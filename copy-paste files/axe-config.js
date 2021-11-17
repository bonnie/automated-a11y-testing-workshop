const axe = configureAxe({
  globalOptions: {
    rules: [
      {
        id: "img-alt-redundant",
        enabled: true,
        selector: "img",
        any: ["img-alt-redundant"],
        metadata: {
          description: "img alt tag cannot contain redundant words",
          help: "img alt tag cannot contain redundant words",
        },
      },
    ],
    checks: [
      {
        id: "img-alt-redundant",
        metadata: {
          impact: "minor",
          messages: {
            pass: "img alt tag does not contain redundant words",
            fail: "img alt tag contains one or more redundant words: photo, image, logo",
          },
        },
        evaluate(node) {
          const altAttribute = node.getAttribute("alt");
          return altAttribute && !altAttribute.match(/(photo|image|logo)/i);
        },
      },
    ],
  },
});
