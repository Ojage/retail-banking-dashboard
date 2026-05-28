"use client";

import { useTranslation } from "react-i18next";

import Spinner from "@/components/ui/Spinner";
import { useAccounts } from "@/hooks/useAccounts";
import { useCurrencyFormatter } from "@/hooks/useCurrencyFormatter";

import styles from "./NetWorthBanner.module.scss";

export function NetWorthBanner() {
  const { t } = useTranslation();
  const { totalNetWorth, isLoading } = useAccounts();
  const { format } = useCurrencyFormatter();

  return (
    <div className={styles.banner}>
      <div>
        <div className={styles.banner__label}>{t("dashboard.netWorth.label")}</div>
        <div className={styles.banner__amount}>
          {isLoading ? <Spinner /> : format(totalNetWorth, "USD")}
        </div>
        <div className={styles.banner__subtitle}>{t("dashboard.netWorth.subtitle")}</div>
      </div>
    </div>
  );
}
