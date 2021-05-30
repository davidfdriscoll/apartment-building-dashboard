import formatDateAndTime from "./formatDateAndTime";

const now = 1617840940000;

describe("formatDateAndTime function", () => {
  it("correctly renders a sample time", () => {
    expect(formatDateAndTime(now)).toBe("Apr 7, 2021, 8:15:40 PM");
  });
});
