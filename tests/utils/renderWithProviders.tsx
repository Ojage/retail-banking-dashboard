import type { ReactNode } from "react";

import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import { i18n } from "@/lib/i18n";
import type { RootState } from "@/store";
import { bankingApi } from "@/store/api/bankingApi";
import { accountsReducer } from "@/store/slices/accountsSlice";
import { transactionsReducer } from "@/store/slices/transactionsSlice";
import { transferReducer } from "@/store/slices/transferSlice";
import { uiReducer } from "@/store/slices/uiSlice";

export function createTestStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: {
      accounts: accountsReducer,
      transactions: transactionsReducer,
      transfer: transferReducer,
      ui: uiReducer,
      [bankingApi.reducerPath]: bankingApi.reducer,
    },
    preloadedState: preloadedState as never,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bankingApi.middleware),
  });
}

type RenderWithProvidersOptions = {
  preloadedState?: Partial<RootState>;
};

export function TestWrapper({
  children,
  store,
}: {
  children: ReactNode;
  store?: ReturnType<typeof createTestStore>;
}) {
  const s = store ?? createTestStore();
  return (
    <Provider store={s}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </Provider>
  );
}

export function renderWithProviders(ui: ReactNode, options?: RenderWithProvidersOptions) {
  const store = createTestStore(options?.preloadedState);

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper }) };
}
