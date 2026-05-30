import { describe, it, expect, jest, beforeEach, afterEach } from "@jest/globals";
import type { MiddlewareAPI, Dispatch, AnyAction } from "@reduxjs/toolkit";

import { transferAuditMiddleware } from "@/store/middleware/transferAuditMiddleware";

describe("transferAuditMiddleware", () => {
  let consoleSpy: jest.Spied<typeof console.log>;
  let store: MiddlewareAPI;
  let next: Dispatch<AnyAction>;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {
      /* noop */
    });
    store = {
      getState: () => ({}),
      dispatch: jest.fn(),
    } as never;
    next = jest.fn((action) => action) as never;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("logs a transfer fulfilled action", () => {
    const action = {
      type: "bankingApi/executeQuery/simulateTransfer/fulfilled",
      payload: { fromAccountId: "acc-1", toAccountId: "acc-2", amount: 500 },
    };
    transferAuditMiddleware(store)(next)(action);
    expect(consoleSpy).toHaveBeenCalledWith(
      "[AUDIT]",
      expect.objectContaining({
        event: "TRANSFER_COMPLETED",
        fromId: "acc-1",
        toId: "acc-2",
        amount: 500,
      })
    );
  });

  it("does not log for non-transfer actions", () => {
    const action = { type: "accounts/setAccounts" };
    transferAuditMiddleware(store)(next)(action);
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("does not log for transfer rejected actions", () => {
    const action = {
      type: "bankingApi/executeQuery/simulateTransfer/rejected",
    };
    transferAuditMiddleware(store)(next)(action);
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("calls next and returns the result", () => {
    const action = { type: "SOME_ACTION" };
    const result = transferAuditMiddleware(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
    expect(result).toBe(action);
  });
});
