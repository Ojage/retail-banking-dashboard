import { useMemo } from "react";

import type { Transaction } from "@/types";

import { useTransactions } from "./useTransactions";
import { useTypedSelector } from "./useTypedSelector";

type UseFilteredTransactionsReturn = {
  transactions: Transaction[];
  isLoading: boolean;
};

export function useFilteredTransactions(accountId: string): UseFilteredTransactionsReturn {
  const { transactions, isLoading } = useTransactions(accountId);
  const filter = useTypedSelector((s) => s.ui.transactionFilter);
  const sortOrder = useTypedSelector((s) => s.ui.transactionSortOrder);

  const filtered = useMemo(() => {
    let result = filter === "All" ? transactions : transactions.filter((t) => t.type === filter);
    result = [...result].sort((a, b) => {
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sortOrder === "asc" ? diff : -diff;
    });
    return result;
  }, [transactions, filter, sortOrder]);

  return { transactions: filtered, isLoading };
}
