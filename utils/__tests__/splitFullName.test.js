const { splitFullName } = require("../splitFullName");

describe("splitFullName", () => {
  it("correctly splits a full name into first and last names", () => {
    const fullName = "John Doe";

    const result = splitFullName(fullName);

    expect(result).toEqual({
      firstName: "John",
      lastName: "Doe",
    });
  });

  it("handles a single-word name as the first name", () => {
    // Arrange
    const fullName = "Alice";

    // Act
    const result = splitFullName(fullName);

    // Assert
    expect(result).toEqual({
      firstName: "Alice",
      lastName: null,
    });
  });

  it("handles an empty string", () => {
    // Arrange
    const fullName = "";

    // Act
    const result = splitFullName(fullName);

    // Assert
    expect(result).toEqual({
      firstName: null,
      lastName: null,
    });
  });
});
