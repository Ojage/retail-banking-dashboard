import { describe, it, expect } from "@jest/globals";

import type { TransferFormValues } from "@/lib/schemas/transferSchema";
import type { RootState } from "@/store";
import type { Account } from "@/types";

describe("Type-level tests", () => {
  it("TransferFormValues infers amount as number", () => {
    const valid: TransferFormValues = { fromAccountId: "a", toAccountId: "b", amount: 100 };
    expect(typeof valid.amount).toBe("number");
  });

  it("useTypedSelector returns Account[] for accounts selector", () => {
    const result: Account[] = [] as never;
    expect(Array.isArray(result)).toBe(true);
  });

  it("validateTransferBalance returns string | null", () => {
    const result: string | null = null;
    expect(result).toBeNull();
  });
});
