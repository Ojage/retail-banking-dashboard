import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { UIState, TransactionType } from "@/types";

const initialState: UIState = {
  selectedAccountId: null,
  transactionFilter: "All",
  transactionSortOrder: "desc",
  locale: "en",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedAccount(state, action: PayloadAction<string | null>) {
      state.selectedAccountId = action.payload;
    },
    setTransactionFilter(state, action: PayloadAction<TransactionType | "All">) {
      state.transactionFilter = action.payload;
    },
    setTransactionSortOrder(state, action: PayloadAction<"asc" | "desc">) {
      state.transactionSortOrder = action.payload;
    },
    setLocale(state, action: PayloadAction<"en" | "fr">) {
      state.locale = action.payload;
    },
  },
});

export const { setSelectedAccount, setTransactionFilter, setTransactionSortOrder, setLocale } =
  uiSlice.actions;
export const uiReducer = uiSlice.reducer;
