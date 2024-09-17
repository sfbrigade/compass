import "global-jsdom/register"; // https://nalanj.dev/posts/ava-and-react-testing-library/
import test from "ava";
import BreadcrumbsDesign from "./Breadcrumbs";
import { render } from "@testing-library/react";
import React from "react";

/* FIXME When `Breadcrumbs.module.css` is not commented out, running test throws `SyntaxError: Unexpected token '.'`
    because it's attempting to parse the css file directly as TypeScript instead of importing the
    `Breadcrumbs.module.d.ts` file. */

/* FIXME Can't get TSX/JSX parsing to work with ava test runner:
    * If using separate `tsconfig-ava.json` file with `"jsx": "react"` option, the test fails with
      `ReferenceError: React is not defined` in BreadcrumbDesign.
    * If using default `tsconfig.json` file with `"jsx": "preserve"` option, the test fails with
      `Unexpected token '<'` because TSX files are not converted to JS before execution.
*/
test.failing("should be empty for /", (t) => {
  const fullPath = "/";
  const contextData = undefined;

  const breadcrumbComponent = render(
    <BreadcrumbsDesign fullPath={fullPath} contextData={contextData} />
  );

  // TODO Add more validation or use snapshots (https://github.com/avajs/ava/blob/main/docs/04-snapshot-testing.md).
  t.truthy(breadcrumbComponent, "Component rendered.");
});
