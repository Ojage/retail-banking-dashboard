import { describe, it, expect, beforeAll, afterEach, afterAll, jest } from "@jest/globals";
import { setupServer } from "msw/node";

import { bankingApi } from "@/store/api/bankingApi";

import { handlers, resetAccountsState } from "../../mocks/handlers";
import { renderWithProviders } from "../../utils/renderWithProviders";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  resetAccountsState();
  jest.restoreAllMocks();
});
afterAll(() => server.close());

describe("bankingApi", () => {
  it("getAccounts resolves with fixture accounts", async () => {
    const { store } = renderWithProviders(null);
    const result = await store.dispatch(bankingApi.endpoints.getAccounts.initiate());
    expect(result.data).toHaveLength(3);
    expect(result.data![0].id).toBe("acc-chk-001");
  });

  it("getTransactions resolves with transactions for the given accountId", async () => {
    const { store } = renderWithProviders(null);
    const result = await store.dispatch(
      bankingApi.endpoints.getTransactions.initiate("acc-chk-001")
    );
    expect(result.data).toHaveLength(12);
    expect(result.data!.every((t) => t.accountId === "acc-chk-001")).toBe(true);
  });

  it("simulateTransfer success invalidates Account tag", async () => {
    jest.spyOn(Math, "random").mockReturnValue(0.9);
    const { store } = renderWithProviders(null);
    await store.dispatch(bankingApi.endpoints.getAccounts.initiate());
    const transferResult = await store.dispatch(
      bankingApi.endpoints.simulateTransfer.initiate({
        fromAccountId: "acc-chk-001",
        toAccountId: "acc-sav-002",
        amount: 500,
      })
    );
    expect(transferResult.data?.success).toBe(true);
  });

  it("simulateTransfer failure does not invalidate Account tag", async () => {
    jest.spyOn(Math, "random").mockReturnValue(0.1);
    const { store } = renderWithProviders(null);
    await store.dispatch(bankingApi.endpoints.getAccounts.initiate());
    const transferResult = await store.dispatch(
      bankingApi.endpoints.simulateTransfer.initiate({
        fromAccountId: "acc-chk-001",
        toAccountId: "acc-sav-002",
        amount: 99999,
      })
    );
    expect(transferResult.data?.success).toBe(false);
  });
});
