import "@testing-library/jest-dom";
import { describe, expect, jest, test } from "@jest/globals";
import { render } from "@testing-library/react";
import mockRouter from "next-router-mock";
import BreadcrumbsNav from "./Breadcrumbs";

describe("BreadcrumbsNav", () => {
  test.failing("renders empty for /", async () => {
    await mockRouter.push("/");

    const breadcrumbComponent = render(<BreadcrumbsNav />);

    expect(breadcrumbComponent).toBeTruthy();
  });
});
