import type { Metadata } from "next";

import "@cloudscape-design/global-styles/index.css";
import "../styles/globals.scss";
import "../styles/fonts.scss";
import { I18nProvider } from "@/components/shared/I18nProvider";
import { StoreProvider } from "@/store/StoreProvider";

export const metadata: Metadata = {
  title: "RetBankX — Retail Banking Dashboard",
  description: "Manage your accounts, transactions, and transfers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@1,300,401,500,700,901&f[]=switzer@1,300,400,500,600,700&display=swap"
        />
      </head>
      <body>
        <StoreProvider>
          <I18nProvider>{children}</I18nProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
