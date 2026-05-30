"use client";

import Link from "next/link";

import { useTranslation } from "react-i18next";

import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";

import styles from "./auth.module.scss";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <Link href="/" className={styles.backLink}>
          {t("auth.backToHome")}
        </Link>
        <LanguageSwitcher />
      </header>
      {children}
    </div>
  );
}
