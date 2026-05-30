import { describe, it, expect, beforeAll, afterEach, afterAll } from "@jest/globals";
import { renderHook, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";

import { useFilteredTransactions } from "@/hooks/useFilteredTransactions";
import { setTransactionFilter, setTransactionSortOrder } from "@/store/slices/uiSlice";

import { handlers } from "../mocks/handlers";
import { createTestStore, TestWrapper } from "../utils/renderWithProviders";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("useFilteredTransactions", () => {
  it("with filter All and sort desc returns all transactions newest-first", async () => {
    const store = createTestStore();
    const { result } = renderHook(() => useFilteredTransactions("acc-chk-001"), {
      wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.transactions).toHaveLength(12);
    const dates = result.current.transactions.map((t) => new Date(t.date).getTime());
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i - 1]).toBeGreaterThanOrEqual(dates[i]);
    }
  });

  it("with filter Credit and sort asc returns only Credit transactions oldest-first", async () => {
    const store = createTestStore();
    const { result } = renderHook(() => useFilteredTransactions("acc-chk-001"), {
      wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    const credit = result.current.transactions.filter((t) => t.type === "Credit");
    expect(credit.length).toBeGreaterThan(0);
    expect(credit.every((t) => t.type === "Credit")).toBe(true);
  });

  it("responds to filter changes via dispatch", async () => {
    const store = createTestStore();
    store.dispatch(setTransactionFilter("Credit"));
    store.dispatch(setTransactionSortOrder("asc"));
    const { result } = renderHook(() => useFilteredTransactions("acc-chk-001"), {
      wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.transactions.every((t) => t.type === "Credit")).toBe(true);
  });
});
