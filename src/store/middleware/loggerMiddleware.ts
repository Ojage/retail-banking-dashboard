import type { Middleware } from "@reduxjs/toolkit";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loggerMiddleware: Middleware<Record<string, never>, any> =
  (store) => (next) => (action) => {
    if (process.env.NODE_ENV === "development") {
      const prevState = store.getState() as Record<string, unknown>;
      console.log(`[Action] ${(action as { type: string }).type} @ ${new Date().toISOString()}`); // eslint-disable-line no-console
      console.log("[State shape]", Object.keys(prevState)); // eslint-disable-line no-console
    }
    return next(action);
  };
