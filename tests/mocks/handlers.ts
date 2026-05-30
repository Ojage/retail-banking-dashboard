import { http, HttpResponse } from "msw";

import type { TransferPayload, TransferResult, AnalyticsData } from "@/types";

import { mockAccounts } from "../fixtures/accounts";
import { mockTransactions } from "../fixtures/transactions";

const ANALYTICS_DATA: AnalyticsData = {
  expenseCategories: [
    { name: "Shopping", value: 3200, color: "#6366f1" },
    { name: "Dining", value: 2100, color: "#8b5cf6" },
  ],
  balanceHistory: [
    { date: "2026-01", balance: 138200 },
    { date: "2026-05", balance: 146371 },
  ],
  monthlyTransfers: [{ month: "Jan", incoming: 9200, outgoing: 7800 }],
  kpis: [
    {
      label: "Monthly Income",
      value: 10450,
      prefix: "$",
      trend: 8.2,
      trendLabel: "vs last month",
      format: "currency",
    },
  ],
};

let accountsState = mockAccounts.map((a) => ({ ...a }));

export const handlers = [
  http.get("*/api/auth/me", () =>
    HttpResponse.json({
      user: {
        id: "user-1",
        email: "john@example.com",
        name: "John Smith",
        createdAt: "2026-01-01T00:00:00Z",
      },
    })
  ),

  http.get("*/api/accounts", () => HttpResponse.json(accountsState.map((a) => ({ ...a })))),

  http.get("*/api/transactions/:accountId", ({ params }) => {
    const txns = mockTransactions[params.accountId as string] ?? [];
    return HttpResponse.json(txns);
  }),

  http.get("*/api/analytics", () => HttpResponse.json(ANALYTICS_DATA)),

  http.post("*/api/transfer", async ({ request }) => {
    const payload = (await request.json()) as TransferPayload;
    const fromIdx = accountsState.findIndex((a) => a.id === payload.fromAccountId);
    const toIdx = accountsState.findIndex((a) => a.id === payload.toAccountId);

    if (fromIdx === -1 || toIdx === -1) {
      return HttpResponse.json<TransferResult>({
        success: false,
        message: "One or more accounts not found.",
      });
    }

    accountsState = accountsState.map((a, i) => {
      if (i === fromIdx) {
        return { ...a, balance: a.balance - payload.amount };
      }
      if (i === toIdx) {
        return { ...a, balance: a.balance + payload.amount };
      }
      return a;
    });

    return HttpResponse.json<TransferResult>({
      success: true,
      message: "Transfer completed successfully.",
      updatedAccounts: accountsState,
    });
  }),

  http.post("*/api/metrics/increment", () => HttpResponse.json({ ok: true })),
];

export function resetAccountsState() {
  accountsState = mockAccounts.map((a) => ({ ...a }));
}
