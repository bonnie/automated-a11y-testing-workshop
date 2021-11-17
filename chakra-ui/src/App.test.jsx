import { render } from "@testing-library/react";
import { toHaveNoViolations } from "jest-axe";
import React from "react";

import axe from "../axe-helper";
import App from "./App";

expect.extend(toHaveNoViolations);

test("has no accessibility errors caught by jest-axe", async () => {
  const { container } = render(<App />);
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
