import { jest } from "@jest/globals";
import "@testing-library/jest-dom"; // Adds expect matchers.

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock("next/router", () => require("next-router-mock"));
