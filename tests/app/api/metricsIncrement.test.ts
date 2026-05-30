import { describe, it, expect, jest, beforeEach } from "@jest/globals";

function createNextResponse(body: string, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  return {
    status: init?.status ?? 200,
    headers,
    text: () => body,
    json: () => JSON.parse(body),
  };
}

jest.mock("next/server", () => {
  function NextResponse(body: string, init?: ResponseInit) {
    return createNextResponse(body, init);
  }
  NextResponse.json = (body: Record<string, unknown>, init?: ResponseInit) =>
    createNextResponse(JSON.stringify(body), init);
  NextResponse.text = (body: string, init?: ResponseInit) => createNextResponse(body, init);
  return { NextResponse };
});

const { POST } = require("@/app/api/metrics/increment/route");
const { GET } = require("@/app/api/metrics/route");
const { transferSuccessTotal } = require("@/lib/metrics");

describe("POST /api/metrics/increment", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns status 200", async () => {
    const response = await POST();
    expect(response.status).toBe(200);
  });

  it("GET returns counter value in text body", async () => {
    transferSuccessTotal.reset();
    await POST();
    const response = await GET();
    const body = await response.text();
    expect(body).toMatch(/transfer_success_total\s+1/);
  });

  it("increments counter three times", async () => {
    transferSuccessTotal.reset();
    await POST();
    await POST();
    await POST();
    const response = await GET();
    const body = await response.text();
    expect(body).toMatch(/transfer_success_total\s+3/);
  });
});
