import type { Middleware } from "@reduxjs/toolkit";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transferAuditMiddleware: Middleware<Record<string, never>, any> =
  () => (next) => (action) => {
    const result = next(action);
    const actionType = (action as { type: string }).type;
    if (actionType.endsWith("/fulfilled") && actionType.includes("simulateTransfer")) {
      const payload = (
        action as { payload?: { fromAccountId?: string; toAccountId?: string; amount?: number } }
      ).payload;
      console.log("[AUDIT]", {
        // eslint-disable-line no-console
        event: "TRANSFER_COMPLETED",
        fromId: payload?.fromAccountId,
        toId: payload?.toAccountId,
        amount: payload?.amount,
        timestamp: new Date().toISOString(),
      });
    }
    return result;
  };
