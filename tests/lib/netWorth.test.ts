import { describe, it, expect } from "@jest/globals";

import { mockAccounts } from "../fixtures/accounts";

function computeNetWorth(accounts: Array<{ balance: number }>): number {
  return accounts.reduce((sum, a) => sum + a.balance, 0);
}

describe("netWorth calculation", () => {
  it("sums two positive balances correctly", () => {
    const total = computeNetWorth(mockAccounts);
    expect(total).toBe(12450.75 + 38920.5);
  });

  it("handles zero balance accounts", () => {
    const accounts = [...mockAccounts, { balance: 0 }];
    const total = computeNetWorth(accounts);
    expect(total).toBe(12450.75 + 38920.5);
  });

  it("preserves floating-point precision", () => {
    const accounts = [{ balance: 1000.1 }, { balance: 2000.2 }];
    const total = computeNetWorth(accounts);
    expect(total).toBe(3000.3);
  });
});
