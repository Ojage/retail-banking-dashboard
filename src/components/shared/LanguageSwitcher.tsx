"use client";

import { useTranslation } from "react-i18next";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { i18n } from "@/lib/i18n";
import { setLocale } from "@/store/slices/uiSlice";

import styles from "./LanguageSwitcher.module.scss";

const LOCALES = ["en", "fr"] as const;

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const locale = useTypedSelector((s) => s.ui.locale);

  const handleSelect = (id: (typeof LOCALES)[number]) => {
    dispatch(setLocale(id));
    void i18n.changeLanguage(id);
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.trigger}
        aria-label={t("language.ariaLabel")}
        aria-haspopup="true"
        type="button"
      >
        <svg
          width="18"
          height="18"
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
      </button>
      <ul className={styles.menu} role="menu">
        {LOCALES.map((l) => {
          const label = t(`language.${l}`);
          return (
            <li key={l} role="none">
              <button
                className={`${styles.item} ${locale === l ? styles.active : ""}`}
                role="menuitem"
                disabled={locale === l}
                onClick={() => handleSelect(l)}
                type="button"
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
