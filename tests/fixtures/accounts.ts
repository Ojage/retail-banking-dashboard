import type { Account } from "@/types";

export const mockAccounts: Account[] = [
  {
    id: "acc-chk-001",
    name: "Checking Account",
    maskedNumber: "****4821",
    balance: 12450.75,
    currency: "USD",
    type: "checking",
    accountNumber: "4821",
    sortCode: "01-02-03",
    status: "active",
    monthlyGrowth: 2.4,
    trend: "up",
    sparklineData: [11800, 11920, 12100, 12050, 12200, 12180, 12450],
  },
  {
    id: "acc-sav-002",
    name: "Savings Account",
    maskedNumber: "****9034",
    balance: 38920.5,
    currency: "USD",
    type: "savings",
    accountNumber: "9034",
    sortCode: "01-02-03",
    status: "active",
    monthlyGrowth: 1.8,
    trend: "up",
    sparklineData: [37200, 37500, 37800, 38100, 38400, 38650, 38920],
  },
];
