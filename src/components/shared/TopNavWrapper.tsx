"use client";

import TopNavigation from "@/components/ui/TopNavigation";

export function TopNavWrapper() {
  return (
    <TopNavigation
      identity={{
        href: "/dashboard",
        title: "RetBankX",
        logo: { src: "/logo.svg", alt: "RetBankX" },
      }}
      utilities={[
        {
          type: "button",
          text: "Dashboard",
          href: "/dashboard",
        },
        {
          type: "button",
          text: "Transactions",
          href: "/dashboard/transactions",
        },
        {
          type: "button",
          text: "Transfer",
          href: "/dashboard/transfer",
        },
      ]}
      i18nStrings={{
        searchIconAriaLabel: "Search",
        searchDismissIconAriaLabel: "Close search",
        overflowMenuTriggerText: "More",
        overflowMenuTitleText: "Navigation",
        overflowMenuBackIconAriaLabel: "Back",
        overflowMenuDismissIconAriaLabel: "Close",
      }}
    />
  );
}
