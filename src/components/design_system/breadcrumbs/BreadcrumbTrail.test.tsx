import "@testing-library/jest-dom";
import { describe, expect, test } from "@jest/globals";
import { render } from "@testing-library/react";
import BreadcrumbTrail from "./BreadcrumbTrail";
import { Student } from "../../breadcrumbs/StatefulBreadcrumbTrailContext";

describe("BreadcrumbTrail", () => {
  test("renders empty for /", () => {
    const fullPath = "/";
    const contextData = undefined;

    const breadcrumbComponent = render(
      <BreadcrumbTrail fullPath={fullPath} contextData={contextData} />
    );

    expect(breadcrumbComponent).toMatchSnapshot();
  });

  test("renders empty for /students/student-id", () => {
    const fullPath = "/students/student-id";
    const contextData = {
      person: {
        first_name: "Alia",
        last_name: "Atreides",
      } as Student,
    };

    const breadcrumbComponent = render(
      <BreadcrumbTrail fullPath={fullPath} contextData={contextData} />
    );

    expect(breadcrumbComponent).toMatchSnapshot();
  });
});
