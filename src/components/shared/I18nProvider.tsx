"use client";

import { useEffect } from "react";

import { I18nextProvider } from "react-i18next";

import { useTypedSelector } from "@/hooks/useTypedSelector";
import { i18n } from "@/lib/i18n";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = useTypedSelector((s) => s.ui.locale);

  useEffect(() => {
    if (i18n.language !== locale) {
      void i18n.changeLanguage(locale);
    }
  }, [locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
