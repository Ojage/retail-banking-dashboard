"use client";

import { useTranslation } from "react-i18next";

import AppLayout from "@/components/ui/AppLayout";
import ContentLayout from "@/components/ui/ContentLayout";
import Header from "@/components/ui/Header";

import { TransactionTable } from "./TransactionTable";

export function TransactionsPageClient() {
  const { t } = useTranslation();

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <Header variant="h1" description={t("transactions.description")}>
              {t("transactions.title")}
            </Header>
          }
        >
          <TransactionTable />
        </ContentLayout>
      }
    />
  );
}
