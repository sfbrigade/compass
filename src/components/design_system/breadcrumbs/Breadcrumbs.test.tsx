import "@testing-library/jest-dom";
import { describe, expect, test } from "@jest/globals";
import { render } from "@testing-library/react";
import BreadcrumbsDesign from "./Breadcrumbs";
import { Student } from "./usePersonData";

describe("BreadcrumbsDesign", () => {
  test("renders empty for /", () => {
    const fullPath = "/";
    const personData = undefined;

    const breadcrumbComponent = render(
      <BreadcrumbsDesign fullPath={fullPath} personData={personData} />
    );

    expect(breadcrumbComponent).toMatchSnapshot();
  });

  test("renders empty for /students/student-id", () => {
    const fullPath = "/students/student-id";
    const personData = {
      first_name: "Alia",
      last_name: "Atreides",
    } as Student;

    const breadcrumbComponent = render(
      <BreadcrumbsDesign fullPath={fullPath} personData={personData} />
    );

    expect(breadcrumbComponent).toMatchSnapshot();
  });
});
