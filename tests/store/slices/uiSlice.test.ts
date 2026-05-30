import { describe, it, expect } from "@jest/globals";

import {
  uiReducer,
  setSelectedAccount,
  setTransactionFilter,
  setTransactionSortOrder,
  setLocale,
} from "@/store/slices/uiSlice";

describe("uiSlice", () => {
  it("initial state has default values", () => {
    const state = uiReducer(undefined, { type: "@@init" });
    expect(state.selectedAccountId).toBeNull();
    expect(state.transactionFilter).toBe("All");
    expect(state.transactionSortOrder).toBe("desc");
    expect(state.locale).toBe("en");
  });

  it("setSelectedAccount updates the selected account ID", () => {
    const state = uiReducer(undefined, setSelectedAccount("acc-chk-001"));
    expect(state.selectedAccountId).toBe("acc-chk-001");
  });

  it("setSelectedAccount accepts null", () => {
    const withAccount = uiReducer(undefined, setSelectedAccount("acc-chk-001"));
    const state = uiReducer(withAccount, setSelectedAccount(null));
    expect(state.selectedAccountId).toBeNull();
  });

  it("setTransactionFilter cycles through filter values", () => {
    const all = uiReducer(undefined, setTransactionFilter("All"));
    expect(all.transactionFilter).toBe("All");
    const credit = uiReducer(all, setTransactionFilter("Credit"));
    expect(credit.transactionFilter).toBe("Credit");
    const debit = uiReducer(credit, setTransactionFilter("Debit"));
    expect(debit.transactionFilter).toBe("Debit");
  });

  it("setTransactionSortOrder toggles between asc and desc", () => {
    const desc = uiReducer(undefined, setTransactionSortOrder("desc"));
    expect(desc.transactionSortOrder).toBe("desc");
    const asc = uiReducer(desc, setTransactionSortOrder("asc"));
    expect(asc.transactionSortOrder).toBe("asc");
  });

  it("setLocale updates locale between en and fr", () => {
    const fr = uiReducer(undefined, setLocale("fr"));
    expect(fr.locale).toBe("fr");
    const en = uiReducer(fr, setLocale("en"));
    expect(en.locale).toBe("en");
  });
});
