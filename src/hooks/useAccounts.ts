import { useMemo } from "react";

import { useGetAccountsQuery } from "@/store/api/bankingApi";
import type { Account } from "@/types";

type UseAccountsReturn = {
  accounts: Account[];
  totalNetWorth: number;
  isLoading: boolean;
  isError: boolean;
};

export function useAccounts(): UseAccountsReturn {
  const { data, isLoading, isError } = useGetAccountsQuery();

  const accounts = useMemo(() => data ?? [], [data]);

  const totalNetWorth = useMemo(() => accounts.reduce((sum, a) => sum + a.balance, 0), [accounts]);

  return { accounts, totalNetWorth, isLoading, isError };
}
