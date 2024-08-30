/* eslint-disable react/jsx-key */
import "@testing-library/jest-dom";
import { describe, expect, jest, test } from "@jest/globals";
import { transformPaths } from "./transformBreadCrumbs";
import { Student } from "./usePersonData";

// TODO Consider having transformPaths return a list of objects that can be tested without snapshots, and handle rendering in BreadcrumbNav or elsewhere.
describe("transformPaths", () => {
  test("empty path", () => {
    const actual = transformPaths({ fullPath: "/", personData: undefined });

    expect(actual).toMatchSnapshot();
  });

  test("/students", () => {
    const actual = transformPaths({
      fullPath: "/students",
      personData: undefined,
    });

    expect(actual).toMatchSnapshot();
  });

  test("/students/student-id", () => {
    const actual = transformPaths({
      fullPath: "/students/student-id",
      personData: { first_name: "Alia", last_name: "Atreides" } as Student,
    });

    expect(actual).toMatchSnapshot();
  });

  test("/students/student-id/goals/goal-id", () => {
    const actual = transformPaths({
      fullPath: "/students/student-id/goals/goal-id",
      personData: { first_name: "Alia", last_name: "Atreides" } as Student,
    });

    expect(actual).toMatchSnapshot();
  });
});
