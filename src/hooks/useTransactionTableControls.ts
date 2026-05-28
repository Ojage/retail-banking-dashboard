import {
  setSelectedAccount,
  setTransactionFilter,
  setTransactionSortOrder,
} from "@/store/slices/uiSlice";
import type { TransactionType } from "@/types";

import { useAppDispatch } from "./useAppDispatch";
import { useTypedSelector } from "./useTypedSelector";

type UseTransactionTableControlsReturn = {
  selectedAccountId: string | null;
  transactionFilter: TransactionType | "All";
  transactionSortOrder: "asc" | "desc";
  locale: "en" | "fr";
  selectAccount: (id: string | null) => void;
  setFilter: (filter: TransactionType | "All") => void;
  setSortOrder: (order: "asc" | "desc") => void;
};

export function useTransactionTableControls(): UseTransactionTableControlsReturn {
  const dispatch = useAppDispatch();
  const selectedAccountId = useTypedSelector((s) => s.ui.selectedAccountId);
  const transactionFilter = useTypedSelector((s) => s.ui.transactionFilter);
  const transactionSortOrder = useTypedSelector((s) => s.ui.transactionSortOrder);
  const locale = useTypedSelector((s) => s.ui.locale);

  return {
    selectedAccountId,
    transactionFilter,
    transactionSortOrder,
    locale,
    selectAccount: (id) => dispatch(setSelectedAccount(id)),
    setFilter: (filter) => dispatch(setTransactionFilter(filter)),
    setSortOrder: (order) => dispatch(setTransactionSortOrder(order)),
  };
}
