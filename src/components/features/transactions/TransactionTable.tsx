"use client";

import { useTranslation } from "react-i18next";

import Badge from "@/components/ui/Badge";
import Box from "@/components/ui/Box";
import Button from "@/components/ui/Button";
import Header from "@/components/ui/Header";
import SegmentedControl from "@/components/ui/SegmentedControl";
import Select from "@/components/ui/Select";
import Table from "@/components/ui/Table";
import { useAccounts } from "@/hooks/useAccounts";
import { useCurrencyFormatter } from "@/hooks/useCurrencyFormatter";
import { useFilteredTransactions } from "@/hooks/useFilteredTransactions";
import { useTransactionTableControls } from "@/hooks/useTransactionTableControls";
import { formatDate } from "@/lib/formatting";
import type { Transaction, TransactionType } from "@/types";

import styles from "./TransactionTable.module.scss";

export function TransactionTable() {
  const { t } = useTranslation();
  const { accounts } = useAccounts();
  const {
    selectedAccountId,
    transactionFilter,
    transactionSortOrder,
    locale,
    selectAccount,
    setFilter,
    setSortOrder,
  } = useTransactionTableControls();

  const effectiveAccountId = selectedAccountId ?? (accounts[0]?.id || "");
  const { transactions, isLoading } = useFilteredTransactions(effectiveAccountId);
  const { format } = useCurrencyFormatter();

  const selectedAccount = accounts.find((a) => a.id === effectiveAccountId);
  const accountOptions = accounts.map((a) => ({
    value: a.id,
    label: `${a.name} (${a.maskedNumber})`,
  }));
  const selectedOption = accountOptions.find((o) => o.value === effectiveAccountId) ?? null;

  const amountCell = (item: Transaction) => (
    <span
      className={`${styles.transaction__amount} ${item.type === "Credit" ? styles["transaction__amount--credit"] : styles["transaction__amount--debit"]}`}
    >
      {item.type === "Credit" ? "+" : "-"}
      {format(item.amount, selectedAccount?.currency ?? "USD")}
    </span>
  );

  const typeCell = (item: Transaction) =>
    item.type === "Credit" ? (
      <Badge color="green">{item.type}</Badge>
    ) : (
      <Badge color="red">{item.type}</Badge>
    );

  return (
    <Table
      variant="container"
      loading={isLoading}
      loadingText={t("transactions.table.loading")}
      trackBy="id"
      items={transactions}
      columnDefinitions={[
        {
          id: "date",
          header: t("transactions.table.date"),
          cell: (item) => formatDate(item.date, locale),
          sortingField: "date",
          isRowHeader: true,
        },
        {
          id: "description",
          header: t("transactions.table.description"),
          cell: (item) => item.description,
        },
        {
          id: "type",
          header: t("transactions.table.type"),
          cell: typeCell,
          sortingField: "type",
        },
        {
          id: "amount",
          header: t("transactions.table.amount"),
          cell: amountCell,
        },
      ]}
      header={
        <Header
          variant="h2"
          counter={`(${transactions.length})`}
          actions={
            <Button
              iconName={transactionSortOrder === "desc" ? "angle-down" : "angle-up"}
              onClick={() => setSortOrder(transactionSortOrder === "desc" ? "asc" : "desc")}
            >
              {transactionSortOrder === "desc"
                ? t("transactions.table.newest")
                : t("transactions.table.oldest")}
            </Button>
          }
        >
          {t("transactions.title")}
        </Header>
      }
      filter={
        <div className={styles.controls}>
          <div className={styles["account-select"]}>
            <Select
              selectedOption={selectedOption}
              onChange={({ detail }) => selectAccount(detail.selectedOption.value ?? null)}
              options={accountOptions}
              placeholder={t("transactions.table.selectAccount")}
            />
          </div>
          <SegmentedControl
            selectedId={transactionFilter}
            onChange={({ detail }) => setFilter(detail.selectedId as TransactionType | "All")}
            options={[
              { id: "All", text: t("transactions.table.filter.all") },
              { id: "Credit", text: t("transactions.table.filter.credit") },
              { id: "Debit", text: t("transactions.table.filter.debit") },
            ]}
          />
        </div>
      }
      empty={
        <Box textAlign="center" color="inherit">
          <Box variant="strong" color="inherit">
            {t("transactions.table.empty.title")}
          </Box>
          <Box variant="p" padding={{ bottom: "s" }} color="inherit">
            {t("transactions.table.empty.desc")}
          </Box>
        </Box>
      }
    />
  );
}
