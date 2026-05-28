"use client";

import { AnalyticsWidgets } from "@/components/premium/dashboard/AnalyticsWidgets";
import { HeroWealthCard } from "@/components/premium/dashboard/HeroWealthCard";
import {
  AccountCardGrid,
  AccountCardSkeletonGrid,
} from "@/components/premium/dashboard/PremiumAccountCard";
import { TransactionFeed } from "@/components/premium/dashboard/TransactionFeed";
import { PremiumSideNav } from "@/components/premium/navigation/PremiumSideNav";
import AppLayout from "@/components/ui/AppLayout";
import SpaceBetween from "@/components/ui/SpaceBetween";
import { useAccounts } from "@/hooks/useAccounts";

export function DashboardClient() {
  const { accounts, isLoading: accountsLoading } = useAccounts();

  return (
    <AppLayout
      navigation={<PremiumSideNav />}
      toolsHide
      content={
        <div style={{ padding: "24px" }}>
          <SpaceBetween size="l" direction="vertical">
            <HeroWealthCard />

            <AnalyticsWidgets />

            {accountsLoading ? (
              <AccountCardSkeletonGrid />
            ) : (
              <AccountCardGrid accounts={accounts} />
            )}

            <TransactionFeed />
          </SpaceBetween>
        </div>
      }
    />
  );
}
