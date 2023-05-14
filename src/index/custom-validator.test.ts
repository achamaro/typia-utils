import { validator } from "./custom-validator";

describe("custom-validator", () => {
  it("required", () => {
    expect(validator.required(undefined)).toBe(false);
    expect(validator.required(null)).toBe(false);
    expect(validator.required([])).toBe(false);
    expect(validator.required("")).toBe(false);
    expect(validator.required("0")).toBe(true);
    expect(validator.required(0)).toBe(true);
  });
});
