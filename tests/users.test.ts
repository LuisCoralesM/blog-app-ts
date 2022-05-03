describe("users controllers", () => {
  const fetch = require("node-fetch");
  const url = "http://localhost:5500";

  const { MOCK_AB } = require("./mocks/MOCK_AB");
  const { MOCK_ABC } = require("./mocks/MOCK_ABC");
  const { MOCK_NOABC } = require("./mocks/MOCK_NOABC");
  const { MOCK_TOSORT } = require("./mocks/MOCK_TOSORT");
  const { MOCK_ABD } = require("./mocks/MOCK_ABD");

  const { sortByAlphaName } = require("../src/controllers/users_controller");
  const { countABCNames } = require("../src/controllers/users_controller");
  const { filterABCNames } = require("../src/controllers/users_controller");

  test("countABCNames: returns true when data has 1 A names, 1 B names, 1 C names", () => {
    const obj = countABCNames(MOCK_ABC);
    const isEq = obj.a === 1 && obj.b === 1 && obj.c === 1;

    expect(isEq).toBe(true);
  });

  test("countABCNames: returns true when data has 1 A names, 1 B names, 0 C names", () => {
    const obj = countABCNames(MOCK_AB);
    const isEq = obj.a === 1 && obj.b === 1 && obj.c === 0;

    expect(isEq).toBe(true);
  });

  test("countABCNames: returns true when data has 0 A names, 0 B names, 0 C names", () => {
    const obj = countABCNames(MOCK_NOABC);
    const isEq = obj.a === 0 && obj.b === 0 && obj.c === 0;

    expect(isEq).toBe(true);
  });

  test("sortByAlphaName: returns true if sorted correctly", () => {
    const obj = sortByAlphaName(MOCK_TOSORT);
    const isOk = obj[0].first_name < obj[2].first_name;

    expect(isOk).toBe(true);
  });

  test("sortByAlphaName: returns false if there is nothing to sort ", () => {
    const obj = sortByAlphaName(MOCK_NOABC);
    const isOk = obj[0].first_name < obj[2].first_name;

    expect(isOk).toBe(false);
  });

  test("filterABCNames: returns true if there is abd and only get ab", () => {
    const obj = filterABCNames(MOCK_ABD);
    const isOk =
      obj[0].first_name.charAt(0).toLowerCase() === "a" &&
      obj[1].first_name.charAt(0).toLowerCase() === "b";

    expect(isOk).toBe(true);
  });

  test("filterABCNames: returns false if there nothing to filter", () => {
    const obj = filterABCNames(MOCK_NOABC);
    const isOk = obj.length > 0;

    expect(isOk).toBe(false);
  });
});
