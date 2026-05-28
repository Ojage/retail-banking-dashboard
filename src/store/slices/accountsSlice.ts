import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { Account, TransferResult } from "@/types";

type AccountsState = {
  accounts: Account[];
};

const initialState: AccountsState = {
  accounts: [],
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setAccounts(state, action: PayloadAction<Account[]>) {
      state.accounts = action.payload;
    },
    updateBalancesAfterTransfer(state, action: PayloadAction<TransferResult>) {
      const { updatedAccounts } = action.payload;
      if (!updatedAccounts) {
        return;
      }
      updatedAccounts.forEach((updated) => {
        const idx = state.accounts.findIndex((a) => a.id === updated.id);
        if (idx !== -1) {
          state.accounts[idx] = updated;
        }
      });
    },
  },
});

export const { setAccounts, updateBalancesAfterTransfer } = accountsSlice.actions;
export const accountsReducer = accountsSlice.reducer;
