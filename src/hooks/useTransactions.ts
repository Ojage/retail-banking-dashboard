import { useGetTransactionsQuery } from "@/store/api/bankingApi";
import type { Transaction } from "@/types";

type UseTransactionsReturn = {
  transactions: Transaction[];
  isLoading: boolean;
};

export function useTransactions(accountId: string): UseTransactionsReturn {
  const { data, isLoading } = useGetTransactionsQuery(accountId, { skip: !accountId });
  return { transactions: data ?? [], isLoading };
}
