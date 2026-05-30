import { describe, it, expect } from "@jest/globals";

import { GET } from "@/app/api/metrics/route";

describe("GET /api/metrics", () => {
  it("returns status 200", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
  });

  it("returns Content-Type text/plain with version", async () => {
    const response = await GET();
    expect(response.headers.get("Content-Type")).toBe("text/plain; version=0.0.4");
  });

  it("response body contains transfer_success_total", async () => {
    const response = await GET();
    const body = await response.text();
    expect(body).toContain("transfer_success_total");
  });

  it("response body is valid Prometheus text format", async () => {
    const response = await GET();
    const body = await response.text();
    const lines = body.trim().split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("#")) {
        continue;
      }
      expect(trimmed).toMatch(/^[a-zA-Z_][a-zA-Z0-9_]+\s+[\d.]+$/);
    }
  });
});
