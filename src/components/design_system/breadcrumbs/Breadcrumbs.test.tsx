import "global-jsdom/register"; // https://nalanj.dev/posts/ava-and-react-testing-library/
import rewiremock from "rewiremock";
import test from "ava";
import BreadcrumbsNav from "./Breadcrumbs";
import { render, cleanup } from "@testing-library/react";
import React from "react";
import mockRouter from "next-router-mock";

// TODO Move this to global file as suggested here: <https://github.com/theKashey/rewiremock?tab=readme-ov-file#2-setup>
rewiremock.overrideEntryPoint(module); // this is important. This command is "transferring" this module parent to rewiremock

test.beforeEach(() => {
  rewiremock("next/router").with({
    useRouter: () => {
      return {
        pathname: "/",
        asPath: "",
      };
    },
  });

  rewiremock.enable();
});

test.afterEach(() => {
  rewiremock.disable();
  cleanup();
});

test("should be empty for /", (t) => {
  const component = render(<BreadcrumbsNav urlPath="/" />);
  // const component = render(
  //   React.createElement("BreadcrumbsNav", { urlPath: '/' } as BreadcrumbsNavProps)
  // );

  t.truthy(component, "Component rendered.");
});
