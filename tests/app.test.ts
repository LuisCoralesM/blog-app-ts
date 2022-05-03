describe("Check app", () => {
  const fetch = require("node-fetch");
  const url = "http://localhost:5500";

  test("The API is up", async () => {
    const res = await fetch(url + "/status");
    expect(res.status).toBe(200);
  });

  test("There is an existing connection to the DB", async () => {
    const res = await fetch(url + "/status");
    const data = await res.json();
    expect(data.count).not.toBe(undefined || null);
  });

  test("Route doesnt exist, send status 404", async () => {
    const res = await fetch(url + "/dsiad0a");
    expect(res.status).toBe(404);
  });
});
