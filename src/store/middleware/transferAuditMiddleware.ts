import type { Middleware } from "@reduxjs/toolkit";

export const transferAuditMiddleware: Middleware = () => (next) => (action) => {
  const result = next(action);
  const actionType = (action as { type: string }).type;
  if (actionType.endsWith("/fulfilled") && actionType.includes("simulateTransfer")) {
    const payload = (
      action as { payload?: { fromAccountId?: string; toAccountId?: string; amount?: number } }
    ).payload;
    if (process.env.NODE_ENV !== "production") {
      console.log("[AUDIT]", {
        // eslint-disable-line no-console
        event: "TRANSFER_COMPLETED",
        fromId: payload?.fromAccountId,
        toId: payload?.toAccountId,
        amount: payload?.amount,
        timestamp: new Date().toISOString(),
      });
    }
  }
  return result;
};
