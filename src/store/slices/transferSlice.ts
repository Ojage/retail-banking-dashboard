import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { TransferStatus } from "@/types";

type TransferState = {
  status: TransferStatus;
  error: string | null;
};

const initialState: TransferState = {
  status: "idle",
  error: null,
};

const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {
    setTransferStatus(state, action: PayloadAction<TransferStatus>) {
      state.status = action.payload;
    },
    setTransferError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetTransfer(state) {
      state.status = "idle";
      state.error = null;
    },
  },
});

export const { setTransferStatus, setTransferError, resetTransfer } = transferSlice.actions;
export const transferReducer = transferSlice.reducer;
