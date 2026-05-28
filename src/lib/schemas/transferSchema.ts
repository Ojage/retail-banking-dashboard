import { z } from "zod";

import type { Account } from "@/types";

export const transferSchema = z
  .object({
    fromAccountId: z.string().min(1, "Please select a source account"),
    toAccountId: z.string().min(1, "Please select a destination account"),
    amount: z
      .number({ invalid_type_error: "Amount must be a number" })
      .positive("Amount must be greater than zero")
      .multipleOf(0.01, "Amount must have at most 2 decimal places"),
  })
  .refine((data) => data.fromAccountId !== data.toAccountId, {
    message: "Source and destination accounts must be different",
    path: ["toAccountId"],
  });

export type TransferFormValues = z.infer<typeof transferSchema>;

export function validateTransferBalance(
  values: TransferFormValues,
  accounts: Account[]
): string | null {
  const from = accounts.find((a) => a.id === values.fromAccountId);
  if (!from) {
    return "Source account not found";
  }
  if (values.amount > from.balance) {
    return `Insufficient funds — available balance is ${from.balance.toFixed(2)}`;
  }
  return null;
}
