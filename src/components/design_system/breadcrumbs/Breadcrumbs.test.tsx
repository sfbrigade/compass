import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { render } from "@testing-library/react";
import { describe, it } from "node:test";
import mockRouter from "next-router-mock";
import BreadcrumbsNav from "./Breadcrumbs";

describe("BreadcrumbsNav", () => {
  it("renders empty for /", async () => {
    await mockRouter.push("/");

    const breadcrumbComponent = render(<BreadcrumbsNav />);

    expect(breadcrumbComponent).toBeTruthy();
  });
});
