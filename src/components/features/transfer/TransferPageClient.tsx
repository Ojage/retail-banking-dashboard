"use client";

import { useTranslation } from "react-i18next";

import { PremiumSideNav } from "@/components/premium/navigation/PremiumSideNav";
import AppLayout from "@/components/ui/AppLayout";
import ContentLayout from "@/components/ui/ContentLayout";
import Header from "@/components/ui/Header";

import { TransferForm } from "./TransferForm";

export function TransferPageClient() {
  const { t } = useTranslation();

  return (
    <AppLayout
      navigation={<PremiumSideNav />}
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
