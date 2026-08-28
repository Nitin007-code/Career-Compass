const request = require("supertest");
const app = require("../app");

/*
 * API Integration Test
 *
 * This test sends a real HTTP-style request through our
 * Express application without starting the actual server.
 *
 * This is why app.js exports the Express app separately
 * from server.js, which starts the server.
 */

describe("Health API", () => {

  test("GET /api/health should return server status", async () => {
    const response = await request(app)
      .get("/api/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe("healthy");
  });


  test("unknown API route should return an error", async () => {
    const response = await request(app)
      .get("/api/does-not-exist");

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

});