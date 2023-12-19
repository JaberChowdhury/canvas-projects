import { expect, test } from "vitest";
import testing from "./testing.js";

test("testing operation is passed", () => {
  expect(testing()).toBe("passed");
});
