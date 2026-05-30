"use client";

import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { useAccounts } from "@/hooks/useAccounts";
import { useCurrencyFormatter } from "@/hooks/useCurrencyFormatter";

import styles from "./HeroWealthCard.module.scss";

function AnimatedNumber({ value, format }: { value: number; format: (v: number) => string }) {
  const [displayValue, setDisplayValue] = useState(value);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const startValueRef = useRef(0);

  useEffect(() => {
    startValueRef.current = displayValue;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      const elapsed = timestamp - startTimeRef.current;
      const duration = 1200;
      const progress = Math.min(elapsed / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValueRef.current + (value - startValueRef.current) * eased;
      setDisplayValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value]);

  return <>{format(displayValue)}</>;
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const width = 120;
  const height = 40;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

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
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

export function HeroWealthCard() {
  const { t } = useTranslation();
  const { accounts, totalNetWorth, isLoading } = useAccounts();
  const { format } = useCurrencyFormatter();

  if (isLoading) {
    return (
      <div className={styles.hero}>
        <div className={styles.heroShimmer}>
          <div
            className={`${styles.shimmerBlock} premium-shimmer-dark`}
            style={{ width: 140, height: 14, marginBottom: 16 }}
          />
          <div
            className={`${styles.shimmerBlock} premium-shimmer-dark`}
            style={{ width: 260, height: 40, marginBottom: 12 }}
          />
          <div
            className={`${styles.shimmerBlock} premium-shimmer-dark`}
            style={{ width: 180, height: 12 }}
          />
        </div>
      </div>
    );
  }

  const monthlyGrowth = accounts.reduce((sum, a) => sum + a.monthlyGrowth, 0) / accounts.length;
  const isPositive = monthlyGrowth >= 0;

  return (
    <motion.div
      className={styles.hero}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={styles.heroBg} />
      <div className={styles.heroContent}>
        <div className={styles.heroMain}>
          <div className={styles.heroLabel}>{t("dashboard.netWorth.label")}</div>
          <div className={styles.heroAmount}>
            <AnimatedNumber value={totalNetWorth} format={(v) => format(v, "USD")} />
          </div>
          <div className={styles.heroMeta}>
            <span
              className={`${styles.heroGrowth} ${isPositive ? styles.growthPositive : styles.growthNegative}`}
            >
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
                {isPositive ? (
                  <polyline points="18 15 12 9 6 15" />
                ) : (
                  <polyline points="6 9 12 15 18 9" />
                )}
              </svg>
              {monthlyGrowth.toFixed(1)}%
            </span>
            <span className={styles.heroPeriod}>{t("dashboard.netWorth.period")}</span>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <Sparkline
            data={accounts.length > 0 ? accounts[0].sparklineData : [0]}
            color="rgba(255,255,255,0.5)"
          />
          <div className={styles.heroAccounts}>
            {accounts.map((acc) => (
              <div key={acc.id} className={styles.heroAccountBadge}>
                {acc.type === "checking" && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                )}
                {acc.type === "savings" && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                )}
                {acc.type === "investment" && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
