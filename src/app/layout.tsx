import type { Metadata } from "next";

import "@cloudscape-design/global-styles/index.css";
import "../styles/globals.scss";
import "../styles/fonts.scss";
import { AuthProvider } from "@/components/shared/AuthProvider";
import { I18nProvider } from "@/components/shared/I18nProvider";
import { StoreProvider } from "@/store/StoreProvider";

export const metadata: Metadata = {
  title: "RetBankX — Retail Banking Dashboard",
  description: "Manage your accounts, transactions, and transfers.",
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_io/favicon.ico", sizes: "any" },
    ],
    apple: { url: "/favicon_io/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/favicon_io/site.webmanifest",
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
          <AuthProvider>
            <I18nProvider>{children}</I18nProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
