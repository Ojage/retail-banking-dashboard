import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import type { MiddlewareAPI, Dispatch, AnyAction } from "@reduxjs/toolkit";

import { loggerMiddleware } from "@/store/middleware/loggerMiddleware";

describe("loggerMiddleware", () => {
  let consoleSpy: jest.Spied<typeof console.log>;
  let store: MiddlewareAPI;
  let next: Dispatch<AnyAction>;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = "development";
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {
      /* noop */
    });
    store = {
      getState: () => ({ accounts: [], transactions: {} }),
      dispatch: jest.fn(),
    } as never;
    next = jest.fn() as never;
  });

  it("calls console.log with action type", () => {
    const action = { type: "accounts/setAccounts" };
    loggerMiddleware(store)(next)(action);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("accounts/setAccounts"));
  });

  it("does not log balance values (only state keys)", () => {
    const action = { type: "accounts/setAccounts" };
    loggerMiddleware(store)(next)(action);
    const logCalls = consoleSpy.mock.calls.map((c) => String(c[0])).join(" ");
    expect(logCalls).not.toContain("12450");
  });

  it("calls next with the action", () => {
    const action = { type: "TEST_ACTION" };
    loggerMiddleware(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });
});
