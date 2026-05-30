import type { TransferPayload } from "@/types";

export const validTransferPayload: TransferPayload = {
  fromAccountId: "acc-chk-001",
  toAccountId: "acc-sav-002",
  amount: 500,
};

export const sameAccountPayload: TransferPayload = {
  fromAccountId: "acc-chk-001",
  toAccountId: "acc-chk-001",
  amount: 100,
};

export const excessiveAmountPayload: TransferPayload = {
  fromAccountId: "acc-chk-001",
  toAccountId: "acc-sav-002",
  amount: 99999,
};

export const zeroAmountPayload: TransferPayload = {
  fromAccountId: "acc-chk-001",
  toAccountId: "acc-sav-002",
  amount: 0,
};

export const negativeAmountPayload: TransferPayload = {
  fromAccountId: "acc-chk-001",
  toAccountId: "acc-sav-002",
  amount: -50,
};

export const highPrecisionPayload: TransferPayload = {
  fromAccountId: "acc-chk-001",
  toAccountId: "acc-sav-002",
  amount: 10.999,
};

export const invalidFromAccountPayload: TransferPayload = {
  fromAccountId: "",
  toAccountId: "acc-sav-002",
  amount: 100,
};

export const invalidToAccountPayload: TransferPayload = {
  fromAccountId: "acc-chk-001",
  toAccountId: "",
  amount: 100,
};
