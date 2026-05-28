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
      {locale === "en" ? t("language.en") : t("language.fr")}
    </ButtonDropdown>
  );
}
