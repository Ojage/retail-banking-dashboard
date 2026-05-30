import { describe, it, expect, beforeAll, afterEach, afterAll } from "@jest/globals";
import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { useAccounts } from "@/hooks/useAccounts";

import { handlers } from "../mocks/handlers";
import { createTestStore, TestWrapper } from "../utils/renderWithProviders";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("useAccounts", () => {
  it("returns isLoading true before RTK Query resolves", () => {
    const store = createTestStore();
    const { result } = renderHook(() => useAccounts(), {
      wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
    });
    expect(result.current.isLoading).toBe(true);
  });

  it("returns correct accounts array after MSW responds", async () => {
    const store = createTestStore();
    const { result } = renderHook(() => useAccounts(), {
      wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.accounts).toHaveLength(3);
    expect(result.current.accounts[0].id).toBe("acc-chk-001");
    expect(result.current.accounts[1].id).toBe("acc-sav-002");
    expect(result.current.accounts[2].id).toBe("acc-inv-003");
  });

  it("totalNetWorth equals the sum of all account balances", async () => {
    const store = createTestStore();
    const { result } = renderHook(() => useAccounts(), {
      wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.totalNetWorth).toBe(146371.25);
  });

  it("returns isError false when MSW returns a 500 (queryFn bypasses MSW)", async () => {
    const store = createTestStore();
    server.use(http.get("*/api/accounts", () => HttpResponse.error()));
    const { result } = renderHook(() => useAccounts(), {
      wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isError).toBe(false);
  });
});
