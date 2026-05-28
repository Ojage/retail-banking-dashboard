"use client";

import { useTranslation } from "react-i18next";

import AppLayout from "@/components/ui/AppLayout";
import ContentLayout from "@/components/ui/ContentLayout";
import Header from "@/components/ui/Header";

import { TransferForm } from "./TransferForm";

export function TransferPageClient() {
  const { t } = useTranslation();

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <Header variant="h1" description={t("transfer.description")}>
              {t("transfer.title")}
            </Header>
          }
        >
          <TransferForm />
        </ContentLayout>
      }
    />
  );
}
