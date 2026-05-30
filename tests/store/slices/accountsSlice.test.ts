import { describe, it, expect } from "@jest/globals";

import {
  accountsReducer,
  setAccounts,
  updateBalancesAfterTransfer,
} from "@/store/slices/accountsSlice";
import type { TransferResult } from "@/types";

import { mockAccounts } from "../../fixtures/accounts";

describe("accountsSlice", () => {
  it("initial state has empty accounts array", () => {
    const state = accountsReducer(undefined, { type: "@@init" });
    expect(state.accounts).toEqual([]);
  });

  it("setAccounts replaces the accounts array", () => {
    const state = accountsReducer(undefined, setAccounts(mockAccounts));
    expect(state.accounts).toHaveLength(2);
    expect(state.accounts[0].id).toBe("acc-chk-001");
  });

  it("updateBalancesAfterTransfer updates affected account balances", () => {
    const stateWithAccounts = accountsReducer(undefined, setAccounts(mockAccounts));
    const transferResult: TransferResult = {
      success: true,
      message: "ok",
      updatedAccounts: [
        { ...mockAccounts[0], balance: 11950.75 },
        { ...mockAccounts[1], balance: 39420.5 },
      ],
    };
    const state = accountsReducer(stateWithAccounts, updateBalancesAfterTransfer(transferResult));
    expect(state.accounts[0].balance).toBe(11950.75);
    expect(state.accounts[1].balance).toBe(39420.5);
    expect(state.accounts).toHaveLength(2);
  });

  it("updateBalancesAfterTransfer does not mutate state when success is false", () => {
    const stateWithAccounts = accountsReducer(undefined, setAccounts(mockAccounts));
    const original = stateWithAccounts.accounts[0].balance;
    const failedResult: TransferResult = {
      success: false,
      message: "failed",
    };
    const state = accountsReducer(stateWithAccounts, updateBalancesAfterTransfer(failedResult));
    expect(state.accounts[0].balance).toBe(original);
  });

  it("does not mutate the original state object", () => {
    const stateWithAccounts = accountsReducer(undefined, setAccounts(mockAccounts));
    const frozenState = Object.freeze({
      ...stateWithAccounts,
      accounts: Object.freeze([...stateWithAccounts.accounts]),
    });
    expect(() => {
      accountsReducer(frozenState, setAccounts(mockAccounts));
    }).not.toThrow();
  });
});
