/* eslint-disable react/jsx-key */
import "@testing-library/jest-dom";
import { describe, expect, test } from "@jest/globals";
import { transformPaths } from "./transformBreadCrumbs";
import { Student } from "./usePersonData";

describe("transformPaths", () => {
  test("empty path", () => {
    const actual = transformPaths({ fullPath: "/", personData: undefined });

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
      personData: undefined,
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
      personData: { first_name: "Alia", last_name: "Atreides" } as Student,
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
      personData: { first_name: "Alia", last_name: "Atreides" } as Student,
    });

    expect(actual).toEqual(expected);
  });
});
