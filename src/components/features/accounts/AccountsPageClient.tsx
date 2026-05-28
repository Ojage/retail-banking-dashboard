"use client";

import { useTranslation } from "react-i18next";

import {
  AccountCardGrid,
  AccountCardSkeletonGrid,
} from "@/components/premium/dashboard/PremiumAccountCard";
import { PremiumSideNav } from "@/components/premium/navigation/PremiumSideNav";
import AppLayout from "@/components/ui/AppLayout";
import ContentLayout from "@/components/ui/ContentLayout";
import Header from "@/components/ui/Header";
import Table from "@/components/ui/Table";
import { useAccounts } from "@/hooks/useAccounts";
import { useCurrencyFormatter } from "@/hooks/useCurrencyFormatter";
import type { Account } from "@/types";

import styles from "./AccountsPage.module.scss";

function AccountsTable({ accounts }: { accounts: Account[] }) {
  const { format } = useCurrencyFormatter();

  const statusCell = (item: Account) => (
    <span className={`${styles.status} ${styles[`status--${item.status}`]}`}>
      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
    </span>
  );

  const amountCell = (item: Account) => (
    <span className={styles.amount}>{format(item.balance, item.currency)}</span>
  );

  return (
    <Table
      variant="container"
      trackBy="id"
      items={accounts}
      columnDefinitions={[
        { id: "name", header: "Account", cell: (item) => item.name, isRowHeader: true },
        {
          id: "type",
          header: "Type",
          cell: (item) => item.type.charAt(0).toUpperCase() + item.type.slice(1),
        },
        { id: "number", header: "Account Number", cell: (item) => item.accountNumber },
        { id: "sortCode", header: "Sort Code", cell: (item) => item.sortCode },
        { id: "balance", header: "Balance", cell: amountCell },
        { id: "status", header: "Status", cell: statusCell },
      ]}
      header={
        <Header variant="h2" counter={`(${accounts.length})`}>
          Account Details
        </Header>
      }
    />
  );
}

export function AccountsPageClient() {
  const { t } = useTranslation();
  const { accounts, isLoading } = useAccounts();

  return (
    <AppLayout
      navigation={<PremiumSideNav />}
      toolsHide
      content={
        <ContentLayout
          header={
            <Header variant="h1" description={t("accounts.description")}>
              {t("accounts.title")}
            </Header>
          }
        >
          {isLoading ? <AccountCardSkeletonGrid /> : <AccountCardGrid accounts={accounts} />}
          <div className={styles.tableSection}>
            <AccountsTable accounts={accounts} />
          </div>
        </ContentLayout>
      }
    />
  );
}
