import request from "supertest";
import app from "../app";
import { describe, expect, it } from "@jest/globals";

describe("App", () => {
  it("should respond with 404 for unknown route", async () => {
    const response = await request(app).get("/unknown-route");
    expect(response.status).toBe(404);
  });
});
