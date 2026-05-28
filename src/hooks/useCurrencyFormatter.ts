import { useMemo } from "react";

import { formatCurrency } from "@/lib/formatting";

import { useTypedSelector } from "./useTypedSelector";

type UseCurrencyFormatterReturn = {
  format: (amount: number, currency: string) => string;
};

export function useCurrencyFormatter(): UseCurrencyFormatterReturn {
  const locale = useTypedSelector((s) => s.ui.locale);

  const format = useMemo(
    () => (amount: number, currency: string) => formatCurrency(amount, currency, locale),
    [locale]
  );

  return { format };
}
