import type { Middleware } from "@reduxjs/toolkit";

import { updateBalancesAfterTransfer } from "@/store/slices/accountsSlice";
import { addNotification } from "@/store/slices/notificationsSlice";
import { appendTransferTransaction } from "@/store/slices/transactionsSlice";

export const notificationMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (updateBalancesAfterTransfer.match(action)) {
    store.dispatch(
      addNotification({
        type: "success",
        title: "Transfer completed",
        message: "Successfully transferred funds between accounts.",
      })
    );
  }

  if (appendTransferTransaction.match(action)) {
    const { amount } = action.payload;
    store.dispatch(
      addNotification({
        type: "info",
        title: "New transaction recorded",
        message: `A transfer of $${amount.toFixed(2)} has been recorded.`,
      })
    );
  }

  return result;
};
