import test from "ava";
import { transformPaths } from "./transformBreadcrumbs";
import { Student } from "./useBreadcrumbContext";

test("empty path", (t) => {
  const actual = transformPaths({ fullPath: "/", contextData: undefined });

  t.deepEqual(actual, []);
});

test("/students", (t) => {
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

  t.deepEqual(actual, expected);
});

test("/students/student-id", (t) => {
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

  t.deepEqual(actual, expected);
});

test("/students/student-id/goals/goal-id", (t) => {
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

  t.deepEqual(actual, expected);
});
