"use client";

import { motion } from "framer-motion";

import StatusIndicator from "@/components/ui/StatusIndicator";
import { useAccounts } from "@/hooks/useAccounts";
import { useCurrencyFormatter } from "@/hooks/useCurrencyFormatter";
import { useTransactions } from "@/hooks/useTransactions";
import type { Transaction } from "@/types";

import styles from "./TransactionFeed.module.scss";

const CATEGORY_COLORS: Record<string, string> = {
  Income: "#10b981",
  Groceries: "#6366f1",
  Utilities: "#f59e0b",
  Dining: "#8b5cf6",
  Transport: "#3b82f6",
  Entertainment: "#ec4899",
  Shopping: "#14b8a6",
  Health: "#ef4444",
  Transfer: "#64748b",
  Interest: "#06b6d4",
  Dividends: "#8b5cf6",
  Investment: "#f97316",
  Cash: "#78716c",
  Fees: "#dc2626",
};

const MERCHANT_LOGOS: Record<string, string> = {
  "Whole Foods": "WF",
  "Acme Corp": "AC",
  "National Grid": "NG",
  Starbucks: "SB",
  DesignPro: "DP",
  Shell: "SH",
  Netflix: "NF",
  "The Capital Grille": "CG",
  Chase: "CH",
  IRS: "TX",
  CVS: "CV",
  Amazon: "AM",
  RetBankX: "RX",
  "Mayo Clinic": "MC",
  "Apple Inc.": "AP",
  "Microsoft Corp": "MS",
  "US Treasury": "TR",
  Vanguard: "VG",
  "Coca-Cola Co": "KO",
  Fidelity: "FD",
  "JPMorgan Chase": "JP",
  "Tesla Inc": "TS",
};

function TransactionRow({ transaction, index }: { transaction: Transaction; index: number }) {
  const { format } = useCurrencyFormatter();
  const isCredit = transaction.type === "Credit";
  const logo = MERCHANT_LOGOS[transaction.merchant] || transaction.merchant.charAt(0);

  return (
    <motion.div
      className={styles.txnRow}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
    >
      <div className={styles.txnMerchant}>
        <div
          className={styles.txnLogo}
          style={{ background: CATEGORY_COLORS[transaction.category] || "#64748b" }}
        >
          {logo}
        </div>
        <div className={styles.txnInfo}>
          <div className={styles.txnDescription}>{transaction.description}</div>
          <div className={styles.txnMeta}>
            <span className={styles.txnCategory}>{transaction.category}</span>
            <span className={styles.txnDot}>·</span>
            <span className={styles.txnDate}>
              {new Date(transaction.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.txnRight}>
        <div
          className={`${styles.txnAmount} ${isCredit ? styles.amountCredit : styles.amountDebit}`}
        >
          {isCredit ? "+" : "-"}
          {format(transaction.amount, "USD")}
        </div>
        <StatusIndicator
          type={
            transaction.status === "completed"
              ? "success"
              : transaction.status === "pending"
                ? "pending"
                : "error"
          }
        >
          {transaction.status}
        </StatusIndicator>
      </div>
    </motion.div>
  );
}

function TransactionSkeleton() {
  return (
    <div className={styles.feed}>
      <div className={styles.feedHeader}>Recent Activity</div>
      <div className={styles.txnList}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={styles.txnSkeleton}>
            <div
              className="premium-shimmer-dark"
              style={{ width: 36, height: 36, borderRadius: 10 }}
            />
            <div style={{ flex: 1 }}>
              <div
                className="premium-shimmer-dark"
                style={{ width: "60%", height: 12, marginBottom: 6, borderRadius: 4 }}
              />
              <div
                className="premium-shimmer-dark"
                style={{ width: "40%", height: 10, borderRadius: 4 }}
              />
            </div>
            <div>
              <div
                className="premium-shimmer-dark"
                style={{ width: 100, height: 12, marginBottom: 4, borderRadius: 4 }}
              />
              <div
                className="premium-shimmer-dark"
                style={{ width: 60, height: 10, borderRadius: 4, marginLeft: "auto" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TransactionFeed() {
  const { accounts } = useAccounts();
  const firstAccountId = accounts[0]?.id ?? "";
  const { transactions, isLoading } = useTransactions(firstAccountId);

  if (isLoading) {
    return <TransactionSkeleton />;
  }

  return (
    <motion.div
      className={styles.feed}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <div className={styles.feedHeader}>
        <span>Recent Activity</span>
        <span className={styles.feedCount}>{transactions.length} transactions</span>
      </div>
      <div className={styles.txnList}>
        {transactions.slice(0, 8).map((txn, idx) => (
          <TransactionRow key={txn.id} transaction={txn} index={idx} />
        ))}
      </div>
    </motion.div>
  );
}
