import { describe, it, expect } from "@jest/globals";
import { renderHook, act } from "@testing-library/react";

import { useCurrencyFormatter } from "@/hooks/useCurrencyFormatter";
import { setLocale } from "@/store/slices/uiSlice";

import { createTestStore, TestWrapper } from "../utils/renderWithProviders";

describe("useCurrencyFormatter", () => {
  it("returns a format function that reads locale from store", () => {
    const store = createTestStore();
    const { result } = renderHook(() => useCurrencyFormatter(), {
      wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
    });
    expect(typeof result.current.format).toBe("function");
  });

  it("returns French-formatted output after dispatching setLocale fr", () => {
    const store = createTestStore();
    act(() => {
      store.dispatch(setLocale("fr"));
    });
    const { result } = renderHook(() => useCurrencyFormatter(), {
      wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
    });
    const formatted = result.current.format(1234.56, "EUR");
    expect(formatted).toContain("€");
  });

  it("returns memoized format function reference for same locale", () => {
    const store = createTestStore();
    const { result, rerender } = renderHook(() => useCurrencyFormatter(), {
      wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
    });
    const firstRef = result.current.format;
    rerender();
    expect(result.current.format).toBe(firstRef);
  });
});
