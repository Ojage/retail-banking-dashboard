"use client";

import { useTranslation } from "react-i18next";

import { AnalyticsWidgets } from "@/components/premium/dashboard/AnalyticsWidgets";
import { PremiumSideNav } from "@/components/premium/navigation/PremiumSideNav";
import AppLayout from "@/components/ui/AppLayout";
import ContentLayout from "@/components/ui/ContentLayout";
import Header from "@/components/ui/Header";

export function AnalyticsPageClient() {
  const { t } = useTranslation();

  return (
    <AppLayout
      navigation={<PremiumSideNav />}
      toolsHide
      content={
        <ContentLayout
          header={
            <Header variant="h1" description={t("analytics.description")}>
              {t("analytics.title")}
            </Header>
          }
        >
          <AnalyticsWidgets />
        </ContentLayout>
      }
    />
  );
}
