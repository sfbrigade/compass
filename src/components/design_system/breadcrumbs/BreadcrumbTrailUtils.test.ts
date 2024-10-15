import { describe, expect, test } from "@jest/globals";
import { transformPaths } from "./BreadcrumbTrailUtils";
import { Student } from "@/components/breadcrumbs/StatefulBreadcrumbTrailContext";

describe("transformPaths", () => {
  test("empty path", () => {
    const actual = transformPaths({ fullPath: "/", contextData: undefined });

    expect(actual).toEqual([]);
  });

  test("/students", () => {
    const expected = [
      {
        name: "STUDENTS",
        path: "/students",
        linkable: true,
      },
    ];
    const actual = transformPaths({
      fullPath: "/students",
      contextData: undefined,
    });

    expect(actual).toEqual(expected);
  });

  test("/students/student-id", () => {
    const expected = [
      {
        name: "STUDENTS",
        path: "/students",
        linkable: true,
      },
      {
        name: "Alia Atreides",
        path: "/student-id",
        linkable: false,
      },
    ];
    const actual = transformPaths({
      fullPath: "/students/student-id",
      contextData: {
        person: { first_name: "Alia", last_name: "Atreides" } as Student,
      },
    });

    expect(actual).toEqual(expected);
  });

  test("/students/student-id/goals/goal-id", () => {
    const expected = [
      {
        name: "STUDENTS",
        path: "/students",
        linkable: true,
      },
      {
        name: "Alia Atreides",
        path: "/student-id",
        linkable: false,
      },
      {
        name: "GOALS",
        path: "/goals",
        linkable: true,
      },
      {
        name: "goal-id",
        path: "/goal-id",
        linkable: false,
      },
    ];
    const actual = transformPaths({
      fullPath: "/students/student-id/goals/goal-id",
      contextData: {
        person: { first_name: "Alia", last_name: "Atreides" } as Student,
      },
    });

    expect(actual).toEqual(expected);
  });
});
