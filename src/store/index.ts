import { configureStore } from "@reduxjs/toolkit";

import { bankingApi } from "./api/bankingApi";
import { loggerMiddleware } from "./middleware/loggerMiddleware";
import { notificationMiddleware } from "./middleware/notificationMiddleware";
import { transferAuditMiddleware } from "./middleware/transferAuditMiddleware";
import { accountsReducer } from "./slices/accountsSlice";
import { notificationsReducer } from "./slices/notificationsSlice";
import { searchReducer } from "./slices/searchSlice";
import { transactionsReducer } from "./slices/transactionsSlice";
import { transferReducer } from "./slices/transferSlice";
import { uiReducer } from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    transactions: transactionsReducer,
    transfer: transferReducer,
    ui: uiReducer,
    notifications: notificationsReducer,
    search: searchReducer,
    [bankingApi.reducerPath]: bankingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bankingApi.middleware)
      .concat(loggerMiddleware)
      .concat(transferAuditMiddleware)
      .concat(notificationMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
