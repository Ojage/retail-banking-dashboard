import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import {
  transferSchema,
  type TransferFormValues,
  validateTransferBalance,
} from "@/lib/schemas/transferSchema";
import { useSimulateTransferMutation } from "@/store/api/bankingApi";
import { updateBalancesAfterTransfer } from "@/store/slices/accountsSlice";
import { appendTransferTransaction } from "@/store/slices/transactionsSlice";
import type { Account, TransferStatus } from "@/types";

import { useAppDispatch } from "./useAppDispatch";

export { Controller };

type UseTransferReturn = {
  control: ReturnType<typeof useForm<TransferFormValues>>["control"];
  submit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: ReturnType<typeof useForm<TransferFormValues>>["formState"]["errors"];
  status: TransferStatus;
  serverError: string | null;
  reset: () => void;
};

export function useTransfer(accounts: Account[]): UseTransferReturn {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: { fromAccountId: "", toAccountId: "", amount: 0 },
  });

  const [simulateTransfer] = useSimulateTransferMutation();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<TransferStatus>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const submit = handleSubmit(async (values) => {
    const balanceError = validateTransferBalance(values, accounts);
    if (balanceError) {
      setServerError(balanceError);
      return;
    }

    setStatus("loading");
    setServerError(null);

    try {
      const result = await simulateTransfer(values).unwrap();
      if (result.success) {
        dispatch(updateBalancesAfterTransfer(result));
        dispatch(appendTransferTransaction(values));
        setStatus("success");
        await fetch("/api/metrics/increment", { method: "POST" });
      } else {
        setStatus("error");
        setServerError(result.message);
      }
    } catch {
      setStatus("error");
      setServerError("An unexpected error occurred. Please try again.");
    }
  });

  return {
    control,
    submit,
    errors,
    status,
    serverError,
    reset: () => {
      reset();
      setStatus("idle");
      setServerError(null);
    },
  };
}
