import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { Transaction, TransferPayload } from "@/types";

type TransactionsState = {
  byAccountId: Record<string, Transaction[] | undefined>;
};

const initialState: TransactionsState = {
  byAccountId: {},
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    appendTransferTransaction(state, action: PayloadAction<TransferPayload>) {
      const { fromAccountId, toAccountId, amount } = action.payload;
      const now = new Date().toISOString();
      const id = `txn-transfer-${Date.now()}`;

      const debitTx: Transaction = {
        id: `${id}-debit`,
        accountId: fromAccountId,
        date: now,
        description: `Transfer to account`,
        merchant: "RetBankX",
        amount,
        type: "Debit",
        category: "Transfer",
        status: "completed",
        reference: `REF-${id}-debit`,
      };
      const creditTx: Transaction = {
        id: `${id}-credit`,
        accountId: toAccountId,
        date: now,
        description: `Transfer from account`,
        merchant: "RetBankX",
        amount,
        type: "Credit",
        category: "Transfer",
        status: "completed",
        reference: `REF-${id}-credit`,
      };

      if (!state.byAccountId[fromAccountId]) {
        state.byAccountId[fromAccountId] = [];
      }
      if (!state.byAccountId[toAccountId]) {
        state.byAccountId[toAccountId] = [];
      }

      state.byAccountId[fromAccountId].unshift(debitTx);
      state.byAccountId[toAccountId].unshift(creditTx);
    },
  },
});

export const { appendTransferTransaction } = transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;
