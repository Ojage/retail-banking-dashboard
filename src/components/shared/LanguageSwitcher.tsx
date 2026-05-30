"use client";

import { useTranslation } from "react-i18next";

import ButtonDropdown from "@/components/ui/ButtonDropdown";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { i18n } from "@/lib/i18n";
import { setLocale } from "@/store/slices/uiSlice";

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const locale = useTypedSelector((s) => s.ui.locale);

  return (
    <ButtonDropdown
      items={[
        { id: "en", text: t("language.en"), disabled: locale === "en" },
        { id: "fr", text: t("language.fr"), disabled: locale === "fr" },
      ]}
      onItemClick={({ detail }) => {
        const newLocale = detail.id as "en" | "fr";
        dispatch(setLocale(newLocale));
        void i18n.changeLanguage(newLocale);
      }}
      variant="inline-icon"
      ariaLabel={t("language.ariaLabel")}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    </ButtonDropdown>
  );
}
