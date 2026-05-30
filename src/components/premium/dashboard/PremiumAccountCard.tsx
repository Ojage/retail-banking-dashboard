"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { useCurrencyFormatter } from "@/hooks/useCurrencyFormatter";
import type { Account } from "@/types";

import styles from "./PremiumAccountCard.module.scss";

const ACCOUNT_GRADIENTS: Record<string, string> = {
  checking: "premium-gradient-blue",
  savings: "premium-gradient-green",
  investment: "premium-gradient-purple",
  credit: "premium-gradient-amber",
};

const ACCOUNT_ICONS: Record<string, React.ReactNode> = {
  checking: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  ),
  savings: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  investment: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  credit: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
};

function AccountSparkline({ data, trend }: { data: number[]; trend: string }) {
  const width = 80;
  const height = 28;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const color = trend === "up" ? "#34d399" : trend === "down" ? "#ef4444" : "#94a3b8";

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={styles.sparkline}
    >
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

function AccountCardSkeleton() {
  return (
    <div className={styles.cardSkeleton}>
      <div
        className="premium-shimmer-dark"
        style={{ width: 36, height: 36, borderRadius: 10, marginBottom: 16 }}
      />
      <div
        className="premium-shimmer-dark"
        style={{ width: 120, height: 14, marginBottom: 8, borderRadius: 4 }}
      />
      <div
        className="premium-shimmer-dark"
        style={{ width: 80, height: 10, marginBottom: 16, borderRadius: 4 }}
      />
      <div
        className="premium-shimmer-dark"
        style={{ width: 140, height: 28, marginBottom: 8, borderRadius: 6 }}
      />
      <div
        className="premium-shimmer-dark"
        style={{ width: 80, height: 28, borderRadius: 4, marginLeft: "auto" }}
      />
    </div>
  );
}

type PremiumAccountCardProps = {
  account: Account;
  index: number;
};

export function PremiumAccountCard({ account, index }: PremiumAccountCardProps) {
  const { t } = useTranslation();
  const { format } = useCurrencyFormatter();

  return (
    <motion.div
      className={`${styles.card} ${ACCOUNT_GRADIENTS[account.type] || "premium-gradient-blue"}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className={styles.cardTop}>
        <div className={styles.cardIcon}>{ACCOUNT_ICONS[account.type]}</div>
        <AccountSparkline data={account.sparklineData} trend={account.trend} />
      </div>

      <div className={styles.cardType}>
        {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
      </div>
      <div className={styles.cardName}>{account.name}</div>
      <div className={styles.cardNumber}>{account.maskedNumber}</div>

      <div className={styles.cardDivider} />

      <div className={styles.cardBottom}>
        <div>
          <div className={styles.cardBalanceLabel}>{t("dashboard.accounts.balance")}</div>
          <div className={styles.cardBalance}>{format(account.balance, account.currency)}</div>
        </div>
        <div className={styles.cardGrowth}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {account.trend === "up" ? (
              <polyline points="18 15 12 9 6 15" />
            ) : (
              <polyline points="6 9 12 15 18 9" />
            )}
          </svg>
          {account.monthlyGrowth.toFixed(1)}%
        </div>
      </div>
    </motion.div>
  );
}

export function AccountCardSkeletonGrid() {
  return (
    <div className={styles.cardGrid}>
      {[1, 2, 3].map((i) => (
        <AccountCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function AccountCardGrid({ accounts }: { accounts: Account[] }) {
  return (
    <motion.div
      className={styles.cardGrid}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {accounts.map((account, idx) => (
        <PremiumAccountCard key={account.id} account={account} index={idx} />
      ))}
    </motion.div>
  );
}
