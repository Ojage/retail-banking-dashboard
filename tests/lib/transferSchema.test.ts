import { describe, it, expect } from "@jest/globals";

import { transferSchema, validateTransferBalance } from "@/lib/schemas/transferSchema";

import { mockAccounts } from "../fixtures/accounts";
import {
  validTransferPayload,
  sameAccountPayload,
  zeroAmountPayload,
  negativeAmountPayload,
  highPrecisionPayload,
  invalidFromAccountPayload,
  invalidToAccountPayload,
} from "../fixtures/transferPayloads";

describe("transferSchema", () => {
  it("parses a valid payload with different accounts and positive amount", () => {
    const result = transferSchema.parse(validTransferPayload);
    expect(result.fromAccountId).toBe("acc-chk-001");
    expect(result.toAccountId).toBe("acc-sav-002");
    expect(result.amount).toBe(500);
  });

  it("fails when fromAccountId equals toAccountId", () => {
    expect(() => transferSchema.parse(sameAccountPayload)).toThrow();
    try {
      transferSchema.parse(sameAccountPayload);
    } catch (e: unknown) {
      const err = e as { issues: Array<{ path: string[]; message: string }> };
      const toIssue = err.issues.find((i) => i.path.includes("toAccountId"));
      expect(toIssue?.message).toMatch(/must be different/i);
    }
  });

  it("fails when amount is zero", () => {
    expect(() => transferSchema.parse(zeroAmountPayload)).toThrow();
    try {
      transferSchema.parse(zeroAmountPayload);
    } catch (e: unknown) {
      const err = e as { issues: Array<{ path: string[] }> };
      expect(err.issues.some((i) => i.path.includes("amount"))).toBe(true);
    }
  });

  it("fails when amount is negative", () => {
    expect(() => transferSchema.parse(negativeAmountPayload)).toThrow();
    try {
      transferSchema.parse(negativeAmountPayload);
    } catch (e: unknown) {
      const err = e as { issues: Array<{ path: string[] }> };
      expect(err.issues.some((i) => i.path.includes("amount"))).toBe(true);
    }
  });

  it("fails when amount has more than 2 decimal places", () => {
    expect(() => transferSchema.parse(highPrecisionPayload)).toThrow();
    try {
      transferSchema.parse(highPrecisionPayload);
    } catch (e: unknown) {
      const err = e as { issues: Array<{ path: string[] }> };
      expect(err.issues.some((i) => i.path.includes("amount"))).toBe(true);
    }
  });

  it("fails when fromAccountId is empty", () => {
    expect(() => transferSchema.parse(invalidFromAccountPayload)).toThrow();
  });

  it("fails when toAccountId is empty", () => {
    expect(() => transferSchema.parse(invalidToAccountPayload)).toThrow();
  });

  it("fails when amount is NaN", () => {
    expect(() => transferSchema.parse({ ...validTransferPayload, amount: NaN })).toThrow();
  });
});

describe("validateTransferBalance", () => {
  it("returns null when amount equals the from-account balance exactly", () => {
    const result = validateTransferBalance(
      { fromAccountId: "acc-chk-001", toAccountId: "acc-sav-002", amount: 12450.75 },
      mockAccounts
    );
    expect(result).toBeNull();
  });

  it("returns null when amount is less than the from-account balance", () => {
    const result = validateTransferBalance(
      { fromAccountId: "acc-chk-001", toAccountId: "acc-sav-002", amount: 100 },
      mockAccounts
    );
    expect(result).toBeNull();
  });

  it("returns an error string when amount exceeds the from-account balance", () => {
    const result = validateTransferBalance(
      { fromAccountId: "acc-chk-001", toAccountId: "acc-sav-002", amount: 20000 },
      mockAccounts
    );
    expect(result).toContain("Insufficient funds");
    expect(result).toContain("12450.75");
  });

  it("returns an error when fromAccountId does not match any account", () => {
    const result = validateTransferBalance(
      { fromAccountId: "acc-nonexistent", toAccountId: "acc-sav-002", amount: 100 },
      mockAccounts
    );
    expect(result).toBe("Source account not found");
  });
});
