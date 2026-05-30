import { describe, it, expect } from "@jest/globals";

import {
  transferReducer,
  setTransferStatus,
  setTransferError,
  resetTransfer,
} from "@/store/slices/transferSlice";

describe("transferSlice", () => {
  it("initial state is idle with no error", () => {
    const state = transferReducer(undefined, { type: "@@init" });
    expect(state.status).toBe("idle");
    expect(state.error).toBeNull();
  });

  it("setTransferStatus updates status to loading", () => {
    const state = transferReducer(undefined, setTransferStatus("loading"));
    expect(state.status).toBe("loading");
  });

  it("transitions through loading to success", () => {
    const loadingState = transferReducer(undefined, setTransferStatus("loading"));
    expect(loadingState.status).toBe("loading");
    const successState = transferReducer(loadingState, setTransferStatus("success"));
    expect(successState.status).toBe("success");
  });

  it("resetTransfer returns to idle with null error", () => {
    const errorState = transferReducer(undefined, setTransferStatus("error"));
    const withError = transferReducer(errorState, setTransferError("Something went wrong"));
    expect(withError.status).toBe("error");
    expect(withError.error).toBe("Something went wrong");
    const resetState = transferReducer(withError, resetTransfer());
    expect(resetState.status).toBe("idle");
    expect(resetState.error).toBeNull();
  });

  it("setTransferError populates the error field", () => {
    const state = transferReducer(undefined, setTransferError("Insufficient funds"));
    expect(state.error).toBe("Insufficient funds");
  });
});
