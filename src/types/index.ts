export type AccountType = "checking" | "savings" | "investment" | "credit";

export type Account = {
  id: string;
  name: string;
  maskedNumber: string;
  balance: number;
  currency: string;
  type: AccountType;
  accountNumber: string;
  sortCode: string;
  status: "active" | "dormant" | "closed";
  sparklineData: number[];
  monthlyGrowth: number;
  trend: "up" | "down" | "stable";
};

export type TransactionType = "Credit" | "Debit";

export type TransactionStatus = "completed" | "pending" | "failed";

export type Transaction = {
  id: string;
  accountId: string;
  date: string;
  description: string;
  merchant: string;
  amount: number;
  type: TransactionType;
  category: string;
  status: TransactionStatus;
  reference: string;
};

export type TransferPayload = {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
};

export type TransferResult = {
  success: boolean;
  message: string;
  updatedAccounts?: Account[];
};

export type TransferStatus = "idle" | "loading" | "success" | "error";

export type UIState = {
  selectedAccountId: string | null;
  transactionFilter: TransactionType | "All";
  transactionSortOrder: "asc" | "desc";
  locale: "en" | "fr";
};

export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

export type AuthResult = {
  success: boolean;
  user?: User;
  error?: string;
};

export type ExpenseCategory = {
  name: string;
  value: number;
  color: string;
};

export type BalanceHistoryPoint = {
  date: string;
  balance: number;
};

export type MonthlyTransfer = {
  month: string;
  incoming: number;
  outgoing: number;
};

export type KPIData = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend: number;
  trendLabel: string;
  format: "currency" | "percentage" | "number";
};

export type AnalyticsData = {
  expenseCategories: ExpenseCategory[];
  balanceHistory: BalanceHistoryPoint[];
  monthlyTransfers: MonthlyTransfer[];
  kpis: KPIData[];
};

export type NotificationType = "success" | "info" | "warning" | "error";

export type AppNotification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
};

export type SearchResult = {
  id: string;
  type: "account" | "transaction";
  label: string;
  description: string;
  href: string;
};
