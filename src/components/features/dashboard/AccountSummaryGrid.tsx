"use client";

import { useTranslation } from "react-i18next";

import Box from "@/components/ui/Box";
import Cards from "@/components/ui/Cards";
import Header from "@/components/ui/Header";
import SpaceBetween from "@/components/ui/SpaceBetween";
import StatusIndicator from "@/components/ui/StatusIndicator";
import { useAccounts } from "@/hooks/useAccounts";
import { useCurrencyFormatter } from "@/hooks/useCurrencyFormatter";
import type { Account } from "@/types";

import styles from "./AccountSummaryGrid.module.scss";

export function AccountSummaryGrid() {
  const { t } = useTranslation();
  const { accounts, isLoading, isError } = useAccounts();
  const { format } = useCurrencyFormatter();

  if (isError) {
    return (
      <Box padding="l">
        <StatusIndicator type="error">{t("dashboard.accounts.error")}</StatusIndicator>
      </Box>
    );
  }

  return (
    <Cards
      loading={isLoading}
      loadingText={t("dashboard.accounts.loading")}
      trackBy="id"
      items={accounts}
      cardDefinition={{
        header: (item: Account) => <div className={styles["account-card__name"]}>{item.name}</div>,
        sections: [
          {
            id: "maskedNumber",
            content: (item: Account) => (
              <div className={styles["account-card__masked"]}>{item.maskedNumber}</div>
            ),
          },
          {
            id: "balance",
            header: t("dashboard.accounts.balance"),
            content: (item: Account) => (
              <div className={styles["account-card__balance"]}>
                {format(item.balance, item.currency)}
              </div>
            ),
          },
          {
            id: "currency",
            header: t("dashboard.accounts.currency"),
            content: (item: Account) => item.currency,
          },
        ],
      }}
      header={
        <Header variant="h2" counter={`(${accounts.length})`}>
          {t("dashboard.accounts.title")}
        </Header>
      }
      cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 2 }, { minWidth: 992, cards: 3 }]}
      empty={
        <Box textAlign="center" color="inherit">
          <SpaceBetween size="s" direction="vertical">
            <Box variant="strong" color="inherit">
              {t("dashboard.accounts.empty")}
            </Box>
          </SpaceBetween>
        </Box>
      }
    />
  );
}
