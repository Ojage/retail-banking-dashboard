import { configureStore } from "@reduxjs/toolkit";

import { bankingApi } from "./api/bankingApi";
import { loggerMiddleware } from "./middleware/loggerMiddleware";
import { transferAuditMiddleware } from "./middleware/transferAuditMiddleware";
import { accountsReducer } from "./slices/accountsSlice";
import { transactionsReducer } from "./slices/transactionsSlice";
import { transferReducer } from "./slices/transferSlice";
import { uiReducer } from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    transactions: transactionsReducer,
    transfer: transferReducer,
    ui: uiReducer,
    [bankingApi.reducerPath]: bankingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bankingApi.middleware)
      .concat(loggerMiddleware)
      .concat(transferAuditMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
