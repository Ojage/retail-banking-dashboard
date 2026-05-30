import { describe, it, expect, beforeAll, afterEach, afterAll, jest } from "@jest/globals";
import { renderHook, waitFor, act } from "@testing-library/react";
import { setupServer } from "msw/node";

import { useTransfer } from "@/hooks/useTransfer";

import { mockAccounts } from "../fixtures/accounts";
import {
  validTransferPayload,
  sameAccountPayload,
  excessiveAmountPayload,
} from "../fixtures/transferPayloads";
import { handlers, resetAccountsState } from "../mocks/handlers";
import { createTestStore, TestWrapper } from "../utils/renderWithProviders";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  resetAccountsState();
});
afterAll(() => server.close());

function createTransferFormValues(payload: typeof validTransferPayload) {
  return {
    fromAccountId: payload.fromAccountId,
    toAccountId: payload.toAccountId,
    amount: payload.amount,
  };
}

describe("useTransfer", () => {
  it("initial return has status idle, no errors", () => {
    const store = createTestStore();
    const { result } = renderHook(() => useTransfer(mockAccounts), {
      wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
    });
    expect(result.current.status).toBe("idle");
    expect(result.current.serverError).toBeNull();
  });

  it("submitting with same account populates toAccountId error", async () => {
    const store = createTestStore();
    const { result } = renderHook(() => useTransfer(mockAccounts), {
      wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
    });
    const values = createTransferFormValues(sameAccountPayload);
    act(() => {
      const ctrl = result.current.control as unknown as Record<string, unknown>;
      const fv = ctrl._formValues as Record<string, unknown>;
      fv.fromAccountId = values.fromAccountId;
      fv.toAccountId = values.toAccountId;
      fv.amount = values.amount;
    });
    void act(() => {
      result.current.submit();
    });
    await waitFor(() => {
      expect(result.current.errors.toAccountId).toBeTruthy();
    });
  });

  it("submitting with amount exceeding balance sets serverError", async () => {
    const store = createTestStore();
    const { result } = renderHook(() => useTransfer(mockAccounts), {
      wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
    });
    const values = createTransferFormValues(excessiveAmountPayload);
    act(() => {
      const ctrl = result.current.control as unknown as Record<string, unknown>;
      const fv = ctrl._formValues as Record<string, unknown>;
      fv.fromAccountId = values.fromAccountId;
      fv.toAccountId = values.toAccountId;
      fv.amount = values.amount;
    });
    void act(() => {
      result.current.submit();
    });
    await waitFor(() => {
      expect(result.current.serverError).toBeTruthy();
      expect(result.current.serverError).toContain("Insufficient funds");
    });
  });

  it("submitting with valid payload transitions through loading to success", async () => {
    jest.spyOn(Math, "random").mockReturnValue(0.9);
    const fetchSpy = jest.spyOn(globalThis, "fetch").mockResolvedValue(new Response());
    const store = createTestStore();
    const { result } = renderHook(() => useTransfer(mockAccounts), {
      wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
    });
    const values = createTransferFormValues(validTransferPayload);
    act(() => {
      const ctrl = result.current.control as unknown as Record<string, unknown>;
      const fv = ctrl._formValues as Record<string, unknown>;
      fv.fromAccountId = values.fromAccountId;
      fv.toAccountId = values.toAccountId;
      fv.amount = values.amount;
    });
    void act(() => {
      result.current.submit();
    });
    await waitFor(
      () => {
        expect(result.current.status).toBe("success");
      },
      { timeout: 10000 }
    );
    expect(fetchSpy).toHaveBeenCalledWith("/api/metrics/increment", { method: "POST" });
    fetchSpy.mockRestore();
  });

  it("submitting when transfer fails sets error status", async () => {
    jest.spyOn(Math, "random").mockReturnValue(0.1);
    const store = createTestStore();
    const { result } = renderHook(() => useTransfer(mockAccounts), {
      wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
    });
    const values = createTransferFormValues(validTransferPayload);
    act(() => {
      const ctrl = result.current.control as unknown as Record<string, unknown>;
      const fv = ctrl._formValues as Record<string, unknown>;
      fv.fromAccountId = values.fromAccountId;
      fv.toAccountId = values.toAccountId;
      fv.amount = values.amount;
    });
    void act(() => {
      result.current.submit();
    });
    await waitFor(
      () => {
        expect(result.current.status).toBe("error");
      },
      { timeout: 10000 }
    );
    expect(result.current.serverError).toBe(
      "Transfer declined by the banking system. Please try again."
    );
  });

  it("reset restores all state to initial values", async () => {
    jest.spyOn(Math, "random").mockReturnValue(0.9);
    const fetchSpy = jest.spyOn(globalThis, "fetch").mockResolvedValue(new Response());
    const store = createTestStore();
    const { result } = renderHook(() => useTransfer(mockAccounts), {
      wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
    });
    const values = createTransferFormValues(validTransferPayload);
    act(() => {
      const ctrl = result.current.control as unknown as Record<string, unknown>;
      const fv = ctrl._formValues as Record<string, unknown>;
      fv.fromAccountId = values.fromAccountId;
      fv.toAccountId = values.toAccountId;
      fv.amount = values.amount;
    });
    void act(() => {
      result.current.submit();
    });
    await waitFor(
      () => {
        expect(result.current.status).toBe("success");
      },
      { timeout: 10000 }
    );
    act(() => {
      result.current.reset();
    });
    expect(result.current.status).toBe("idle");
    expect(result.current.serverError).toBeNull();
    fetchSpy.mockRestore();
  });
});
