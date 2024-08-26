import "@testing-library/jest-dom";
import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import { render } from "@testing-library/react";
import mockRouter from "next-router-mock";

// Based on: https://github.com/trpc/trpc/discussions/3612#discussion-4754448
jest.mock("@/client/lib/trpc", () => {
  return {
    trpc: {
      student: {
        getStudentById: {
          useQuery: jest.fn(() => {
            return jest.fn();
          }),
        },
      },
      para: {
        getParaById: {
          useQuery: jest.fn(() => {
            return jest.fn();
          }),
        },
      },
    },
  };
});

import BreadcrumbsNav from "./Breadcrumbs";
import { trpc } from "@/client/lib/trpc";

describe("BreadcrumbsNav", () => {
  test.failing("renders empty for /", async () => {
    await mockRouter.push("/");
    (trpc.student.getStudentById.useQuery as jest.Mock).mockReturnValueOnce({
      data: {},
    });
    (trpc.para.getParaById.useQuery as jest.Mock).mockReturnValueOnce({
      data: {},
    });

    const breadcrumbComponent = render(<BreadcrumbsNav />);

    expect(breadcrumbComponent).toBeTruthy();
  });
});
