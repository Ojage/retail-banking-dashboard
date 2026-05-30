import type {
  Account,
  AnalyticsData,
  BalanceHistoryPoint,
  KPIData,
  Transaction,
  TransferPayload,
  TransferResult,
} from "@/types";

const delay = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

const ACCOUNTS: Account[] = [
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
  {
    id: "acc-inv-003",
    name: "Investment Portfolio",
    maskedNumber: "****2277",
    balance: 95000.0,
    currency: "USD",
    type: "investment",
    accountNumber: "2277",
    sortCode: "01-02-04",
    status: "active",
    monthlyGrowth: 5.2,
    trend: "up",
    sparklineData: [88000, 89100, 90500, 91800, 93000, 94200, 95000],
  },
];

const TRANSACTIONS: Record<string, Transaction[] | undefined> = {
  "acc-chk-001": [
    {
      id: "txn-001",
      accountId: "acc-chk-001",
      date: "2026-05-27T10:00:00Z",
      description: "Whole Foods Market",
      merchant: "Whole Foods",
      amount: 124.5,
      type: "Debit",
      category: "Groceries",
      status: "completed",
      reference: "REF-20260527-001",
    },
    {
      id: "txn-002",
      accountId: "acc-chk-001",
      date: "2026-05-26T14:30:00Z",
      description: "Payroll Deposit - Acme Corp",
      merchant: "Acme Corp",
      amount: 3500.0,
      type: "Credit",
      category: "Income",
      status: "completed",
      reference: "REF-20260526-001",
    },
    {
      id: "txn-003",
      accountId: "acc-chk-001",
      date: "2026-05-25T09:15:00Z",
      description: "Electric Bill Payment",
      merchant: "National Grid",
      amount: 87.2,
      type: "Debit",
      category: "Utilities",
      status: "completed",
      reference: "REF-20260525-001",
    },
    {
      id: "txn-004",
      accountId: "acc-chk-001",
      date: "2026-05-24T16:45:00Z",
      description: "Starbucks Coffee",
      merchant: "Starbucks",
      amount: 12.0,
      type: "Debit",
      category: "Dining",
      status: "completed",
      reference: "REF-20260524-001",
    },
    {
      id: "txn-005",
      accountId: "acc-chk-001",
      date: "2026-05-23T11:00:00Z",
      description: "Freelance Payment - DesignPro",
      merchant: "DesignPro",
      amount: 950.0,
      type: "Credit",
      category: "Income",
      status: "completed",
      reference: "REF-20260523-001",
    },
    {
      id: "txn-006",
      accountId: "acc-chk-001",
      date: "2026-05-22T13:20:00Z",
      description: "Shell Gas Station",
      merchant: "Shell",
      amount: 58.4,
      type: "Debit",
      category: "Transport",
      status: "completed",
      reference: "REF-20260522-001",
    },
    {
      id: "txn-007",
      accountId: "acc-chk-001",
      date: "2026-05-21T08:00:00Z",
      description: "Netflix Subscription",
      merchant: "Netflix",
      amount: 14.99,
      type: "Debit",
      category: "Entertainment",
      status: "completed",
      reference: "REF-20260521-001",
    },
    {
      id: "txn-008",
      accountId: "acc-chk-001",
      date: "2026-05-20T17:30:00Z",
      description: "The Capital Grille",
      merchant: "The Capital Grille",
      amount: 76.0,
      type: "Debit",
      category: "Dining",
      status: "completed",
      reference: "REF-20260520-001",
    },
    {
      id: "txn-009",
      accountId: "acc-chk-001",
      date: "2026-05-19T09:45:00Z",
      description: "ATM Withdrawal - Chase",
      merchant: "Chase",
      amount: 200.0,
      type: "Debit",
      category: "Cash",
      status: "completed",
      reference: "REF-20260519-001",
    },
    {
      id: "txn-010",
      accountId: "acc-chk-001",
      date: "2026-05-18T14:00:00Z",
      description: "IRS Tax Refund",
      merchant: "IRS",
      amount: 1250.0,
      type: "Credit",
      category: "Income",
      status: "completed",
      reference: "REF-20260518-001",
    },
    {
      id: "txn-011",
      accountId: "acc-chk-001",
      date: "2026-05-17T10:30:00Z",
      description: "CVS Pharmacy",
      merchant: "CVS",
      amount: 35.0,
      type: "Debit",
      category: "Health",
      status: "completed",
      reference: "REF-20260517-001",
    },
    {
      id: "txn-012",
      accountId: "acc-chk-001",
      date: "2026-05-16T16:00:00Z",
      description: "Amazon.com Purchase",
      merchant: "Amazon",
      amount: 199.99,
      type: "Debit",
      category: "Shopping",
      status: "completed",
      reference: "REF-20260516-001",
    },
  ],
  "acc-sav-002": [
    {
      id: "txn-101",
      accountId: "acc-sav-002",
      date: "2026-05-27T09:00:00Z",
      description: "Interest Payment",
      merchant: "RetBankX",
      amount: 48.5,
      type: "Credit",
      category: "Interest",
      status: "completed",
      reference: "REF-20260527-101",
    },
    {
      id: "txn-102",
      accountId: "acc-sav-002",
      date: "2026-05-25T10:00:00Z",
      description: "Transfer from Checking",
      merchant: "RetBankX",
      amount: 500.0,
      type: "Credit",
      category: "Transfer",
      status: "completed",
      reference: "REF-20260525-101",
    },
    {
      id: "txn-103",
      accountId: "acc-sav-002",
      date: "2026-05-23T14:00:00Z",
      description: "Emergency Fund Deposit",
      merchant: "RetBankX",
      amount: 1000.0,
      type: "Credit",
      category: "Transfer",
      status: "completed",
      reference: "REF-20260523-101",
    },
    {
      id: "txn-104",
      accountId: "acc-sav-002",
      date: "2026-05-21T11:00:00Z",
      description: "Vacation Fund Withdrawal",
      merchant: "RetBankX",
      amount: 750.0,
      type: "Debit",
      category: "Transfer",
      status: "completed",
      reference: "REF-20260521-101",
    },
    {
      id: "txn-105",
      accountId: "acc-sav-002",
      date: "2026-05-19T09:30:00Z",
      description: "Monthly Contribution",
      merchant: "RetBankX",
      amount: 1500.0,
      type: "Credit",
      category: "Transfer",
      status: "completed",
      reference: "REF-20260519-101",
    },
    {
      id: "txn-106",
      accountId: "acc-sav-002",
      date: "2026-05-17T16:00:00Z",
      description: "Interest Payment",
      merchant: "RetBankX",
      amount: 45.2,
      type: "Credit",
      category: "Interest",
      status: "completed",
      reference: "REF-20260517-101",
    },
    {
      id: "txn-107",
      accountId: "acc-sav-002",
      date: "2026-05-15T10:00:00Z",
      description: "Home Repair Fund",
      merchant: "RetBankX",
      amount: 2000.0,
      type: "Debit",
      category: "Transfer",
      status: "completed",
      reference: "REF-20260515-101",
    },
    {
      id: "txn-108",
      accountId: "acc-sav-002",
      date: "2026-05-13T13:00:00Z",
      description: "Bonus Deposit",
      merchant: "Acme Corp",
      amount: 3000.0,
      type: "Credit",
      category: "Income",
      status: "completed",
      reference: "REF-20260513-101",
    },
    {
      id: "txn-109",
      accountId: "acc-sav-002",
      date: "2026-05-11T09:00:00Z",
      description: "Monthly Contribution",
      merchant: "RetBankX",
      amount: 1500.0,
      type: "Credit",
      category: "Transfer",
      status: "completed",
      reference: "REF-20260511-101",
    },
    {
      id: "txn-110",
      accountId: "acc-sav-002",
      date: "2026-05-09T11:30:00Z",
      description: "Medical Expenses",
      merchant: "Mayo Clinic",
      amount: 450.0,
      type: "Debit",
      category: "Health",
      status: "completed",
      reference: "REF-20260509-101",
    },
    {
      id: "txn-111",
      accountId: "acc-sav-002",
      date: "2026-05-07T14:00:00Z",
      description: "Interest Payment",
      merchant: "RetBankX",
      amount: 42.8,
      type: "Credit",
      category: "Interest",
      status: "completed",
      reference: "REF-20260507-101",
    },
    {
      id: "txn-112",
      accountId: "acc-sav-002",
      date: "2026-05-05T10:00:00Z",
      description: "Transfer from Checking",
      merchant: "RetBankX",
      amount: 800.0,
      type: "Credit",
      category: "Transfer",
      status: "completed",
      reference: "REF-20260505-101",
    },
  ],
  "acc-inv-003": [
    {
      id: "txn-201",
      accountId: "acc-inv-003",
      date: "2026-05-27T08:00:00Z",
      description: "Dividend Payment - AAPL",
      merchant: "Apple Inc.",
      amount: 320.0,
      type: "Credit",
      category: "Dividends",
      status: "completed",
      reference: "REF-20260527-201",
    },
    {
      id: "txn-202",
      accountId: "acc-inv-003",
      date: "2026-05-24T09:00:00Z",
      description: "Stock Purchase - MSFT",
      merchant: "Microsoft Corp",
      amount: 5000.0,
      type: "Debit",
      category: "Investment",
      status: "completed",
      reference: "REF-20260524-201",
    },
    {
      id: "txn-203",
      accountId: "acc-inv-003",
      date: "2026-05-21T10:30:00Z",
      description: "Bond Interest",
      merchant: "US Treasury",
      amount: 250.0,
      type: "Credit",
      category: "Interest",
      status: "completed",
      reference: "REF-20260521-201",
    },
    {
      id: "txn-204",
      accountId: "acc-inv-003",
      date: "2026-05-18T11:00:00Z",
      description: "ETF Purchase - VTI",
      merchant: "Vanguard",
      amount: 3000.0,
      type: "Debit",
      category: "Investment",
      status: "completed",
      reference: "REF-20260518-201",
    },
    {
      id: "txn-205",
      accountId: "acc-inv-003",
      date: "2026-05-15T09:00:00Z",
      description: "Dividend Payment - KO",
      merchant: "Coca-Cola Co",
      amount: 180.0,
      type: "Credit",
      category: "Dividends",
      status: "completed",
      reference: "REF-20260515-201",
    },
    {
      id: "txn-206",
      accountId: "acc-inv-003",
      date: "2026-05-12T14:00:00Z",
      description: "Annual IRA Contribution",
      merchant: "RetBankX",
      amount: 10000.0,
      type: "Credit",
      category: "Income",
      status: "completed",
      reference: "REF-20260512-201",
    },
    {
      id: "txn-207",
      accountId: "acc-inv-003",
      date: "2026-05-09T10:00:00Z",
      description: "Mutual Fund Purchase",
      merchant: "Fidelity",
      amount: 4500.0,
      type: "Debit",
      category: "Investment",
      status: "completed",
      reference: "REF-20260509-201",
    },
    {
      id: "txn-208",
      accountId: "acc-inv-003",
      date: "2026-05-06T11:30:00Z",
      description: "Dividend Payment - JPM",
      merchant: "JPMorgan Chase",
      amount: 290.0,
      type: "Credit",
      category: "Dividends",
      status: "completed",
      reference: "REF-20260506-201",
    },
    {
      id: "txn-209",
      accountId: "acc-inv-003",
      date: "2026-05-03T09:00:00Z",
      description: "Stock Sale - TSLA",
      merchant: "Tesla Inc",
      amount: 7500.0,
      type: "Credit",
      category: "Investment",
      status: "completed",
      reference: "REF-20260503-201",
    },
    {
      id: "txn-210",
      accountId: "acc-inv-003",
      date: "2026-04-30T14:00:00Z",
      description: "Management Fee",
      merchant: "RetBankX",
      amount: 95.0,
      type: "Debit",
      category: "Fees",
      status: "completed",
      reference: "REF-20260430-201",
    },
    {
      id: "txn-211",
      accountId: "acc-inv-003",
      date: "2026-04-27T10:00:00Z",
      description: "Bond Purchase",
      merchant: "US Treasury",
      amount: 2000.0,
      type: "Debit",
      category: "Investment",
      status: "completed",
      reference: "REF-20260427-201",
    },
    {
      id: "txn-212",
      accountId: "acc-inv-003",
      date: "2026-04-24T11:00:00Z",
      description: "Dividend Reinvestment",
      merchant: "RetBankX",
      amount: 310.0,
      type: "Credit",
      category: "Dividends",
      status: "pending",
      reference: "REF-20260424-201",
    },
  ],
};

let accountsState: Account[] = [...ACCOUNTS];
const BASE_BALANCE_HISTORY: BalanceHistoryPoint[] = [
  { date: "2025-12", balance: 135000 },
  { date: "2026-01", balance: 138200 },
  { date: "2026-02", balance: 136800 },
  { date: "2026-03", balance: 142100 },
  { date: "2026-04", balance: 145300 },
];

const CATEGORY_COLORS: Record<string, string> = {
  Shopping: "#6366f1",
  Dining: "#8b5cf6",
  Transport: "#a78bfa",
  Utilities: "#c4b5fd",
  Entertainment: "#ddd6fe",
  Health: "#ede9fe",
  Groceries: "#10b981",
  Income: "#06b6d4",
  Investment: "#f97316",
  Dividends: "#8b5cf6",
  Interest: "#06b6d4",
  Fees: "#dc2626",
  Transfer: "#64748b",
  Cash: "#78716c",
};

export function fetchAnalyticsData(): AnalyticsData {
  const allTransactions = Object.values(TRANSACTIONS)
    .filter((v): v is Transaction[] => v !== undefined)
    .flat();
  const now = new Date();
  const currentMonth = now.toISOString().slice(0, 7);

  const totalBalance = accountsState.reduce((s, a) => s + a.balance, 0);

  const expenseMap: Record<string, number> = {};
  let totalIncome = 0;
  let totalExpenses = 0;
  let currentMonthTxns = 0;

  allTransactions.forEach((txn) => {
    const txnMonth = txn.date.slice(0, 7);
    if (txn.type === "Debit" && txn.category !== "Transfer") {
      expenseMap[txn.category] = (expenseMap[txn.category] || 0) + txn.amount;
      if (txnMonth === currentMonth) {
        totalExpenses += txn.amount;
      }
    }
    if (txn.type === "Credit" && txn.category !== "Transfer") {
      if (txnMonth === currentMonth) {
        totalIncome += txn.amount;
      }
    }
    if (txnMonth === currentMonth) {
      currentMonthTxns++;
    }
  });

  const expenseCategories = Object.entries(expenseMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([name, value]) => ({
      name,
      value: Math.round(value),
      color: CATEGORY_COLORS[name] || "#94a3b8",
    }));

  const balanceHistory: BalanceHistoryPoint[] = [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ...BASE_BALANCE_HISTORY,
    { date: currentMonth, balance: totalBalance },
  ];

  const transferMap: Record<string, { incoming: number; outgoing: number }> = {};
  allTransactions.forEach((txn) => {
    const d = new Date(txn.date);
    const monthLabel = d.toLocaleString("en-US", { month: "short" });
    if (!(monthLabel in transferMap)) {
      transferMap[monthLabel] = { incoming: 0, outgoing: 0 };
    }
    if (txn.category === "Transfer" && txn.type === "Credit") {
      transferMap[monthLabel].incoming += txn.amount;
    } else if (txn.category === "Transfer") {
      transferMap[monthLabel].outgoing += txn.amount;
    }
  });
  const monthlyTransfers = Object.entries(transferMap).map(([month, data]) => ({
    month,
    ...data,
  }));

  const kpis: KPIData[] = [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    {
      label: "Monthly Income",
      value: Math.round(totalIncome),
      trend: 8.2,
      trendLabel: "vs last month",
      format: "currency",
    },
    {
      label: "Monthly Expenses",
      value: Math.round(totalExpenses),
      trend: -3.1,
      trendLabel: "vs last month",
      format: "currency",
    },
    {
      label: "Savings Rate",
      value:
        totalIncome > 0
          ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100 * 10) / 10
          : 0,
      trend: 4.2,
      trendLabel: "vs last month",
      format: "percentage",
    },
    {
      label: "Total Transactions",
      value: currentMonthTxns,
      trend: currentMonthTxns > 0 ? 12 : 0,
      trendLabel: "this month",
      format: "number",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return { expenseCategories, balanceHistory, monthlyTransfers, kpis };
}

export function fetchAccounts(): Account[] {
  return [...accountsState];
}

export function fetchTransactions(accountId: string): Transaction[] {
  return TRANSACTIONS[accountId] ?? [];
}

export function addTransferTransaction(
  fromAccountId: string,
  toAccountId: string,
  amount: number
): void {
  const now = new Date().toISOString();
  const id = `txn-transfer-${Date.now()}`;

  const debitTx: Transaction = {
    id: `${id}-debit`,
    accountId: fromAccountId,
    date: now,
    description: `Transfer to account`,
    merchant: "RetBankX",
    amount,
    type: "Debit",
    category: "Transfer",
    status: "completed",
    reference: `REF-${id}-debit`,
  };
  const creditTx: Transaction = {
    id: `${id}-credit`,
    accountId: toAccountId,
    date: now,
    description: `Transfer from account`,
    merchant: "RetBankX",
    amount,
    type: "Credit",
    category: "Transfer",
    status: "completed",
    reference: `REF-${id}-credit`,
  };

  TRANSACTIONS[fromAccountId] = [debitTx, ...(TRANSACTIONS[fromAccountId] ?? [])];
  TRANSACTIONS[toAccountId] = [creditTx, ...(TRANSACTIONS[toAccountId] ?? [])];
}

export async function submitTransfer(payload: TransferPayload): Promise<TransferResult> {
  await delay(200);
  const success = Math.random() > 0.2;

  if (!success) {
    return {
      success: false,
      message: "Transfer declined by the banking system. Please try again.",
    };
  }

  const fromIdx = accountsState.findIndex((a) => a.id === payload.fromAccountId);
  const toIdx = accountsState.findIndex((a) => a.id === payload.toAccountId);

  if (fromIdx === -1 || toIdx === -1) {
    return { success: false, message: "One or more accounts not found." };
  }

  const updated = accountsState.map((a, i) => {
    if (i === fromIdx) {
      return { ...a, balance: a.balance - payload.amount };
    }
    if (i === toIdx) {
      return { ...a, balance: a.balance + payload.amount };
    }
    return a;
  });

  accountsState = updated;

  addTransferTransaction(payload.fromAccountId, payload.toAccountId, payload.amount);

  return { success: true, message: "Transfer completed successfully.", updatedAccounts: updated };
}
