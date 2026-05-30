import { describe, it, expect } from "@jest/globals";

import { transactionsReducer, appendTransferTransaction } from "@/store/slices/transactionsSlice";

describe("transactionsSlice", () => {
  it("initial state has empty record", () => {
    const state = transactionsReducer(undefined, { type: "@@init" });
    expect(state.byAccountId).toEqual({});
  });

  it("appendTransferTransaction adds Credit and Debit entries", () => {
    const payload = { fromAccountId: "acc-chk-001", toAccountId: "acc-sav-002", amount: 250 };
    const state = transactionsReducer(undefined, appendTransferTransaction(payload));

    expect(state.byAccountId["acc-chk-001"]).toHaveLength(1);
    expect(state.byAccountId["acc-sav-002"]).toHaveLength(1);

    const debit = state.byAccountId["acc-chk-001"]![0];
    expect(debit.type).toBe("Debit");
    expect(debit.amount).toBe(250);

    const credit = state.byAccountId["acc-sav-002"]![0];
    expect(credit.type).toBe("Credit");
    expect(credit.amount).toBe(250);

    expect(debit.id).toBeTruthy();
    expect(credit.id).toBeTruthy();
    expect(debit.date).toBeTruthy();
    expect(credit.date).toBeTruthy();
  });

  it("new entry is prepended when account already has transactions", () => {
    const firstPayload = { fromAccountId: "acc-chk-001", toAccountId: "acc-sav-002", amount: 100 };
    const firstState = transactionsReducer(undefined, appendTransferTransaction(firstPayload));

    const secondPayload = { fromAccountId: "acc-chk-001", toAccountId: "acc-sav-002", amount: 200 };
    const state = transactionsReducer(firstState, appendTransferTransaction(secondPayload));

    expect(state.byAccountId["acc-chk-001"]).toHaveLength(2);
    expect(state.byAccountId["acc-chk-001"]![0].amount).toBe(200);
    expect(state.byAccountId["acc-chk-001"]![1].amount).toBe(100);
  });
});
